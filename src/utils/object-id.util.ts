import { Schema } from 'mongoose';

const convertObjectIdToString = (_id: Schema.Types.ObjectId | string) => {
  return new Object(_id).valueOf().toString();
};

const comparingObjectId = (requestId: string, recordId: string) =>
  requestId && recordId && convertObjectIdToString(recordId) === convertObjectIdToString(requestId);

export { comparingObjectId, convertObjectIdToString };
