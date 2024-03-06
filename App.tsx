import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

import { AuthProvider } from './src/contexts/notification-context/AuthContext';
import { NotificationProvider } from './src/contexts/notification-context/NotificationContext';
import useFetchUpdate from './src/hooks/useFetchUpdate';
import RootStack from './src/navigation/RootStack';
import { NavigationTheme } from './src/themes/theme';

SplashScreen.preventAutoHideAsync().catch(console.error);

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const { loading: loadingUpdate } = useFetchUpdate();
  if (loadingUpdate) return;

  return (
    <NotificationProvider>
      <AuthProvider onLoad={() => setAppIsReady(true)}>
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
