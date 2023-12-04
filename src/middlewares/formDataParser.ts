import multer from 'multer';

export const formDataParser = (fieldName: string) => {
  return multer().single(fieldName);
};
