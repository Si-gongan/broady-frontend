export interface CommonErrorResponse {
  statusCode: number;
  result: {
    errorCode: number;
    message: string;
  };
}
