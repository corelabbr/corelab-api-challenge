export type HttpResponse<T> = {
    statusCode: number;
    body: T | string;
    cookies?: string;
  }