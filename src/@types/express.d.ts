declare namespace Express {
  export interface Request {
    userIp: string | string[];
    user?: {
      id_user: string;
      name: string;
    };
  }
}
