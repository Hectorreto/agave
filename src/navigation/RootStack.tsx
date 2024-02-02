import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import HomeDrawer from './HomeDrawer';
import { AuthContext } from '../contexts/notification-context/AuthContext';
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
  const { accessToken } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {accessToken ? (
        <Stack.Group>
          <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
          <Stack.Screen name="ChangePass" component={ChangePassScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="RecoverPass" component={RecoverPassScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
