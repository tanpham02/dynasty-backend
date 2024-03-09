import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

class MailService {
  private username: string;
  private password: string;
  private mailOption!: MailOptions;

  constructor(username: string, password: string, mailOption: MailOptions) {
    this.username = username;
    this.password = password;
    this.mailOption = mailOption;
  }

  sendMail() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'phamvantan1311@gmail.com',
        pass: 'wxbs cjkw dlrn mukk', // application password
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
