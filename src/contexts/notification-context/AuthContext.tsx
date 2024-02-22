import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import { dropAllTables } from '../../../database';
import { syncApplications } from '../../services/applicationService';
import { syncMonitoring } from '../../services/monitoringService';
import { syncProperties } from '../../services/propertyService';

type AuthContextType = {
  accessToken: string;
  guid: string;
  saveAuthData: (accessToken: string, guid: string) => Promise<void>;
  removeAuthData: () => Promise<void>;
};

type Props = PropsWithChildren & {
  onLoad: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children, onLoad }: Props) => {
  const [accessToken, setAccessToken] = useState('');
  const [guid, setGuid] = useState('');

  const syncDatabase = async () => {
    try {
      await syncProperties();
      await syncApplications();
      await syncMonitoring();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const reloadAuthData = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const guid = await AsyncStorage.getItem('guid');
      setAccessToken(accessToken ?? '');
      setGuid(guid ?? '');
      await syncDatabase();
    };
    reloadAuthData().finally(onLoad);
  }, []);

  const saveAuthData = async (accessToken: string, guid: string) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('guid', guid);
      await syncDatabase();
      setAccessToken(accessToken);
      setGuid(guid);
    } catch (error) {
      console.error(error);
    }
  };

  const removeAuthData = async () => {
    try {
      setAccessToken('');
      setGuid('');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('guid');
      await dropAllTables();
    } catch (error) {
      console.error(error);
    }
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
