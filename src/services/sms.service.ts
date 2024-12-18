/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import twilioClient from 'twilio';

import { configApp } from '@app/configs';
import Exception from '@app/exception';
import CustomerModel from '@app/models/customers.model';
import { HttpStatusCode } from '@app/types';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = configApp();

class SMSService {
  private phoneNumber: string;
  private otp: string;

  constructor(phoneNumber: string, otp: string) {
    this.phoneNumber = phoneNumber;
    this.otp = otp;
  }

  async sendSms() {
    const formatPhoneNumber = `+84${
      this.phoneNumber?.startsWith('0') ? this.phoneNumber?.slice(1) : this.phoneNumber
    }`;
    const body = `Cảm ơn bạn đã tin tưởng lựa chọn Dynasty Pizza. Sử dụng mã OTP dưới đây để xác minh số điện thoại của bạn. OTP có hiệu lục trong vòng 5 phút. Mã OTP là ${this.otp}. Vui lòng không chia sẻ mã này cho bất kì ai khác kể cả nhân viên cửa hàng.`;

    twilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
      .messages.create({
        body,
        from: TWILIO_PHONE_NUMBER,
        to: formatPhoneNumber,
      })
      .then((message) => ({ messageId: message.sid, message: 'Send messages successfully' }))
      .catch((err) => {
        throw new Exception(err?.status, err?.message);
      });
  }

  async verifyOtpAndGetCustomer() {
    const customer = await CustomerModel.findOne({
      $and: [
        { otp: this.otp },
        {
          phoneNumber: this.phoneNumber,
        },
      ],
    }).lean();

    if (!customer) {
      throw new Exception(HttpStatusCode.BAD_REQUEST, 'OTP is wrong or invalid!');
    }
    await CustomerModel.findOne({
      $and: [
        { otp: this.otp },
        {
          phoneNumber: this.phoneNumber,
        },
      ],
    }).updateOne({
      $set: {
        otp: null,
      },
    });

    return customer;
  }
}

export default SMSService;
