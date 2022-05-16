export interface JwtUserLogin {
  email: string;
  username: string;
  admin: boolean;
}

export interface JwtTokenUserData {
  email: string;
  password: string;
  expiration: string;
  username?: string;
  subscribe?: boolean;
}
