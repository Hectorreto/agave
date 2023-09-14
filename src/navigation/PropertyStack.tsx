import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HeaderBackButton from '../components/header-back-button/HeaderBackButton';
import HeaderOpenDrawerButton from '../components/header-open-drawer-button/HeaderOpenDrawerButton';
import PropertyGeneralInfoScreen from '../screens/property/general-info/PropertyGeneralInfoScreen';
import ListPropertyScreen from '../screens/property/list-property/ListPropertyScreen';
import PropertyPlantExitsScreen from '../screens/property/plant-exits/PropertyPlantExitsScreen';
import PropertyBoardScreen from '../screens/property/property-board/PropertyBoardScreen';
import { Colors } from '../themes/theme';

export type PropertyStackParamList = {
  ListProperties: undefined;
  PropertyBoard: undefined;
  PropertyGeneralInfo: undefined;
  PropertyPlantExits: undefined;
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
        name="PropertyBoard"
        component={PropertyBoardScreen}
        options={{ title: 'Ver predio' }}
      />
      <Stack.Screen
        name="PropertyGeneralInfo"
        component={PropertyGeneralInfoScreen}
        options={{ title: 'Ver predio' }}
      />
      <Stack.Screen
        name="PropertyPlantExits"
        component={PropertyPlantExitsScreen}
        options={{ title: 'Ver predio' }}
      />
    </Stack.Navigator>
  );
};

export default PropertyStack;
