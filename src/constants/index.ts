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
};

export { MODE, ProductStatus, SALT, FIELDS_NAME };
