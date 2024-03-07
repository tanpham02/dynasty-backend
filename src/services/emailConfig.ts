import { Model } from 'mongoose';

import { EmailConfig } from '@app/models/emailConfig/@type';
import CRUDService from './crudService';

class EmailConfigService extends CRUDService<EmailConfig> {
  constructor(model: Model<EmailConfig>, serviceName: string) {
    super(model, serviceName);
  }
}

export default EmailConfigService;
