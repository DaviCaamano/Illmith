import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Options as MailerOptions } from 'nodemailer/lib/mailer';

export class MailService {
  transporter: Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'noreplysennoscampaign@gmail.com',
        pass: process.env.GMAIL_MAIL_PASSWORD,
      },
    });
  }
  public sendMail(options: MailerOptions) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
    return this.transporter.sendMail(options);
  }
}
