import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

import { configApp } from '@app/configs';
import { MAIL_HOST, MAIL_POST, MAIL_SERVICE } from '@app/constants';

const { MAIL_APPLICATION_PASSWORD, MAIL_USERNAME } = configApp();
class MailService {
  private mailOption: MailOptions;

  constructor(mailOption: MailOptions) {
    this.mailOption = mailOption;
  }

  sendMail() {
    const transporter = nodemailer.createTransport({
      service: MAIL_HOST,
      host: MAIL_SERVICE,
      port: MAIL_POST,
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_APPLICATION_PASSWORD,
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

export default MailService;
