import { CustomerType } from '../customers/@type';

interface StatisticCustomerModel {
  totalQuantityCustomerByGroup?: {
    [key: string]: number;
  };
}
