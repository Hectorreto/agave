import { FC, PropsWithChildren, createContext, useState } from 'react';

type AuthContextType = {
  accessToken: string;
  saveAccessToken: (accessToken: string) => void;
  removeAccessToken: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  const saveAccessToken = (accessToken: string) => {
    setAccessToken(accessToken);
  };

  const removeAccessToken = () => {
    setAccessToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        saveAccessToken,
        removeAccessToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
