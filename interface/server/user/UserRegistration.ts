export interface FinishRegistrationResp {
  email: string;
  username: string | null;
  userId: number;
  token: string;
  tokenExpiration?: number;
}

export interface LoginResponse {
  token: string;
  expiration: number | string;
}
