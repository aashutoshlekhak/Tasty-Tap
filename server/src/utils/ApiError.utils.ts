export class ApiError extends Error {
  status: number;
  success: boolean;
  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.success = false;
    this.message = message;
  }
}
