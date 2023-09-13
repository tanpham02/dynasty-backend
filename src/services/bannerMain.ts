import BannerMain from '@app/models/bannerMain/@type';
import CRUDService from './crudService';
import { Model } from 'mongoose';

class BannerMainService extends CRUDService<BannerMain> {
  constructor(model: Model<BannerMain>, nameService: string) {
    super(model, nameService);
  }
}

export default BannerMainService;
