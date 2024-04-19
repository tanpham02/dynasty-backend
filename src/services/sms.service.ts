/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { https } from 'follow-redirects';

import { configApp } from '@app/configs';
import CustomerModel from '@app/models/customers.model';

const { INFO_BIP_API_KEY, INFO_BIP_HOST } = configApp();

class SMSService {
  private phoneNumber: string;
  private otp: string;

  constructor(phoneNumber: string, otp: string) {
    this.phoneNumber = phoneNumber;
    this.otp = otp;
  }

  async sendSms() {
    const options = {
      method: 'POST',
      hostname: `${INFO_BIP_HOST}`,
      path: '/sms/2/text/advanced',
      headers: {
        Authorization: `App ${INFO_BIP_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    const formatPhoneNumber = `84${this.phoneNumber.slice(1)}`;

    const req = https.request(options, function (res) {
      const chunks: Uint8Array[] = [];

      res.on('data', function (chunk) {
        chunks.push(chunk);
      });

      res.on('end', function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });

      res.on('error', function (error) {
        console.error(error);
      });
    });

    const postData = JSON.stringify({
      messages: [
        {
          destinations: [
            {
              to: formatPhoneNumber,
            },
          ],
          from: 'Dynasty Pizza',
          text: `Cảm ơn bạn đã tin tưởng lựa chọn Dynasty Pizza. Sử dụng mã OTP dưới đây để xác minh số điện thoại của bạn. OTP có hiệu lục trong vòng 5 phút. Mã OTP là ${this.otp}. Vui lòng không chia sẻ mã này cho bất kì ai khác kể cả nhân viên của hàng.`,
        },
      ],
    });

    req.write(postData);
    req.end();
  }

  async verifyOtpAndGetCustomer() {
    const customer = await CustomerModel.findOne({
      otp: this.otp,
      phoneNumber: this.phoneNumber,
    });
    return customer;
  }
}

export default SMSService;
