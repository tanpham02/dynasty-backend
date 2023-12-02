import multer from 'multer';

const uploadImage = (destination: string) => {
  const storage = multer.diskStorage({
    destination: destination,
    filename: function (_req, file, cb) {
      return cb(null, file.originalname);
    },
  });

  return multer({ storage }).single('files');
};

export { uploadImage };
