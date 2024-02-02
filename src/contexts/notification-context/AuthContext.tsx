import { FC, PropsWithChildren, createContext, useState } from 'react';

type AuthContextType = {
  accessToken: string;
  guid: string;
  saveAuthData: (accessToken: string, guid: string) => void;
  removeAuthData: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [guid, setGuid] = useState('');

  const saveAuthData = (accessToken: string, guid: string) => {
    setAccessToken(accessToken);
    setGuid(guid);
  };

  const removeAuthData = () => {
    setAccessToken('');
    setGuid('');
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        guid,
        saveAuthData,
        removeAuthData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
