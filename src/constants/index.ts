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
  CATEGORY: 'categoryInfo',
  USER: 'userInfo',
  PRODUCT: 'productInfo',
  PRODUCT_ATTRIBUTE: 'productAttributeInfo',
  PRODUCT_VARIANT: 'productVariantInfo',
  CUSTOMER_SIGNUP: 'customerSignupInfo',
  BANNER: 'bannerInfo',
  STORE_SYSTEM: 'storeSystemInfo',
  STORE_CONFIG: 'storeConfigInfo',
  STORE_INFORMATION: 'storeInformationInfo',
  TERM_AND_POLICY: 'termAndPolicyInfo',
};

export { MODE, ProductStatus, SALT, FIELDS_NAME };
