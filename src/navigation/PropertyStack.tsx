import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PropertyTabs from './PropertyTabs';
import HeaderBackButton from '../components/header-back-button/HeaderBackButton';
import HeaderOpenDrawerButton from '../components/header-open-drawer-button/HeaderOpenDrawerButton';
import CreateExitScreen from '../screens/exits/create-exit/CreateExitScreen';
import SeeExitScreen from '../screens/exits/see-exit/SeeExitScreen';
import CreatePropertyScreen from '../screens/property/create-property/CreatePropertyScreen';
import ListPropertyScreen from '../screens/property/list-property/ListPropertyScreen';
import { Colors } from '../themes/theme';

export type PropertyStackParamList = {
  ListProperties: undefined;
  PropertyTabs: { propertyId: string };
  CreateProperty: undefined;
  CreateExit: undefined;
  SeeExit: { id: string };
};

const Stack = createNativeStackNavigator<PropertyStackParamList>();

const PropertyStack = () => {
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
        name="ListProperties"
        component={ListPropertyScreen}
        options={{
          title: 'Predio',
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
        name="PropertyTabs"
        component={PropertyTabs}
        options={{ title: 'Ver predio' }}
      />
      <Stack.Screen
        name="CreateProperty"
        component={CreatePropertyScreen}
        options={{ title: 'Nuevo predio' }}
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

export default PropertyStack;
