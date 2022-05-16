import { errorCodes } from '@error';
import { ErrorHandler } from '@utils/server';
import { HttpStatus } from '@nestjs/common';
const MAX_USERNAME_LENGTH = 32,
  MAX_PASSWORD_LENGTH = 64,
  MAX_EMAIL_LENGTH = 255;
export interface RegistrationError {
  email?: string;
  username?: string;
  password?: string;
  warning?: string;
}
export const validateRegisteringUser = (
  emailAlreadyUsed: boolean,
  usernameAlreadyUsed: boolean,
  email: string,
  password: string,
  httpError: ErrorHandler,
  username?: string
): void | never => {
  let errors: RegistrationError = {};

  //Email Already in Use
  if (emailAlreadyUsed) {
    errors.email = errorCodes.UserRegistration.emailInUse;
  }
  //Invalid Email
  else if (!validateUserRegistrationEmail(email)) {
    errors.email = errorCodes.UserRegistration.invalidEmail;
  }
  //Email too long.
  else if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = errorCodes.UserRegistration.emailTooLong;
  }

  //Username Already in use
  if (usernameAlreadyUsed) {
    errors.username = errorCodes.UserRegistration.usernameInUse;
  }
  //Invalid Username
  else if (!validateUserRegistrationUsername(username)) {
    errors.username = errorCodes.UserRegistration.invalidUsername;
  }
  //Username too long
  else if (username && username.length > MAX_USERNAME_LENGTH) {
    errors.username = errorCodes.UserRegistration.usernameTooLong;
  }

  //Password too long
  if (password.length > MAX_PASSWORD_LENGTH) {
    errors.password = errorCodes.UserRegistration.passwordTooLong;
  }
  //Invalid Password
  else if (!validateUserRegistrationPassword(password)) {
    errors.password = errorCodes.UserRegistration.invalidPassword;
  }

  if (errors.email || errors.username || errors.password) {
    httpError(errors, HttpStatus.CONFLICT);
  }
};

const validateUserRegistrationPassword = (password: string) => {
  const hasEnoughLetters = new RegExp('(?=.{6,})').test(password);
  const hasNumber = new RegExp('(?=.*[0-9])').test(password);
  const hasLowercase = new RegExp('(?=.*[a-z])').test(password);
  const hasUppercase = new RegExp('(?=.*[A-Z])').test(password);
  return hasEnoughLetters && hasNumber && hasLowercase && hasUppercase;
};

const validateUserRegistrationUsername = (username?: string) => {
  if (!username) return true;
  return new RegExp('^[a-zA-Z0-9_.-]*$').test(username);
};

const validateUserRegistrationEmail = (email: string) =>
  /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(
    email
  );
