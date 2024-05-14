import { Request } from 'express';

const handleUploadFile = (req: Request) => {
  let result: string = '';
  const file = req.file;
  if (file && Object.keys(file).length > 0) {
    const path = `/${file.destination}/${file.filename}`;
    result = path;
  }

  return result;
};

export { handleUploadFile };
