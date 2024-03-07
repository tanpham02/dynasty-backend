enum MODE {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  STAGING = 'staging',
}

enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  INCOMING = 'INCOMING',
}

const SALT: number = 10;

const FIELDS_NAME = {
  CUSTOMER_SIGNUP: 'customerSignupInfo',
  USER_LOGIN: 'userLoginInfo',
  CUSTOMER_LOGIN: 'customerLoginInfo',
  CATEGORY: 'categoryInfo',
  USER: 'userInfo',
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

export { FIELDS_NAME, MODE, ProductStatus, SALT };
