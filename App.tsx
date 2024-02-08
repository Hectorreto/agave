import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

import { AuthProvider } from './src/contexts/notification-context/AuthContext';
import { NotificationProvider } from './src/contexts/notification-context/NotificationContext';
import RootStack from './src/navigation/RootStack';
import { pullProperties } from './src/services/propertyService';
import { NavigationTheme } from './src/themes/theme';

SplashScreen.preventAutoHideAsync().catch(console.error);

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const onLoad = async () => {
    try {
      await pullProperties();
    } catch (error) {
      console.error(error);
    } finally {
      setAppIsReady(true);
    }
  };

  return (
    <NotificationProvider>
      <AuthProvider onLoad={onLoad}>
        {appIsReady && (
          <View style={{ flex: 1 }} onLayout={() => SplashScreen.hideAsync()}>
            <NavigationContainer theme={NavigationTheme}>
              <RootStack />
              <StatusBar style="auto" />
            </NavigationContainer>
          </View>
        )}
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
