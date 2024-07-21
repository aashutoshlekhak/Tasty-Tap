export class ApiError extends Error {
  status: number;
  success: boolean;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.success = false;
  }
}
