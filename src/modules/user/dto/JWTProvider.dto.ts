export type JWTProviderDTO = {
  payload: {
    user?: {
      id_user: string;
      name?: string;
    };
  };
  secret?: string;
  expiresIn?: number | string;
};

export interface JWTValidateDTO {
  token: string;
  secret: string;
}
