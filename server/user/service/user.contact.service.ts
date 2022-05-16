import { MailService } from '@server/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserContactService {
  constructor(private readonly mail: MailService) {}

  sendUserRegistrationEmail = (to: string | string[], token: string) => {
    return this.mail.sendMail(registerUserOption(to, token));
  };

  sendResetPasswordEmail = (to: string | string[], token: string) => {
    return this.mail.sendMail(forgotPasswordOptions(to, token));
  };
}

const registerUserOption = (to: string | string[], token: string) => {
  return {
    from: 'noreplysennoscampaign@gmail.com',
    to: Array.isArray(to) ? to.join(' ,') : to,
    subject: 'Illmith Campaign User Registration',
    html: `
        <h1>Illmith User Registration</h1>
        <p>
            Thank you for registering an account with us at Illmith.com. If you like the world we\'ve built, feel free 
            to show your support at our 
            <a href="${process.env.FRONTEND_URL}/donate">
                donation page.
            </a>
        </p>
        <br />
       
        <a href="${process.env.FRONTEND_URL}/user/registraition/${token}">
            <b style="font-size: 24px">Click here to complete your account registration.</b>
        </a>`,
  };
};

const forgotPasswordOptions = (to: string | string[], token: string) => {
  return {
    from: 'noreplysennoscampaign@gmail.com',
    to: Array.isArray(to) ? to.join(' ,') : to,
    subject: 'Illmith Campaign Password Reset',
    html: `
        <h1>Illmith User Registration</h1>
        <p>
            A request has been made to your Illmith.com account for its password to be reset.
            
            <b>If you did not make this request, please ignore this message. 
            If you did, click the link below to reset your password.</b>
        </p>
        <br />
       
        <a href='${process.env.FRONTEND_URL}/user/password/${token}'>
            <b style='font-size: 24px'>Click here to reset your password.</b>
        </a>`,
  };
};
