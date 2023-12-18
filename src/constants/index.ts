enum MODE {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

enum ProductStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
  IN_COMING = 'IN_COMING',
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
};

export { MODE, ProductStatus, SALT, FIELDS_NAME };
