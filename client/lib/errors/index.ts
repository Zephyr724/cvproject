export class BusinessError extends Error {
  status: number;
  constructor(message: string, status: number = 400) {
    super(message);
    this.status = status;
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
