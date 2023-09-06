import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HeaderBackButton from '../components/header-back-button/HeaderBackButton';
import HeaderOpenDrawerButton from '../components/header-open-drawer-button/HeaderOpenDrawerButton';
import CreateExitScreen from '../screens/exits/create-exit/CreateExitScreen';
import ListExitScreen from '../screens/exits/list-exits/ListExitScreen';
import SeeExitScreen from '../screens/exits/see-exit/SeeExitScreen';
import { Colors } from '../themes/theme';

export type ExitStackParamList = {
  ListExits: undefined;
  CreateExit: undefined;
  SeeExit: undefined;
};

const Stack = createNativeStackNavigator<ExitStackParamList>();

const ExitStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: Colors.PRIMARY_700,
        },
        headerLeft: () => <HeaderBackButton />,
      }}>
      <Stack.Screen
        name="ListExits"
        component={ListExitScreen}
        options={{
          title: 'Salidas',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '700',
            color: Colors.PRIMARY_700,
          },
          headerLeft: () => <HeaderOpenDrawerButton />,
        }}
      />
      <Stack.Screen
        name="CreateExit"
        component={CreateExitScreen}
        options={{
          title: 'Nueva salida',
        }}
      />
      <Stack.Screen
        name="SeeExit"
        component={SeeExitScreen}
        options={{
          title: 'Ver salida',
        }}
      />
    </Stack.Navigator>
  );
};

export default ExitStack;
