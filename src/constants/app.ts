const SALT: number = 10;

const MAILER = {
  HOST: 'smtp.gmail.com',
  SERVICE: 'gmail',
  PORT: 587,
};

const FIELDS_NAME = {
  CUSTOMER_SIGNUP: 'customerSignupInfo',
  USER_LOGIN: 'userLoginInfo',
  CUSTOMER_LOGIN: 'customerLoginInfo',
  CATEGORY: 'categoryInfo',
  STAFF: 'staffInfo',
  CUSTOMER: 'customerInfo',
  CUSTOMER_ADDRESS: 'customerAddressInfo',
  PRODUCT: 'productInfo',
  PRODUCT_ATTRIBUTE: 'productAttributeInfo',
  PRODUCT_VARIANT: 'productVariantInfo',
  BANNER: 'bannerInfo',
  STORE_SYSTEM: 'storeSystemInfo',
  STORE_CONFIG: 'storeConfigInfo',
  STORE_INFORMATION: 'storeInformationInfo',
  TERM_AND_POLICY: 'termAndPolicyInfo',
  ORDER: 'orderInfo',
  MATERIAL: 'materialInfo',
  EMAIL_CONFIG: 'emailConfigInfo',
  EMAIL_TEMPLATE: 'emailTemplateInfo',
};
export const INTERNAL_SERVER_ERROR_MSG = 'Internal Server Error';

export { FIELDS_NAME, SALT, MAILER };
