import axios from 'axios';

//hooks
import { UserState } from '@contexts';
import { useCookies } from 'react-cookie';
import { useUserSlice } from '@contexts/redux';

//types
import { Dispatch } from '@reduxjs/toolkit';
import { useCallback } from 'react';

export type LoginCookieFunction = (token: string, tokenExpiration: Date) => void;
export interface UserProps extends UserState {
  saveUser: (email: string, username?: string | null, admin?: boolean) => void;
  isLoggedIn: () => boolean;
  handleLogout: () => void;
  setLoginCookies: LoginCookieFunction;
  removeLoginCookies: () => void;
}

export const useUser = (dispatch: Dispatch): UserProps => {
  const [{ username, email, admin }, setUser, logout] = useUserSlice(dispatch);
  const [, setCookies] = useCookies();

  const saveUser = (email: string, username: string | null = null, admin?: boolean) => {
    setUser({ username, email, admin });
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
    //TODO DO NOT REMOVE COOKIES IF LOGOUT FUNCTION FAILS
    //ALSO FIX LOGIN AND PROVIDE ERROR HANDLING FOR NORMAL LOGIN AND VALIDATED LOGIN
    //clear existing token cookie
    // removeCookies('token');
  };

  return {
    username,
    email,
    admin,
    saveUser,
    isLoggedIn,
    handleLogout,
    setLoginCookies,
    removeLoginCookies,
  };
};
