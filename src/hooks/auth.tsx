import React, { createContext, useCallback, useContext, useState } from "react";
import jwtDecode from "jwt-decode";

import api from "../services/api";

interface SignInCredentials {
  email: string;
  password: string;
}
interface User {
  name: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@WEBEditor:token");
    const user = localStorage.getItem("@WEBEditor:user");

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
    const response = await api.post("/Session", { email: e, password });

    const { token } = response.data;

    localStorage.setItem("@WEBEditor:token", token);
    const decodedToken = jwtDecode(token);
    const { name } = decodedToken as { name: string };

    const user: User = {
      name,
    };

    localStorage.setItem("@WEBEditor:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@WEBEditor:token");
    localStorage.removeItem("@WEBEditor:user");

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });
      localStorage.setItem("@WEBEditor:user", JSON.stringify(user));
    },
    [data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
