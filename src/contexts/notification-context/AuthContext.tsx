import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

type AuthContextType = {
  accessToken: string;
  guid: string;
  saveAuthData: (accessToken: string, guid: string) => void;
  removeAuthData: () => void;
};

type Props = PropsWithChildren & {
  onLoad: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children, onLoad }: Props) => {
  const [accessToken, setAccessToken] = useState('');
  const [guid, setGuid] = useState('');

  useEffect(() => {
    const reloadAuthData = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const guid = await AsyncStorage.getItem('guid');
      setAccessToken(accessToken ?? '');
      setGuid(guid ?? '');
    };
    reloadAuthData().finally(onLoad);
  }, []);

  const saveAuthData = (accessToken: string, guid: string) => {
    setAccessToken(accessToken);
    setGuid(guid);
    AsyncStorage.setItem('accessToken', accessToken).catch(console.error);
    AsyncStorage.setItem('guid', guid).catch(console.error);
  };

  const removeAuthData = () => {
    setAccessToken('');
    setGuid('');
    AsyncStorage.removeItem('accessToken').catch(console.error);
    AsyncStorage.removeItem('guid').catch(console.error);
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
