import multer from 'multer';
import path from 'path';

const uploadFile = (destination: string) => {
  const storage = multer.diskStorage({
    destination: `public/assets/images/${destination}`,
    filename: function (_req, file, cb) {
      return cb(null, file.originalname);
    },
  });

  return multer({ storage });
};

export default uploadFile;
