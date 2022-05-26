import { Injectable, Logger } from '@nestjs/common';
import { errorResponseHandler, httpErrorHandler } from '@utils/server/logging/httpsErrorHandler';
import { validateRegisteringUser } from '@utils/server';
import { add, format } from 'date-fns';
import { errorCodes } from '@error';

//service
import { PrismaService } from '@shared/service/prisma.service';
import { ParseService } from '@shared/service/parse.service';
import { UserContactService } from '@backend/user/service/user.contact.service';

//types
import { LogHandler } from '@interface/server';
import { ErrorHandler } from '@utils/server';
import { PendingUser, Prisma, User } from '@prisma/client';
import { HttpStatus } from '@nestjs/common';
import { JwtTokenUserData } from '@interface/jwt';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { FinishRegistrationResp } from '@interface/server/user/UserRegistration';

@Injectable()
export class UserRegisterService {
  private readonly log: LogHandler;
  private readonly error: LogHandler;
  private readonly httpError: ErrorHandler;
  private readonly errorRequest: ErrorHandler;
  constructor(
    private readonly db: PrismaService,
    private readonly parse: ParseService,
    private readonly logger: Logger,
    private readonly mail: UserContactService
  ) {
    this.log = (...args: any) => {
      logger.log(args);
    };
    this.error = (...args: any) => {
      logger.error(args);
    };
    this.httpError = httpErrorHandler(this.error);
    this.errorRequest = errorResponseHandler(this.error);
  }

  async startRegistration(
    email: string,
    password: string,
    username?: string,
    subscribe?: boolean
  ): Promise<Prisma.PendingUserCreateInput> {
    email = email.toLowerCase();
    if (username) username = username.toLowerCase();
    let UserEmailAlreadyUsed: User | null | undefined;
    let UserUsernameAlreadyUsed: User | null | undefined;
    let PendingUserEmailAlreadyUsed: PendingUser | null | undefined;
    let PendingUserUsernameAlreadyUsed: PendingUser | null | undefined;
    try {
      [UserEmailAlreadyUsed, UserUsernameAlreadyUsed, PendingUserEmailAlreadyUsed, PendingUserUsernameAlreadyUsed] =
        await Promise.all([
          this.db.user.findFirst({ where: { email } }),
          username ? this.db.user.findFirst({ where: { username } }) : undefined,
          this.db.pendingUser.findFirst({ where: { email, expiration: { gte: new Date() } } }),
          username
            ? this.db.pendingUser.findFirst({ where: { username, expiration: { gte: new Date() } } })
            : undefined,
        ]);
    } catch (err: any) {
      this.errorRequest('Failed to perform user search', err);
    }

    validateRegisteringUser(
      !!UserEmailAlreadyUsed || !!PendingUserEmailAlreadyUsed,
      !!UserUsernameAlreadyUsed || !!PendingUserUsernameAlreadyUsed,
      email,
      password,
      this.errorRequest,
      username
    );

    let hashedPassword: string;
    try {
      hashedPassword = await this.parse.hashPassword(password);
      await this.parse.hashPassword(password);
    } catch (err: any) {
      this.httpError('Failed to hash password', err);
    }

    const expiration = add(new Date(), { days: 1 });
    const expirationString = format(expiration, 'yyyy-MM-dd hh:mm:ss');
    const userInfo: JwtTokenUserData = {
      email,
      password: hashedPassword,
      expiration: expirationString,
    };
    if (username) userInfo.username = username;

    let token: string;
    try {
      const jwt = await this.parse.signJWT(userInfo);

      token = jwt.token;
    } catch (err: any) {
      this.httpError('Failed to Parse JWT Token', err);
    }

    const userData: Prisma.PendingUserCreateInput = {
      email,
      username,
      password: hashedPassword,
      expiration,
      token,
      subscribe: !!subscribe,
    };
    try {
      await this.db.pendingUser.create({ data: { ...userData } });
    } catch (err: any) {
      this.httpError('Failed to Create Pending User.', err);
    }

    let error: SMTPTransport.SentMessageInfo;
    try {
      error = await this.mail.sendUserRegistrationEmail(email, token);
    } catch (err: any) {
      await this.db.pendingUser.delete({ where: { email: userData.email } });
      this.httpError('Failed to send email confirmation', err);
    }

    if (error?.rejected?.length) {
      this.httpError('Failed to send email confirmation');
    }
    return userData;
  }

  async finishRegistration(registrationToken: string, ip: string): Promise<FinishRegistrationResp> {
    let pendingUser: PendingUser | null;
    try {
      pendingUser = await this.db.pendingUser.findFirst({
        where: { token: registrationToken },
      });
    } catch (err: any) {
      this.httpError('Failed to perform pending user search', err);
    }

    if (!pendingUser) {
      this.httpError(errorCodes.UserRegistration.userRegistrationLinkInvalid, HttpStatus.UNAUTHORIZED);
    }

    if (new Date(pendingUser.expiration) < new Date()) {
      this.httpError(errorCodes.UserRegistration.userRegistrationLinkExpired, HttpStatus.UNAUTHORIZED);
    }
    const { email, username, password, subscribe } = pendingUser;
    const params: {
      password: string;
      email: string;
      username?: string;
    } = {
      password,
      email,
    };

    if (username) params.username = username;
    const [{ id }]: [User, PendingUser] = await Promise.all([
      this.db.user.create({ data: params }),
      this.db.pendingUser.delete({ where: { email } }),
    ]);
    const responseData = {
      email,
      username,
      userId: id,
    };

    const { token, exp: tokenExpiration } = this.parse.signJWT(responseData);
    const expiration: Date | undefined = tokenExpiration ? new Date(new Date().getTime() + tokenExpiration) : undefined;

    if (subscribe) {
      try {
        this.db.newsSubscription.create({ data: { userId: id } });
      } catch (err: any) {
        this.httpError('Failed to setup subscription', err);
      }
    }

    if (expiration) {
      await this.db.authentication.upsert({
        where: {
          ip,
        },
        update: {
          token,
          expiration,
          userId: id,
        },
        create: {
          ip,
          token,
          expiration,
          userId: id,
        },
      });
    }
    return {
      ...responseData,
      token,
      tokenExpiration: expiration?.getTime(),
    };
  }
}
