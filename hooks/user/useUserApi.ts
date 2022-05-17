import axios, { AxiosResponse } from 'axios';
import Format from 'date-fns/format';
import jwtDecode from 'jwt-decode';
import { fetcher } from '@utils/fetch';
import { TOKEN_DATE_FORMAT } from '@constants/shared/tokenDateFormat';

//hooks
import useSWR from 'swr';
import { useUser } from '@hooks';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

//types
import { UserProps } from '@hooks';
import { JwtUserLogin } from '@interface/jwt';
import { Dispatch } from '@reduxjs/toolkit';
import { FinishRegistrationResp, LoginResponse } from '@interface/server/user/UserRegistration';

export interface LoginProps extends UserProps {
  login: (identifier: string, password: string) => Promise<JwtUserLogin>;
  validate: (token: string) => Promise<JwtUserLogin>;
}
export const useUserApi = (dispatch: Dispatch): LoginProps => {
  const router = useRouter();
  const { ruId, prId } = router.query;
  const user = useUser(dispatch);
  const { isLoggedIn, handleLogout, saveUser, setLoginCookies } = user;
  const [{ token }] = useCookies(['token']);

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
      setLoginCookies(token, expiration);
      return { email, username, admin };
    });
  };

  const validate = (token: string): Promise<JwtUserLogin> => {
    return axios({
      method: 'get',
      url: '/api/user/authorize',
      headers: { auth: token },
    }).then((resp) => {
      const data = resp.data;
      const { email, username, admin }: any = jwtDecode(data.token);
      saveUser(email, username, admin);
      setLoginCookies(data.token, data.expiration);
      return { email, username, admin };
    });
  };

  useSWR<LoginResponse>(token && !isLoggedIn() ? ['/api/user/validate', { headers: { token } }] : null, fetcher, {
    onSuccess: ({ token: jwt, expiration }: LoginResponse) => {
      const { email, username, admin }: any = jwtDecode(jwt);
      saveUser(email, username, admin);
      setLoginCookies(jwt, expiration);
    },
    onError: () => {
      handleLogout();
    },
  });

  useSWR(ruId ? ['/api/user/register', { params: { token: ruId }, method: 'get' }] : null, fetcher, {
    onSuccess: ({ data: { email, username, token, tokenExpiration } }: AxiosResponse<FinishRegistrationResp>) => {
      alert('!');
      saveUser(email, username);
      if (tokenExpiration) {
        setLoginCookies(token, Format(new Date(tokenExpiration), TOKEN_DATE_FORMAT));
      }
    },
    onError: () => {
      //TODO RAISE ALERT
    },
  });

  return { login, validate, ...user };
};
