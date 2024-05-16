import { Schema } from 'mongoose';

const comparingObjectId = (requestId: string, recordId: string) => {
  if (Boolean(requestId) && Boolean(recordId)) {
    if (new Object(recordId).valueOf().toString() === new Object(requestId).valueOf().toString()) {
      return true;
    }
    return false;
  }
};

const convertObjectIdToString = (_id: Schema.Types.ObjectId) => {
  return new Object(_id).valueOf().toString();
};

export { comparingObjectId, convertObjectIdToString };
