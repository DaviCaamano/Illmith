import { Logger, Module } from '@nestjs/common';
import { ParseService } from '@server/shared/service/parse.service';
import { MailService } from '@server/shared/service/mail.service';
import { PrismaService } from '@server/shared/service/prisma.service';

@Module({
  providers: [PrismaService, MailService, ParseService, Logger],
  exports: [PrismaService, MailService, ParseService, Logger],
})
export class SharedModule {}
