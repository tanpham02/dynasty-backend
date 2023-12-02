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

export { MODE, ProductStatus, SALT };
