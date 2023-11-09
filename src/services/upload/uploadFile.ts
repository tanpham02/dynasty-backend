import multer from 'multer';

const uploadImage = (destination: string) => {
  const storage = multer.diskStorage({
    destination: destination,
    filename: function (req, file, cb) {
      return cb(null, file.originalname);
    },
  });

  return multer({ storage }).single('files');
};

export { uploadImage };
