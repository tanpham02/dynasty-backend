import { uploadImage } from './uploadFile';

const uploadFileProduct = uploadImage('public/uploads/image/products');
const uploadFileCustomer = uploadImage('public/uploads/image/customers');
const uploadFileUser = uploadImage('public/uploads/image/users');

export { uploadFileProduct, uploadFileCustomer, uploadFileUser };
