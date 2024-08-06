export type JWTProviderDTO = {
  payload: {
    id: number;
    role: string;
  };
  secret?: string;
  expiresIn?: number | string;
};

export interface JWTValidateDTO {
  token: string;
  secret: string;
}
