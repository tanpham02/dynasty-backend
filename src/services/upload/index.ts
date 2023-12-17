import { uploadImage } from './uploadFile';

const uploadFileProduct = uploadImage('public/uploads/image/products').single('file');
const uploadFileCustomer = uploadImage('public/uploads/image/customers').single('file');
const uploadFileUser = uploadImage('public/uploads/image/users').single('file');
const uploadFileBanner = uploadImage('public/uploads/image/banners').array('files', 10);

export { uploadFileProduct, uploadFileCustomer, uploadFileUser, uploadFileBanner };
