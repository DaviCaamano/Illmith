import { Controller, Logger, Req, Post, Get, Param, Render, Body } from '@nestjs/common';
import { httpErrorHandler } from '@utils/server/logging';
import { Throttle } from '@nestjs/throttler';
import { loginMaxRequests, timeToLive } from '@constants/server/throttle';

//service
import { UserLoginService } from '@server/user/service/user.login.service';
import { UserPasswordService } from '@server/user/service/user.password.service';
import { UserRegisterService } from '@server/user/service/user.register.service';
import { UserService } from '@server/user/service/user.service';

//types
import { Request } from 'express';
import { LogHandler } from '@interface/server/logging';
import { ErrorHandler } from '@utils/server/logging/httpsErrorHandler';
import { UserValidation } from '@interface/server/user';
import { userDto, registerUserDto } from '@server/user/dto/user.dto';
import { LoginResponse } from '@server/user/service';
@Controller('user')
export class UserController {
  private readonly log: LogHandler;
  private readonly error: LogHandler;
  private readonly httpError: ErrorHandler;
  constructor(
    private readonly user: UserService,
    private readonly login: UserLoginService,
    private readonly register: UserRegisterService,
    private readonly password: UserPasswordService,
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

  @Get('/validate')
  async validate(@Req() req: Request): Promise<UserValidation> {
    return this.login.validate(req);
  }

  @Get('/authorize')
  async authorize(@Req() req: Request): Promise<UserValidation> {
    return this.login.authorize(req);
  }

  @Throttle(loginMaxRequests, timeToLive)
  @Post('/login')
  async userLogin(
    @Body()
    { identifier, password }: userDto,
    @Req() req: Request
  ): Promise<LoginResponse> {
    return this.login.login(identifier, password, req.ip);
  }

  @Throttle(loginMaxRequests, timeToLive)
  @Post('/authorized-login')
  async adminLogin(
    @Param()
    { identifier, password }: userDto,
    @Req() req: Request
  ) {
    return this.login.login(identifier, password, req.ip, true);
  }

  @Post('/logout')
  async logout(@Req() req: Request) {
    return this.login.logout(req.ip);
  }

  @Throttle(loginMaxRequests, timeToLive)
  @Post('/register')
  async registerUser(@Body() { email, password, username, subscribe }: registerUserDto) {
    return this.register.startRegistration(email, password, username, subscribe);
  }

  @Throttle(loginMaxRequests, timeToLive)
  @Get('/register')
  @Render('/user/register/[token]')
  async finishUserRegistration(@Param() token: string) {
    return this.register.finishRegistration(token);
  }

  @Get('/password')
  async passwordReset(@Param() identifier: string) {
    return this.password.startPasswordReset(identifier);
  }

  @Post('/password')
  async finishPasswordReset(@Param() token: string, @Param() password: string) {
    return this.password.finishPasswordReset(token, password);
  }
}
