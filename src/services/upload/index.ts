import { uploadImage } from './uploadFile';

// ONE
const uploadFileCustomer = uploadImage('public/uploads/image/customers').single('file');
const uploadFileUser = uploadImage('public/uploads/image/users').single('file');
const uploadFileStoreInformation = uploadImage('public/uploads/image/store-information').single(
  'file',
);

// Multiple
const uploadFileBanner = uploadImage('public/uploads/image/banners').array('files', 10);
const uploadFileProduct = uploadImage('public/uploads/image/products').array('files', 10);

export {
  uploadFileProduct,
  uploadFileCustomer,
  uploadFileUser,
  uploadFileBanner,
  uploadFileStoreInformation,
};
