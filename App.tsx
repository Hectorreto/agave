import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import RootStack from './src/navigation/RootStack';
import { NavigationTheme } from './src/themes/theme';

const App = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <RootStack />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
