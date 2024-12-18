import { BaseModel, Staff } from '@app/types';

export interface Salary extends BaseModel {
  staffId: string | Staff;
  value: number;
  isPayment: boolean; // Disable after checking. Only theADMIN role was updated after
  note?: string;
}
