import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { httpErrorHandler } from '@utils/server/logging/httpsErrorHandler';
import { validate } from '@backend/shared';
//service
import { PrismaService } from '../../shared/service/prisma.service';

//types
import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '@utils/server/logging/httpsErrorHandler';
import { LogHandler } from '@interface/server/logging';

@Injectable()
export class ValidateAdminMiddleware implements NestMiddleware {
  private readonly error: LogHandler;
  private readonly httpError: ErrorHandler;
  constructor(private readonly db: PrismaService, private readonly logger: Logger) {
    this.error = (...args: any) => {
      logger.error(args);
    };
    this.httpError = httpErrorHandler(this.error);
  }

  use(req: Request, res: Response, next: NextFunction, admin?: boolean) {
    validate(req, res, next, true, this.httpError, this.db).then();
  }
}
