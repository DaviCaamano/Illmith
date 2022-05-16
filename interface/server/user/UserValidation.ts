export interface UserValidation {
  token: string;
  expiration: Date;
  admin?: boolean;
}
