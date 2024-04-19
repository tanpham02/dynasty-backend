/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

import { configApp } from '@app/configs';
import { MAILER } from '@app/constants';

const { MAIL_APPLICATION_PASSWORD, MAIL_USERNAME } = configApp();

class MailerService {
  private username?: string;
  private password?: string;
  private mailOption: MailOptions;

  constructor(mailOption: MailOptions, username?: string, password?: string) {
    this.username = username;
    this.password = password;
    this.mailOption = mailOption;
  }

  sendMail() {
    const transporter = nodemailer.createTransport({
      service: MAILER.SERVICE,
      host: MAILER.HOST,
      port: MAILER.PORT,
      auth: {
        user: this.username ?? MAIL_USERNAME,
        pass: this.password ?? MAIL_APPLICATION_PASSWORD,
      },
    });

    const dataSendMail: MailOptions = this.mailOption;

    return transporter.sendMail(dataSendMail, (err, result) => {
      if (!err) {
        return result;
      }
      transporter.close();
      return err;
    });
  }
}

export default MailerService;
