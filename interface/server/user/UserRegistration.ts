export interface StartRegistrationResp {
  password: string;
  expiration: Date;
  email: string;
  username: string | undefined;
  token: string;
}

export interface FinishRegistrationResp {
  email: string;
  username: string | null;
  userId: number;
  token: string;
  tokenExpiration?: number;
}

export interface LoginResponse {
  token: string;
  expiration: string;
}
