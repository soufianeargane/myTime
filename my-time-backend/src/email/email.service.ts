// email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendVerificationEmail(
    email: string,
    verificationToken: string,
  ): Promise<void> {
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'abe1701fb87bbf',
        pass: '54f027573a08e9',
      },
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Verify Your Account',
      text: `Click the following link to verify your account: http://example.com/verify/${verificationToken}`,
    };

    await transport.sendMail(mailOptions);
  }
}
