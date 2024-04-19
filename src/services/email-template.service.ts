import { EmailTemplate } from '@app/types/email-template.type';
import CRUDService from './CRUD.service';
import { Model } from 'mongoose';

class EmailTemplateService extends CRUDService<EmailTemplate> {
  constructor(modal: Model<EmailTemplate>, serviceName: string) {
    super(modal, serviceName);
  }
}
export default EmailTemplateService;
