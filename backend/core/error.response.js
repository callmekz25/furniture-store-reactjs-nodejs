import { StatusCode, ReasonPhrases } from "../utils/httpStatusCode.js";

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
export class ConflictRequestError extends ErrorResponse {
  constructor(message = ReasonPhrases.CONFLICT, status = StatusCode.CONFLICT) {
    super(message, status);
  }
}
export class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.BAD_REQUEST,
    status = StatusCode.BAD_REQUEST
  ) {
    super(message, status);
  }
}
export class NotFoundError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.NOT_FOUND,
    status = StatusCode.NOT_FOUND
  ) {
    super(message, status);
  }
}
export class ForbiddenError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.FORBIDDEN,
    status = StatusCode.FORBIDDEN
  ) {
    super(message, status);
  }
}
export class AuthFailureError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    status = StatusCode.UNAUTHORIZED
  ) {
    super(message, status);
  }
}
