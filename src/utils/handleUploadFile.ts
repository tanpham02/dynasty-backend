/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { TypeUpload } from '@app/types';
import { Request } from 'express';

const handleUploadFile = (req: Request, typeUpload: TypeUpload) => {
  let files: string[] = [];
  if (typeUpload === TypeUpload.ONE) {
    const file = req.file;
    if (file && Object.keys(file).length > 0) {
      const path = `/${file.path}`;
      files.push(path);
    }
  }

  if (typeUpload === TypeUpload.MULTIPLE) {
    const filesRequest = req.files as Array<Request['file']>;
    if (filesRequest && filesRequest.length > 0) {
      files = filesRequest.map((file) => `/${file?.path!}`);
    }
  }

  return files;
};

export default handleUploadFile;
