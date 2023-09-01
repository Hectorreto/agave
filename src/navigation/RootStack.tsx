import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeDrawer from './HomeDrawer';
import ChangePassScreen from '../screens/login/ChangePassScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RecoverPassScreen from '../screens/login/RecoverPassScreen';

export type RootStackParamList = {
  HomeDrawer: undefined;
  Login: undefined;
  RecoverPass: undefined;
  ChangePass: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RecoverPass" component={RecoverPassScreen} />
        <Stack.Screen name="ChangePass" component={ChangePassScreen} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStack;
