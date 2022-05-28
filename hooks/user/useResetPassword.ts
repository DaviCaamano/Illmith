import axios from 'axios';
import { AxiosCatch, errorCodes, ErrorResponse } from '@error';

//hooks
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAlert } from '@hooks';

//types
import { AlertTemplate, UserScreen } from '@contexts';
import { Dispatch as ReduxDispatch } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';
import { RegistrationError } from '@utils/server';
import { NextRouter } from 'next/router';
import { ValidatedPassword } from '@utils/user';

export interface ResetPasswordState {
  email: string;
  error: string;
}

export interface NewPasswordState {
  password: string;
  passwordValidation: passwordValidation;
  error: string;
}

interface passwordValidation {
  hasSixCharacters: boolean;
  hasCorrectCase: boolean;
  hasNumber: boolean;
}

export type InputHandler = (event: ChangeEvent<HTMLInputElement>) => void;

const initialNewPasswordState: NewPasswordState = {
  password: '',
  error: '',
  passwordValidation: {
    hasSixCharacters: false,
    hasCorrectCase: false,
    hasNumber: false,
  },
};

const initialResetPasswordState: ResetPasswordState = {
  email: '',
  error: '',
};

export interface ResetPasswordProps {
  resetPasswordForm: ResetPasswordState;
  newPasswordForm: NewPasswordState;
  handleResetPasswordSubmit: () => void;
  handleNewPasswordSubmit: () => void;
  handleResetPasswordInput: InputHandler;
  handleNewPasswordInput: (validatedPassword: ValidatedPassword) => void;
  setResetPasswordError: (error: string) => void;
  setNewPasswordError: (error: string) => void;
}
export const useResetPassword = (
  ReduxDispatch: ReduxDispatch,
  router: NextRouter,
  setModal: (screen?: UserScreen) => void,
  handleLogout: () => void
): ResetPasswordProps => {
  const { prId } = router.query;
  const [resetPasswordForm, setResetPasswordForm] = useState<ResetPasswordState>(initialResetPasswordState);
  const [newPasswordForm, setNewPasswordForm] = useState<NewPasswordState>(initialNewPasswordState);
  const { email } = resetPasswordForm;
  const { password, passwordValidation } = newPasswordForm;
  const { prompt } = useAlert(ReduxDispatch);

  const passwordResetAttempted = useRef<boolean>(false);
  useEffect(() => {
    if (prId && !passwordResetAttempted.current) {
      passwordResetAttempted.current = true;
      setModal(UserScreen.new_password);
    }
  }, [prId, setModal]);

  const passwordIsValidated = (validations = passwordValidation) => {
    if (!password) {
      setNewPasswordForm((prevState: NewPasswordState) => ({
        ...prevState,
        error: errorCodes.UserRegistration.passwordFieldEmpty,
      }));
      return false;
    }
    const isValidated = validations.hasSixCharacters && validations.hasCorrectCase && validations.hasNumber;
    if (!isValidated) {
      setNewPasswordForm((prevState: NewPasswordState) => ({
        ...prevState,
        error: errorCodes.UserRegistration.invalidPassword,
      }));
      return false;
    }
    return true;
  };

  const handleResetPasswordInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setResetPasswordForm((prevState: ResetPasswordState) => ({ ...prevState, email: event.target.value }));
  }, []);

  const handleNewPasswordInput = useCallback(
    ({ password, hasSixCharacters, hasCorrectCase, hasNumber }: ValidatedPassword) => {
      setNewPasswordForm((prevState: NewPasswordState) => ({
        ...prevState,
        password,
        passwordValidation: {
          hasSixCharacters,
          hasCorrectCase,
          hasNumber,
        },
      }));
    },
    []
  );

  const handleResetPasswordSubmit = () => {
    setResetPasswordForm(initialResetPasswordState);
    axios
      .put('/api/user/password', { email })
      .then(() => {
        setModal();
        setResetPasswordForm(initialResetPasswordState);
        prompt({
          template: AlertTemplate.EmailNotificationPrompt,
          args: {
            message: `Account recovery email sent`,
            subMessage: 'If this account exists you should expect to see a recovery email shortly.',
          },
        });
      })
      .catch(
        ({
          response: {
            data: { error, statusCode },
          },
        }: AxiosCatch<ErrorResponse<RegistrationError>>) => {
          let errorMSg: string;
          if (statusCode === StatusCodes.TOO_MANY_REQUESTS) {
            errorMSg = errorCodes.Login.tooManyAttempts;
          } else if (!error) {
            errorMSg = errorCodes.Login.generic;
          } else {
            errorMSg =
              error.warning ?? (!error.email && !error.username && !error.password) ? errorCodes.Login.generic : '';
          }
          setResetPasswordError(errorMSg);
        }
      );
  };

  const handleNewPasswordSubmit = () => {
    if (passwordIsValidated()) {
      console.log({ password, token: prId });
      axios
        .post('/api/user/password', { password, token: prId })
        .then(() => {
          setModal();
          setNewPasswordForm(initialNewPasswordState);
          handleLogout();
          router.push('/').then(() =>
            prompt({
              template: AlertTemplate.success,
              args: {
                message: 'Password has been reset',
              },
            })
          );
        })
        .catch(() => {
          setNewPasswordError(errorCodes.ResetPassword.forgotPasswordLinkInvalid);
        });
      setNewPasswordForm(initialNewPasswordState);
    }
  };

  const setResetPasswordError = (error: string) => {
    setResetPasswordForm((prevState: ResetPasswordState) => ({ ...prevState, error }));
  };

  const setNewPasswordError = (error: string) => {
    setNewPasswordForm((prevState: NewPasswordState) => ({ ...prevState, error }));
  };
  return {
    newPasswordForm,
    resetPasswordForm,
    handleResetPasswordSubmit,
    handleNewPasswordSubmit,
    handleResetPasswordInput,
    handleNewPasswordInput,
    setResetPasswordError,
    setNewPasswordError,
  };
};
