export class BusinessError extends Error {
  constructor(
    message: string,
    public code = 400,
  ) {
    super(message);
    this.name = "BusinessError";
  }
}

export class NotFoundError extends BusinessError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}

export class ConflictError extends BusinessError {
  constructor(message: string) {
    super(message, 409);
  }
}
