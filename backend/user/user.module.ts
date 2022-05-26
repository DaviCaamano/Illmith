import { Module } from '@nestjs/common';

//modules
import { SharedModule } from '@shared';
import { ThrottlerModule } from '@nestjs/throttler';

//controller
import { UserController } from '@backend/user';

//service
import { UserService } from '@backend/user/service/user.service';
import { UserLoginService } from '@backend/user/service/user.login.service';
import { UserRegisterService } from '@backend/user/service/user.register.service';
import { UserPasswordService } from '@backend/user/service/user.password.service';
import { UserContactService } from '@backend/user/service/user.contact.service';

//middleware
import { ValidateUserMiddleware, ValidateAdminMiddleware } from '@shared';

//types
import { MiddlewareConsumer } from '@nestjs/common';

@Module({
  imports: [
    SharedModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserLoginService, UserRegisterService, UserPasswordService, UserContactService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleware).forRoutes('user/validate');
    consumer.apply(ValidateAdminMiddleware).forRoutes('users/authorize');
  }
}
