import moment from 'moment';

export type DateUnit =
  | 'year'
  | 'years'
  | 'y'
  | 'month'
  | 'months'
  | 'M'
  | 'week'
  | 'weeks'
  | 'w'
  | 'day'
  | 'days'
  | 'd'
  | 'hour'
  | 'hours'
  | 'h'
  | 'minute'
  | 'minutes'
  | 'm'
  | 'second'
  | 'seconds'
  | 's'
  | 'millisecond'
  | 'milliseconds'
  | 'ms'
  | 'quarter'
  | 'quarters'
  | 'Q';

export const YYYY_MM_DDTHH_MM_SS = 'YYYY-MM-DDTHH:mm:ss';
export const DD_MM_YYYY = 'DD-MM-YYYY';

export const formatDate = (date: string, format: string) => {
  return moment(date).format(format);
};

export const addDate = (date: string, amount: number, unit: DateUnit) => {
  return moment(date).add(amount, unit);
};

export const subtractDate = (date: string, amount: number, unit: DateUnit) => {
  return moment(date).subtract(amount, unit);
};
