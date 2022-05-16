import { Module } from '@nestjs/common';
import { UserModule } from '@server/user';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
