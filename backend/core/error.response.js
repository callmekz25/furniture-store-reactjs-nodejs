import { StatusCode, ReasonPhrases } from "../utils/httpStatusCode.js";

export class ConflicRequestError extends Error {
  constructor(message = ReasonPhrases.CONFLICT, status = StatusCode.CONFLICT) {
    super(message, status);
  }
}
export class BadRequestError extends Error {
  constructor(
    message = ReasonPhrases.BAD_REQUEST,
    status = StatusCode.BAD_REQUEST
  ) {
    super(message, status);
  }
}
export class NotFoundError extends Error {
  constructor(
    message = ReasonPhrases.NOT_FOUND,
    status = StatusCode.NOT_FOUND
  ) {
    super(message, status);
  }
}
export class ForbiddenError extends Error {
  constructor(
    message = ReasonPhrases.FORBIDDEN,
    status = StatusCode.FORBIDDEN
  ) {
    super(message, status);
  }
}
export class AuthFailureError extends Error {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    status = StatusCode.UNAUTHORIZED
  ) {
    super(message, status);
  }
}
