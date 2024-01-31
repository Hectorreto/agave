import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider } from './src/contexts/notification-context/AuthContext';
import { NotificationProvider } from './src/contexts/notification-context/NotificationContext';
import RootStack from './src/navigation/RootStack';
import { NavigationTheme } from './src/themes/theme';

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <NavigationContainer theme={NavigationTheme}>
          <RootStack />
          <StatusBar style="auto" />
        </NavigationContainer>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
