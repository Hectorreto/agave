import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';
import ChangePassScreen from '../screens/login/ChangePassScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RecoverPassScreen from '../screens/login/RecoverPassScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  RecoverPass: undefined;
  ChangePass: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const loggedIn = false;

  if (loggedIn) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RecoverPass" component={RecoverPassScreen} />
        <Stack.Screen name="ChangePass" component={ChangePassScreen} />
      </Stack.Navigator>
    );
  }
};

export default RootStack;
