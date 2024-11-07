// HttpError.ts

export class HttpError extends Error {
  statusCode: number;
  message: string;
  details?: string;

  constructor(statusCode: number, message: string, details?: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;

    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  static BadRequest(message = "Bad Request", details?: string) {
    return new HttpError(400, message, details);
  }

  static Unauthorized(message = "Unauthorized", details?: string) {
    return new HttpError(401, message, details);
  }

  static Forbidden(message = "Forbidden", details?: string) {
    return new HttpError(403, message, details);
  }

  static NotFound(message = "Not Found", details?: string) {
    return new HttpError(404, message, details);
  }

  static InternalServerError(message = "Internal Server Error", details?: string) {
    return new HttpError(500, message, details);
  }
}


