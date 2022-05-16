import { Injectable, Logger } from '@nestjs/common';
import { LogHandler } from '@interface/server/logging';
import {
  ErrorHandler,
  httpErrorHandler,
} from '@utils/server/logging/httpsErrorHandler';
import { PrismaService } from '@server/shared/service/prisma.service';

@Injectable()
export class UserService {
  private readonly log: LogHandler;
  private readonly error: LogHandler;
  private readonly httpError: ErrorHandler;
  constructor(
    private readonly db: PrismaService,
    private readonly logger: Logger,
  ) {
    this.log = (...args: any) => {
      logger.log(args);
    };
    this.error = (...args: any) => {
      logger.error(args);
    };
    this.httpError = httpErrorHandler(this.error);
  }

  // async users(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.UserWhereUniqueInput;
  //   where?: Prisma.UserWhereInput;
  //   orderBy?: Prisma.UserOrderByWithRelationInput;
  // }): Promise<User[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.user.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }
}
