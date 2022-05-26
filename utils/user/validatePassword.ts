export interface PasswordValidation {
  hasSixCharacters: boolean;
  hasCorrectCase: boolean;
  hasNumber: boolean;
}

export interface ValidatedPassword extends PasswordValidation {
  password: string;
}

export const validatePassword = (password: string): ValidatedPassword => {
  const hasEnoughLetters = new RegExp('(?=.{6,})').test(password);
  const hasNumber = new RegExp('(?=.*[0-9])').test(password);
  const hasLowercase = new RegExp('(?=.*[a-z])').test(password);
  const hasUppercase = new RegExp('(?=.*[A-Z])').test(password);
  return {
    password,
    hasSixCharacters: hasEnoughLetters,
    hasCorrectCase: hasLowercase && hasUppercase,
    hasNumber: hasNumber,
  };
};
