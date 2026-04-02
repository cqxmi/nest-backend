/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.qq.com', // 或 smtp.gmail.com
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // 你的邮箱
        pass: process.env.EMAIL_PASS, // 授权码（不是密码）
      },
    });
  }

  async sendMail(html: string): Promise<boolean> {
    const info = await this.transporter.sendMail({
      from: `Jarvis <${process.env.EMAIL_USER}>,`,
      to: process.env.EMAIL_USER,
      subject: 'Message',
      html,
    });

    if (info && info.accepted && info.accepted.length) {
      return true;
    } else {
      return false;
    }
  }
}
