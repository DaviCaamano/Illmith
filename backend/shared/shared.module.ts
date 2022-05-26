import { Logger, Module } from '@nestjs/common';
import { ParseService } from '@shared/service/parse.service';
import { MailService } from '@shared/service/mail.service';
import { PrismaService } from '@shared/service/prisma.service';

@Module({
  providers: [PrismaService, MailService, ParseService, Logger],
  exports: [PrismaService, MailService, ParseService, Logger],
})
export class SharedModule {}
