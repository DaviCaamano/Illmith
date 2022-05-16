import { Injectable, Logger } from '@nestjs/common';
import { errorResponseHandler, httpErrorHandler } from '@utils/server/logging/httpsErrorHandler';
import { validateRegisteringUser } from '@utils/server';
import { add, format } from 'date-fns';
import { errorCodes } from '@error';

//service
import { PrismaService } from '@server/shared/service/prisma.service';
import { ParseService } from '@server/shared/service/parse.service';
import { UserContactService } from '@server/user/service/user.contact.service';

//types
import { LogHandler } from '@interface/server';
import { ErrorHandler } from '@utils/server';
import { PendingUser, Prisma, User, NewsSubscription } from '@prisma/client';
import { SignedJWT } from '@server/shared';
import { HttpStatus } from '@nestjs/common';
import { JwtTokenUserData } from '@interface/jwt';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { FinishRegistrationResp, StartRegistrationResp } from '@interface/server/user/UserRegistration';

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
    console.log('process.env', process.env);
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
  ): Promise<StartRegistrationResp> {
    email = email.toLowerCase();
    if (username) username = username.toLowerCase();
    let UserEmailAlreadyUsed: User | null | undefined;
    let UserUsernameAlreadyUsed: User | null | undefined;
    try {
      [UserEmailAlreadyUsed, UserUsernameAlreadyUsed] = await Promise.all([
        this.db.user.findFirst({ where: { email } }),
        username ? this.db.user.findFirst({ where: { username } }) : undefined,
      ]);
    } catch (err: any) {
      this.errorRequest({ general: 'Failed to perform user search' }, err);
    }

    validateRegisteringUser(
      !!UserEmailAlreadyUsed,
      !!UserUsernameAlreadyUsed,
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
      subscribe,
    };
    if (username) userInfo.username = username;

    let token: string;
    try {
      const jwt = await this.parse.signJWT(userInfo);
      token = jwt.token;
    } catch (err: any) {
      this.httpError({ error: 'Failed to Parse JWT Token' }, err);
    }

    let error: SMTPTransport.SentMessageInfo;
    try {
      error = await this.mail.sendUserRegistrationEmail(email, token);
    } catch (err: any) {
      this.httpError('Failed to send email confirmation', err);
    }

    if (error?.rejected?.length) {
      this.httpError({ error: 'Failed to send email confirmation' });
    }
    const userData: StartRegistrationResp = {
      email,
      username,
      password,
      expiration,
      token,
    };
    try {
      await this.db.pendingUser.upsert({
        where: { email },
        create: { ...userData },
        update: { username, password, expiration, token },
      });
    } catch (err: any) {
      this.httpError('Failed to Create Pending User.', err);
    }
    return userData;
  }

  async finishRegistration(registrationToken: string): Promise<FinishRegistrationResp> {
    let pendingUser: PendingUser | null;
    try {
      pendingUser = await this.db.pendingUser.findFirst({
        where: { token: registrationToken, expiration: { gte: new Date() } },
      });
    } catch (err: any) {
      this.httpError('Failed to perform pending user search', err);
    }
    //Link no longer valid or was never valid
    if (!pendingUser) {
      this.httpError(errorCodes.UserRegistration.userRegistrationLinkInvalid, HttpStatus.UNAUTHORIZED);
    }
    const { email, username } = pendingUser;
    const decoded: any = await this.parse.jwtVerify(registrationToken);
    if (typeof decoded?.password !== 'string' || typeof decoded.subscribe !== 'boolean') {
      this.httpError(errorCodes.UserRegistration.generic);
    }
    const password = await this.parse.hashPassword(decoded.password);
    const params: {
      password: string;
      email: string;
      username?: string;
    } = {
      password,
      email,
    };
    if (username) params.username = username;
    const [{ id }]: [User, Prisma.BatchPayload] = await Promise.all([
      this.db.user.create({ data: params }),
      this.db.pendingUser.deleteMany({ where: { email } }),
    ]);
    const responseData = {
      email,
      username,
      userId: id,
    };
    const promises: [Promise<SignedJWT>, Prisma.Prisma__NewsSubscriptionClient<NewsSubscription> | undefined] = [
      this.parse.signJWT(responseData),
      undefined,
    ];

    if (decoded.subscribe) {
      promises[1] = this.db.newsSubscription.create({ data: { userId: id } });
    }
    const [
      {
        token,
        decoded: { exp },
      },
    ]: [SignedJWT, NewsSubscription | null | undefined] = await Promise.all<
      [Promise<SignedJWT>, Prisma.Prisma__NewsSubscriptionClient<NewsSubscription> | undefined]
    >(promises);

    return {
      ...responseData,
      token,
      tokenExpiration: exp,
    };
  }
}
