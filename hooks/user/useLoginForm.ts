import { AxiosCatchError, errorCodes } from '@error';

//hooks
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useGetModal } from '@contexts';
import { useCookies } from 'react-cookie';

//types
import { ChangeEvent } from 'react';
import { Dispatch as ReduxDispatch } from '@reduxjs/toolkit';
import { ModalState, UserScreen } from '@contexts';
import { JwtUserLogin } from '@interface/jwt';
import { ModalSliceHookProps } from '@contexts';
import { StatusCodes } from 'http-status-codes';

const initialState = {
  user: '',
  password: '',
  userInputError: '',
  passwordInputError: '',
  error: '',
};
export interface LoginState {
  user: string;
  password: string;
  userInputError: string;
  passwordInputError: string;
  error: string;
}

export interface LoginFormProps {
  form: LoginState;
  setForm: Dispatch<SetStateAction<LoginState>>;
  handleUser: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
  setError: (error: string) => void;
}
export const useLoginForm = (
  dispatch: ReduxDispatch,
  [, , closeModal]: ModalSliceHookProps,
  login: (identifier: string, password: string) => Promise<JwtUserLogin>,
  saveUser: (email: string, username?: string | null, admin?: boolean) => void
): LoginFormProps => {
  const [{ rememberedUser }] = useCookies(['rememberedUser']);
  const { screen }: ModalState = useGetModal();
  const [form, setForm] = useState<LoginState>(initialState);
  const { user, password } = form;
  const stickyScreen = useRef<UserScreen>(UserScreen.none);

  const handleUser = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState: LoginState) => ({
      ...prevState,
      user: event.target.value,
      error: prevState.error === errorCodes.Login.userFieldEmpty ? '' : prevState.error,
    }));
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState: LoginState) => {
      return {
        ...prevState,
        password: event.target.value,
        error: prevState.error === errorCodes.Login.passwordFieldEmpty ? '' : prevState.error,
      };
    });
  };

  //Clear warnings when reopening login.
  useEffect(() => {
    if (screen === UserScreen.login && stickyScreen.current !== UserScreen.login) {
      setForm((prevState: LoginState) => ({
        ...prevState,
        user: rememberedUser || '',
        userInputError: '',
        passwordInputError: '',
      }));
    }
  }, [rememberedUser, screen]);

  const setError = (error: string) => {
    setForm((prevState: LoginState) => ({
      ...prevState,
      error,
    }));
  };

  const handleLogin = () => {
    if (!user) {
      setError(errorCodes.Login.userFieldEmpty);
    } else if (!password) {
      setError(errorCodes.Login.passwordFieldEmpty);
    } else {
      login(user, password)
        .then(({ username, email, admin }: JwtUserLogin) => {
          if (email) {
            closeModal();
            saveUser(email, username, admin);
            setForm((prevState: LoginState) => ({ ...prevState, user: '', password: '' }));
          } else {
            setError(errorCodes.Login.generic);
          }
        })
        .catch(
          ({
            response: {
              data: { message, statusCode },
            },
          }: AxiosCatchError) => {
            if (statusCode === StatusCodes.TOO_MANY_REQUESTS) {
              setError(errorCodes.Login.tooManyAttempts);
            } else {
              setError(message || errorCodes.Login.invalidCredential);
            }
          }
        );
    }
  };

  return {
    form,
    setForm,
    handleUser,
    handlePassword,
    handleLogin,
    setError,
  };
};
