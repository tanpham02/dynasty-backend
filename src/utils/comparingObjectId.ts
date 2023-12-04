export const comparingObjectId = (requestId: any, recordId: any) => {
  if (requestId && recordId) {
    if (new Object(recordId).valueOf().toString() === new Object(requestId).valueOf().toString()) {
      return true;
    }
    return false;
  }
};
