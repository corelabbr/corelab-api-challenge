export type JWTProviderDTO = {
  payload: {
    id: number;
  };
  secret?: string;
  expiresIn?: number | string;
};

export interface JWTValidateDTO {
  token: string;
  secret: string;
}
