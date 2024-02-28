// email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendVerificationEmail(
    email: string,
    verificationToken: string,
    mailOptions: any,
  ): Promise<void> {
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'abe1701fb87bbf',
        pass: '54f027573a08e9',
      },
    });

    await transport.sendMail(mailOptions);
  }
}
