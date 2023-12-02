import multer from 'multer';

export const formDataParser = () => {
  return multer().any();
};
