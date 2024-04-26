export * from './error-handler';
export * from './verify-token';
export { default as uploadFile } from './upload-file';

// // ONE
// const uploadFileCustomer = uploadFile('public/uploads/image/customers').single('file');
// const uploadFileUser = uploadFile('public/uploads/image/users').single('file');
// const uploadFileStoreInformation = uploadFile('public/uploads/image/store-information').single(
//   'file',
// );
// const uploadFileCategory = uploadFile('public/uploads/image/category').single('file');

// // Multiple
// const uploadFileBanner = uploadFile('public/uploads/image/banners').array('files', 10);
// const uploadFileProduct = uploadFile('public/uploads/image/products').array('files', 10);

// export {
//   uploadFileProduct,
//   uploadFileCustomer,
//   uploadFileUser,
//   uploadFileBanner,
//   uploadFileStoreInformation,
//   uploadFileCategory,
// };
