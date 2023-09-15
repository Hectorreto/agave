import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PropertyTabs from './PropertyTabs';
import HeaderBackButton from '../components/header-back-button/HeaderBackButton';
import HeaderOpenDrawerButton from '../components/header-open-drawer-button/HeaderOpenDrawerButton';
import ListPropertyScreen from '../screens/property/list-property/ListPropertyScreen';
import { Colors } from '../themes/theme';

export type PropertyStackParamList = {
  ListProperties: undefined;
  PropertyTabs: undefined;
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
    </Stack.Navigator>
  );
};

export default PropertyStack;
