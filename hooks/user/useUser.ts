import axios from 'axios';

//hooks
import { UserState } from '@contexts';
import { useCookies } from 'react-cookie';
import { useUserSlice } from '@contexts/redux';

//types
import { Dispatch as ReduxDispatch } from '@reduxjs/toolkit';
import { useCallback } from 'react';

export type LoginCookieFunction = (token: string, tokenExpiration: Date) => void;
export interface UserProps extends UserState {
  saveUser: (email: string, username?: string | null, admin?: boolean, onLoadFlag?: boolean) => void;
  setOnLoadFlag: (flag: boolean) => void;
  isLoggedIn: () => boolean;
  handleLogout: () => void;
  setLoginCookies: LoginCookieFunction;
  removeLoginCookies: () => void;
}

export const useUser = (ReduxDispatch: ReduxDispatch): UserProps => {
  const [{ username, email, admin, onLoadFlag }, setUser, logout] = useUserSlice(ReduxDispatch);
  const [, setCookies, removeCookies] = useCookies();
  const saveUser = (email: string, username: string | null = null, admin?: boolean, onLoadFlag?: boolean) => {
    setUser((prevState: UserState) => ({
      username,
      email,
      admin,
      onLoadFlag: typeof onLoadFlag !== 'undefined' ? onLoadFlag : prevState.onLoadFlag,
    }));
  };
  const setOnLoadFlag = (onLoadFlag: boolean) => {
    setUser((prevState: UserState) => ({
      ...prevState,
      onLoadFlag,
    }));
  };

  const isLoggedIn: () => boolean = () => !!email;

  const handleLogout = async (callBack?: (...args: any[]) => any, errorCallBack?: (...args: any[]) => any) => {
    await axios
      .post(process.env.REACT_APP_API_URL + '/users/logout')
      .then(() => {
        if (callBack) callBack();
      })
      .catch(() => {
        if (errorCallBack) errorCallBack();
      });
    removeLoginCookies();
    logout();
  };

  const setLoginCookies = useCallback(
    (token: string, expires: Date) => {
      alert('setting cookies!' + expires);
      setCookies('token', token, { expires, path: '/' });
    },
    [setCookies]
  );

  const removeLoginCookies = () => {
    removeCookies('token');
  };

  return {
    username,
    email,
    admin,
    onLoadFlag,
    saveUser,
    setOnLoadFlag,
    isLoggedIn,
    handleLogout,
    setLoginCookies,
    removeLoginCookies,
  };
};
