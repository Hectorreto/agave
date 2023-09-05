import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HeaderBackButton from '../components/header-back-button/HeaderBackButton';
import HeaderOpenDrawerButton from '../components/header-open-drawer-button/HeaderOpenDrawerButton';
import CreateExitScreen from '../screens/exits/CreateExitScreen';
import ExitsScreen from '../screens/exits/ExitsScreen';
import SeeExitScreen from '../screens/exits/SeeExitScreen';
import { colors } from '../themes/theme';

export type ExitsStackParamList = {
  Exits: undefined;
  CreateExit: undefined;
  SeeExit: undefined;
};

const Stack = createNativeStackNavigator<ExitsStackParamList>();

const ExitsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: colors.primary700,
        },
        headerLeft: () => <HeaderBackButton />,
      }}>
      <Stack.Screen
        name="Exits"
        component={ExitsScreen}
        options={{
          title: 'Salidas',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '700',
            color: colors.primary700,
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

export default ExitsStack;
