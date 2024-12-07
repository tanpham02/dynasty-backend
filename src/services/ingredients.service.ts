/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Model } from 'mongoose';

import { CRUDService } from '@app/services';
import { Ingredients } from '@app/types';

class IngredientsService extends CRUDService<Ingredients> {
  constructor(model: Model<Ingredients>, serviceName: string) {
    super(model, serviceName);
  }
}

export default IngredientsService;
