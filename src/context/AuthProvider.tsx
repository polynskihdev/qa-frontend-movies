'use client';

import {
  createContext, ReactNode, useEffect, useMemo, useState,
} from 'react';

import {
  SignInRequest, User,
} from '@lib/types';
import inMemoryJWT from '@lib/inMemoryJWT';

import { useMutation } from '@tanstack/react-query';
import AuthService from '@api/services/AuthService/service';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface AuthContextProps {
  isLogged: boolean;
  signIn: (data: SignInRequest) => void;
  signOut: () => void;
  session: User | null;
}

const initialState: AuthContextProps = {
  isLogged: true,
  signIn: async () => {},
  signOut: () => {},
  session: null,
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(initialState);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [session, setSession] = useState<AuthContextProps['session']>(null);

  const { mutateAsync: authLogin } = useMutation(
    ['authLogin'],
    (credentials: SignInRequest) => AuthService.login({ params: credentials }),
  );

  const { mutateAsync: getUserInfo } = useMutation(
    ['getUserInfo'],
    AuthService.getUserInfo,
  );

  const { mutateAsync: refreshTokensRequest } = useMutation(['refreshTokens'], AuthService.refreshTokens);
  const { mutateAsync: logOut } = useMutation(['logOut'], AuthService.logout);

  const signIn = async (credentials: SignInRequest) => {
    try {
      await authLogin(credentials, {
        onSuccess: ({ accessToken, expiresIn, user }) => {
          inMemoryJWT.deleteToken();
          setIsLogged(true);
          inMemoryJWT.setToken(accessToken, expiresIn);
          setSession(user);
          toast.success('Вы вошли в аккаунт');
        },
        onError: ({ status }: AxiosError | any) => {
          switch (status) {
            case '401':
              toast.error('Неверная почта или пароль');
              return;
            case '403':
              toast.error('У вас нет доступа к ресурсу');
              return;
            default:
              toast.error('Что-то пошло не так');
          }
        },
      });
    } catch (e) { console.log(e); }
  };

  const signOut = async () => {
    try {
      await logOut({});
    } catch (e: any) {
      console.log(e);

      inMemoryJWT.deleteToken();
      setIsLogged(false);
      setSession(null);
    }
  };

  const fetchUserData = async () => {
    try {
      const data = await getUserInfo({});
      setSession(data);
      setIsLogged(true);
    } catch (e: any) {
      console.log(e);

      inMemoryJWT.deleteToken();
      setIsLogged(false);
    }
  };

  const refreshTokens = async () => {
    try {
      const data = await refreshTokensRequest({});

      const { accessToken, expiresIn } = data;

      fetchUserData();

      inMemoryJWT.setToken(accessToken, expiresIn);
    } catch (e: any) {
      console.log(e);

      inMemoryJWT.deleteToken();
      setIsLogged(false);
    }
  };

  useEffect(() => {
    refreshTokens();
  }, []);

  useEffect(() => {
    const handlePersistedLogOut = (event: StorageEvent) => {
      if (event.key === 'logout') {
        inMemoryJWT.deleteToken();
        setIsLogged(false);
      }
    };

    window.addEventListener('storage', handlePersistedLogOut);

    return () => {
      window.removeEventListener('storage', handlePersistedLogOut);
    };
  }, []);

  const value = useMemo(() => ({
    isLogged, signIn, signOut, session,
  }), [signIn, signOut, isLogged, session]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
