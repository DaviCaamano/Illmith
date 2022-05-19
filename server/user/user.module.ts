import { Module } from '@nestjs/common';

//modules
import { SharedModule } from '@server/shared';
import { ThrottlerModule } from '@nestjs/throttler';

//controller
import { UserController } from '@server/user/user.controller';

//service
import { UserService } from '@server/user/service/user.service';
import { UserLoginService } from '@server/user/service/user.login.service';
import { UserRegisterService } from '@server/user/service/user.register.service';
import { UserPasswordService } from '@server/user/service/user.password.service';
import { ParseService, PrismaService } from '@server/shared';
import { UserContactService } from '@server/user/service/user.contact.service';

//middleware
import { ValidateUserMiddleware } from '@server/shared';
import { ValidateAdminMiddleware } from '@server/shared/middleware/validateAdmin.middleware';

//types
import { MiddlewareConsumer } from '@nestjs/common';
import { MailService } from '@server/shared';

@Module({
  imports: [
    SharedModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserLoginService,
    UserRegisterService,
    UserPasswordService,
    UserContactService,
    PrismaService,
    MailService,
    ParseService,
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleware).forRoutes('user/validate');
    consumer.apply(ValidateAdminMiddleware).forRoutes('users/authorize');
  }
}
