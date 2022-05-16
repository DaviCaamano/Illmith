import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { httpErrorHandler } from '@utils/server/logging/httpsErrorHandler';
import { ADMIN_ROLE_ID } from '@constants/shared';

//service
import { ParseService } from '@server/shared/service/parse.service';
import { PrismaService } from '@server/shared/service/prisma.service';

//types
import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '@utils/server/logging/httpsErrorHandler';
import { LogHandler } from '@interface/server/logging';
import { HttpStatus } from '@nestjs/common';
interface AuthenticationRec {
  expiration: Date;
  user: {
    id: number;
    username: string | null;
    email: string;
    roleId: number;
  };
}
@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  private readonly log: LogHandler;
  private readonly error: LogHandler;
  private readonly httpError: ErrorHandler;
  constructor(
    private readonly db: PrismaService,
    private readonly parse: ParseService,
    private readonly logger: Logger
  ) {
    this.log = (...args: any) => {
      logger.log(args);
    };
    this.error = (...args: any) => {
      logger.error(args);
    };
    this.httpError = httpErrorHandler(this.error);
  }

  use(req: Request, res: Response, next: NextFunction, admin?: boolean) {
    const token = req.get('auth');
    if (!token) return this.httpError(HttpStatus.UNAUTHORIZED);
    const { ip } = req;

    this.db.authentication
      .findFirst({
        select: {
          expiration: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              roleId: true,
            },
          },
        },
        where: {
          ip,
          token,
          user: {
            roleId: admin ? ADMIN_ROLE_ID : undefined,
          },
        },
      })
      .then((rec: AuthenticationRec | null) => {
        if (rec) {
          const {
            user: { id, email, username, roleId },
            expiration,
          } = rec;
          req.userValidated = true;
          if (admin) req.userAuthorized = false;
          req.user = {
            id,
            username,
            email,
            roleId,
          };
          req.authToken = {
            token,
            expiration,
          };
        }
        next();
      });
  }
}
