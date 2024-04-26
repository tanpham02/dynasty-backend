const comparingObjectId = (requestId: string, recordId: string) => {
  if (Boolean(requestId) && Boolean(recordId)) {
    if (new Object(recordId).valueOf().toString() === new Object(requestId).valueOf().toString()) {
      return true;
    }
    return false;
  }
};

export { comparingObjectId };
