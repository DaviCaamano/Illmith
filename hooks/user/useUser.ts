import axios from 'axios';

//hooks
import { UserState } from '@contexts';
import { useCookies } from 'react-cookie';
import { useUserSlice } from '@contexts/redux';

//types
import { Dispatch } from '@reduxjs/toolkit';

export type LoginCookieFunction = (token: string, tokenExpiration: string) => void;
export interface UserProps extends UserState {
  saveUser: (email: string, username?: string | null, admin?: boolean) => void;
  isLoggedIn: () => boolean;
  handleLogout: () => void;
  setLoginCookies: LoginCookieFunction;
  removeLoginCookies: () => void;
}

export const useUser = (dispatch: Dispatch): UserProps => {
  const [{ username, email, admin }, setUser, logout] = useUserSlice(dispatch);

  const [, setCookie, removeCookie] = useCookies(['token']);

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

  const setLoginCookies = (token: string, tokenExpiration: string) => {
    //clear existing cookie
    removeCookie('token');

    const expires = new Date(tokenExpiration);
    //replace existing cookies
    setCookie('token', token, { expires });
  };

  const removeLoginCookies = () => {
    //clear existing token cookie
    removeCookie('token');
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
