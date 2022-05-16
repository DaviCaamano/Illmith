import { Injectable, Logger } from '@nestjs/common';
import { httpErrorHandler } from '@utils/server/logging/httpsErrorHandler';

//service
import { PrismaService } from '@server/shared/service/prisma.service';
import { ParseService } from '@server/shared/service/parse.service';
import { UserContactService } from '@server/user/service/user.contact.service';

//types
import { LogHandler } from '@interface/server';
import { ErrorHandler } from '@utils/server';
import { add } from 'date-fns';
import { errorCodes } from '@error';

@Injectable()
export class UserPasswordService {
  private readonly log: LogHandler;
  private readonly error: LogHandler;
  private readonly httpError: ErrorHandler;
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
  }

  async startPasswordReset(identifier: string): Promise<{ success: boolean }> {
    let user: {
      id: number;
      email: string;
      username: string | null;
      password: string;
      roleId: number;
    } | null;
    try {
      user = await this.db.user.findFirst({
        select: {
          id: true,
          email: true,
          username: true,
          password: true,
          roleId: true,
        },
        where: { OR: [{ email: identifier, username: identifier }] },
      });
    } catch (err: any) {
      this.httpError('Failed to perform user search', err);
    }
    //No user has either an email or username matching the requested account.
    //This is a 400 error, but the user must never be able to tell if an account exists just by the name of the email.
    if (!user) {
      return { success: true };
    }
    const { email, id } = user;

    const token: string = this.parse.randomizeString(127);
    try {
      await this.mail.sendResetPasswordEmail(email, token);
    } catch (err: any) {
      this.httpError(errorCodes.ResetPassword.emailFailed);
    }
    const expiration = add(new Date(), { days: 1 });
    try {
      this.db.pendingPasswordReset.upsert({
        where: { userId: id },
        update: { token, expiration },
        create: { userId: id, token, expiration },
      });
    } catch (err: any) {
      this.httpError(errorCodes.ResetPassword.generic);
    }
    return { success: true };
  }

  finishPasswordReset(token: string, inputPassword: string) {
    return new Promise(async (resolve) => {
      let user: { userId: number } | null;
      try {
        user = await this.db.pendingPasswordReset.findFirst({
          select: { userId: true },
          where: { token, expiration: { gte: new Date() } },
        });
      } catch (err: any) {
        this.httpError('Failed to perform user search.');
      }

      //Link no longer valid or was never valid
      if (!user) {
        this.httpError(errorCodes.ResetPassword.forgotPasswordLinkInvalid);
      }
      const { userId } = user;

      if (userId) {
        const password = await this.parse.hashPassword(inputPassword);
        Promise.all([
          this.db.pendingPasswordReset.delete({ where: { userId } }),
          this.db.user.update({ data: { password }, where: { id: userId } }),
        ]).then(() => resolve({ success: true }));
      }
    });
  }
}
