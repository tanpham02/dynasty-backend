import moment from 'moment';

export const TIME_ZONE_VIET_NAME = 'Asia/Ho_Chi_Minh';

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
export const YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss';
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

export const parserUTC7 = (cb: moment.Moment, format: string): string => {
  const parse = cb.utc(true).format(format);
  return parse;
};

export const timeByLocalTimeZone = (time?: string | Date) => {
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset();
  return new Date(
    (time ? new Date(time).getTime() : new Date().getTime()) - timezoneOffset * 60 * 1000,
  );
};

export const currentMonthFirstDate = (current: Date, format?: string) => {
  const instance = moment(current, format);
  return instance.isValid() ? instance.startOf('month') : null;
};

export const currentMonthLastDate = (current: Date, format?: string) => {
  const instance = moment(current, format);
  return instance.isValid() ? instance.endOf('month').endOf('day') : null;
};
