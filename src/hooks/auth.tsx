import React, { createContext, useCallback, useContext, useState } from 'react';
import jwtDecode from 'jwt-decode';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}
interface User {
  name: string;
  avatar: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  hasRole(role: string): boolean;
  hasOneRole(roles: string[]): boolean;
  updateUser(user: User): void;
}

interface AuthState {
  token: string;
  user: User;
}

const LS_TOKEN = '@WEBEditor:token';
const LS_USER = '@WEBEditor:user';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(LS_TOKEN);
    const user = localStorage.getItem(LS_USER);

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email: e, password }) => {
    const response = await api.post('/Session', { email: e, password });

    const { token } = response.data;

    localStorage.setItem(LS_TOKEN, token);
    const decodedToken = jwtDecode(token);
    const { name, avatar } = decodedToken as User;

    const user: User = {
      name,
      avatar,
    };

    localStorage.setItem(LS_USER, JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_USER);

    setData({} as AuthState);
  }, []);

  const hasRole = useCallback(
    (role: string) => {
      if (!role) return false;

      const decodedToken = jwtDecode(data.token);
      const { roles } = decodedToken as { roles: string[] };
      if (!roles) return false;

      return roles.includes(role);
    },
    [data.token],
  );

  const hasOneRole = useCallback(
    (roles: string[]) => {
      if (!roles) return false;

      let result = false;

      roles.forEach(role => {
        if (hasRole(role)) {
          result = true;
        }
      });

      return result;
    },
    [hasRole],
  );

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });
      localStorage.setItem(LS_USER, JSON.stringify(user));
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updateUser,
        hasRole,
        hasOneRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
