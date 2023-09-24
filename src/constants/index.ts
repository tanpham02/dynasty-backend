enum MODE {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

enum Status {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
  DELETED = 'DELETED',
  IN_COMING = 'IN_COMING',
}

const SALT: number = 10;

export { MODE, Status, SALT };
