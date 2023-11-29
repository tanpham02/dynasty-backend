export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  UN_AUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER = 500,
}

export const INTERNAL_SERVER_ERROR_MSG = 'Internal Server Error';
