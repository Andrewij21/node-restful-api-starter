export class ApiError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource not found") {
    super(404, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden") {
    super(403, message);
  }
}
