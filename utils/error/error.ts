import { AxiosError, AxiosResponse } from 'axios';

export interface ErrorResponse<T = Record<string, any>> {
  message: string;
  statusCode: number;
  error?: T;
}

export interface AxiosCatchError extends AxiosError {
  response: AxiosResponse<ErrorResponse>;
}
export interface AxiosCatch<T> extends AxiosError {
  response: AxiosResponse<T>;
}
export const errorCodes: Record<string, Record<string, string>> = {
  Login: {
    generic: 'Oops! Something went wrong on our end.',
    invalidCredential: 'Incorrect username or password',
    tooManyAttempts: 'Too many attempts, please wait before trying again',
    userFieldEmpty: 'Username is Required',
    emailFieldEmpty: 'Email is Required',
    passwordFieldEmpty: 'Password is Required',
    tokenFailure: 'Internal Error - Login could not be processed',
  },
  Logout: {
    generic: 'Logout Error',
  },
  UserRegistration: {
    generic: 'Error Registering User',
    usernameInUse: 'Username already in use',
    emailInUse: 'An account with this email address already exists',
    invalidUsername: 'Must contain only letters, numbers or underscore(_)',
    invalidEmail: 'Invalid email',
    invalidPassword: 'Invalid Account Password, password requirements are posted below',
    emailTooLong: 'Email address must be less than 321 characters long',
    usernameTooLong: 'Username must be less than 33 characters long',
    passwordTooLong: 'Password must be less than 64 characters long',
    emailNotValidated: 'Visit the link in the Registration email to finish registering this account',
    userRegistrationLinkInvalid: 'This user registration link is invalid',
    userRegistrationLinkExpired: 'This user registration link is expired',
    tooManyAttempts: 'Too many attempts, please wait before trying again',
    emailFieldEmpty: 'Email is Required',
    passwordFieldEmpty: 'Password is Required',
  },
  ResetPassword: {
    generic: 'Error Completing Password Reset',
    emailFailed: 'Password reset emailed failed Please try again later',
    forgotPasswordLinkInvalid: 'This link is invalid or expired',
    logoutRequired: 'You must be logged out to reset your password',
  },
  //   Image: {
  //     unknown: 'Unknown Image Error',
  //     fileExists: 'A file with this name already exists',
  //     invalidFileType: 'Uploaded files must be imageManager files',
  //     cannotChangeType: 'Cannot change file type when editing file name',
  //   },
  //   Table: {
  //     invalidSelectorType: 'Type of selector for table rows is invalid',
  //   Article: {
  //     addGeneric: 'Error creating new article',
  //     editGeneric: 'Error editing ArticleContent',
  //     deleteGeneric: 'Error deleting ArticleContent',
  //     titleFieldEmpty:'Title for the ArticleContent is required',
  //     urlPathFieldEmpty: 'A URL Path is required',
  //     contentFieldEmpty:'A URL Path is required',
  //     noThumbnailSelected: 'Please select a thumbnail for this articleContent',
  //     pathAlreadyExists: 'An articleContent at this path already exists',
  //     pathUsedByOtherArticle: 'ArticleContent URL Path already in use',
  //     mustHaveParent: 'ArticleContent path must include existing parent or have no parent',
  //     thumbnailDoesNotExist:'Invalid Thumbnail',
  //     articleContentMissing: 'ArticleContent body cannot be empty',
  //     articleNotFound: 'ArticleContent not found',
  //     articleUnchanged: 'ArticleContent is unchanged',
  //     pathMissing: 'Path Field Missing',
  //     cannotDeleteParent: 'Cannot delete parent of existing articles',
  //     cannotGetCategories:'Unable to get articleContent categories',
  //     cannotGetImages:'Unable to get articleContent thumbnails',
  //     cannotGetArticleTree: 'Unable to get articleContent path tree',
  //   },
  // },
  // Generic: {
  //   default: 'Internal Error',
  // },
};

export const clientCodes = {
  ResetPassword: {
    emailSent: 'An email has been sent to any email address associated with this account',
    success: 'Password has been updated',
    //   noUserFound: '',
  },
};
