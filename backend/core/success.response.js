const StatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const ReasonPhrases = {
  OK: "OK",
  CREATED: "Created",
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not Found",
  REQUEST_TIMEOUT: "Request Timeout",
  CONFLICT: "Conflict",
  TOO_MANY_REQUESTS: "Too Many Requests",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};

class SuccessResponse {
  constructor({ message, status, data = {}, reason }) {
    this.status = status ?? StatusCodes.OK;
    this.message = message ?? reason ?? ReasonPhrases.OK;
    this.data = data;
  }
}
export class OkSuccess extends SuccessResponse {
  constructor({ message, data = {} }) {
    super({ message, data });
  }
}
export class CreatedSuccess extends SuccessResponse {
  constructor({
    message,
    status = StatusCodes.CREATED,
    data = {},
    reason = ReasonPhrases.CREATED,
  }) {
    super({
      message,
      status,
      data,
      reason,
    });
  }
}
