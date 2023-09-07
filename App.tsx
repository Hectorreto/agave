import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { NotificationProvider } from './src/contexts/notification-context/NotificationContext';
import RootStack from './src/navigation/RootStack';
import { NavigationTheme } from './src/themes/theme';

const App = () => {
  return (
    <NotificationProvider>
      <NavigationContainer theme={NavigationTheme}>
        <RootStack />
        <StatusBar style="auto" />
      </NavigationContainer>
    </NotificationProvider>
  );
};

export default App;
