import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import { fetcher } from '@utils/fetch';
import { errorCodes } from '@error';

//hooks
import useSWR from 'swr';
import { useUser } from '@hooks';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useCookies } from 'react-cookie';

//types
import { UserProps } from '@hooks';
import { JwtUserLogin } from '@interface/jwt';
import { Dispatch } from '@reduxjs/toolkit';
import { FinishRegistrationResp, LoginResponse } from '@interface/server/user/UserRegistration';
import { Pages } from '@interface/shared';
import { AlertConfirmFunc, AlertTemplate } from '@contexts';
import { NextRouter } from 'next/router';

export interface LoginProps extends UserProps {
  login: (identifier: string, password: string) => Promise<JwtUserLogin>;
}
export const useUserApi = (dispatch: Dispatch, router: NextRouter, prompt: AlertConfirmFunc): LoginProps => {
  const { ruId } = router.query;
  const user = useUser(dispatch);
  const { onLoadFlag, isLoggedIn, handleLogout, saveUser, setOnLoadFlag, setLoginCookies } = user;
  const [cookies] = useCookies(['token']);
  const { token } = cookies;

  const login = (identifier: string, password: string): Promise<JwtUserLogin> => {
    return axios({
      method: 'post',
      url: '/api/user/login',
      data: {
        identifier,
        password,
      },
    }).then(({ data: { token, expiration } }: AxiosResponse<LoginResponse>) => {
      const { email, username, admin } = jwtDecode<JwtUserLogin>(token);
      saveUser(email, username, admin);
      setLoginCookies(token, new Date(expiration));
      return { email, username, admin };
    });
  };

  useSWR<LoginResponse>(
    !onLoadFlag && token && !isLoggedIn() ? ['/api/user/validate', { headers: { auth: token } }] : null,
    fetcher,
    {
      onSuccess: ({ token: jwt }: LoginResponse) => {
        const { email, username, admin }: any = jwtDecode(jwt);
        saveUser(email, username, admin, true);
      },
      onError: () => {
        setOnLoadFlag(true);
        handleLogout();
      },
    }
  );

  const registrationAttempted = useRef<boolean>(false);
  useSWR(
    !registrationAttempted.current && ruId ? ['/api/user/register', { params: { token: ruId }, method: 'get' }] : null,
    fetcher,
    {
      onSuccess: ({ email, username, token, tokenExpiration }: FinishRegistrationResp) => {
        registrationAttempted.current = true;
        saveUser(email, username);
        if (tokenExpiration) {
          setLoginCookies(token, new Date(tokenExpiration));
        }
        router.push(Pages.home).then(() => {
          prompt({
            template: AlertTemplate.Welcome,
            args: {
              message: ['Registration successful!', 'You have been logged in.'],
            },
          });
        });
      },
      onError: () => {
        registrationAttempted.current = true;
        prompt({ args: errorCodes.UserRegistration.userRegistrationLinkInvalid });
      },
    }
  );

  return { login, ...user };
};
