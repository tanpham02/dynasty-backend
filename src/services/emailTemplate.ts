import { EmailTemplate } from '@app/models/emailTemplate/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';

class EmailTemplateService extends CRUDService<EmailTemplate> {
  constructor(modal: Model<EmailTemplate>, serviceName: string) {
    super(modal, serviceName);
  }
}
export default EmailTemplateService;
