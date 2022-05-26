import { Injectable, Logger } from '@nestjs/common';
import { httpErrorHandler } from '@utils/server/logging/httpsErrorHandler';

//service
import { PrismaService } from '@backend/shared/service/prisma.service';
import { ParseService } from '@backend/shared/service/parse.service';
import { UserContactService } from '@backend/user/service/user.contact.service';

//types
import { LogHandler } from '@interface/server';
import { ErrorHandler } from '@utils/server';
import { add } from 'date-fns';
import { errorCodes } from '@error';
import { User } from '@prisma/client';

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

  async startPasswordReset(email: string): Promise<{ success: boolean }> {
    const token: string = this.parse.randomizeString(127);
    const expiration = add(new Date(), { days: 1 });
    let id: number;
    try {
      const user: User = await this.db.user.update({
        where: { email },
        data: { passwordReset: { upsert: { create: { token, expiration }, update: { token, expiration } } } },
      });
      id = user.id;
    } catch (err: any) {
      this.httpError(errorCodes.ResetPassword.generic);
    }
    try {
      await this.mail.sendResetPasswordEmail(email, token);
    } catch (err: any) {
      try {
      } catch (err: any) {
        this.httpError(
          errorCodes.ResetPassword.emailFailed + ` | WARNING: [ FAILED TO DELETE PENDING USER FOR USERID: ${id} |`,
          err
        );
      }
      await this.db.pendingUser.delete({ where: { id } });
      this.httpError(errorCodes.ResetPassword.emailFailed);
    }
    return { success: true };
  }

  finishPasswordReset(token: string, inputPassword: string) {
    console.log('token', token);
    console.log('inputPassword', inputPassword);
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
          // this.db.pendingPasswordReset.delete({ where: { userId } }),
          this.db.user.update({ data: { password }, where: { id: userId } }),
        ]).then(() => resolve({ success: true }));
      }
    });
  }
}
