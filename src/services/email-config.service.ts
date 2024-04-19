import { Model } from 'mongoose';

import { EmailConfig } from '@app/types/email-config.type';
import CRUDService from './CRUD.service';

class EmailConfigService extends CRUDService<EmailConfig> {
  constructor(model: Model<EmailConfig>, serviceName: string) {
    super(model, serviceName);
  }
}

export default EmailConfigService;
