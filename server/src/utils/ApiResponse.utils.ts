export default class ApiResponse {
  statusCode: number;
  message: string;
  response: boolean;
  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.response = true;
  }
}
