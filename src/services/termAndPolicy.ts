import { Model } from 'mongoose';
import CRUDService from './crudService';
import TermAndPolicy from '@app/models/termAndPolicy/@type';

class TermAndPolicyService extends CRUDService<TermAndPolicy> {
  constructor(model: Model<TermAndPolicy>, nameService: string) {
    super(model, nameService);
  }
}

export default TermAndPolicyService;
