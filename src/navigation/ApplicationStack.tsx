import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HeaderBackButton from '../components/header-back-button/HeaderBackButton';
import HeaderOpenDrawerButton from '../components/header-open-drawer-button/HeaderOpenDrawerButton';
import CreateApplication1Screen from '../screens/applications/create-application/CreateApplication1Screen';
import CreateApplication2Screen from '../screens/applications/create-application/CreateApplication2Screen';
import CreateApplication3Screen from '../screens/applications/create-application/CreateApplication3Screen';
import CreateApplication4Screen from '../screens/applications/create-application/CreateApplication4Screen';
import FinaliceApplication1Screen from '../screens/applications/finalice-application/FinaliceApplication1Screen';
import FinaliceApplication2Screen from '../screens/applications/finalice-application/FinaliceApplication2Screen';
import ListApplicationScreen from '../screens/applications/list-application/ListApplicationScreen';
import { Application } from '../services/applicationService';
import { Product } from '../services/productService';
import { Colors } from '../themes/theme';

export type ApplicationStackParamList = {
  ListApplications: undefined;
  CreateApplication1: undefined;
  CreateApplication2: { application: Application };
  CreateApplication3: { application: Application; products: Product[] };
  CreateApplication4: { application: Application; products: Product[] };
  FinaliceApplication1: { applicationId: string };
  FinaliceApplication2: { applicationId: string; products: Product[] };
};

const Stack = createNativeStackNavigator<ApplicationStackParamList>();

const ApplicationStack = () => {
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
        name="ListApplications"
        component={ListApplicationScreen}
        options={{
          title: 'Aplicaciones',
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
        name="FinaliceApplication1"
        component={FinaliceApplication1Screen}
        options={{
          title: 'Finalizar aplicación',
        }}
      />
      <Stack.Screen
        name="FinaliceApplication2"
        component={FinaliceApplication2Screen}
        options={{
          title: 'Finalizar aplicación',
        }}
      />
      <Stack.Screen
        name="CreateApplication1"
        component={CreateApplication1Screen}
        options={{
          title: 'Nueva aplicación',
        }}
      />
      <Stack.Screen
        name="CreateApplication2"
        component={CreateApplication2Screen}
        options={{
          title: 'Nueva aplicación',
        }}
      />
      <Stack.Screen
        name="CreateApplication3"
        component={CreateApplication3Screen}
        options={{
          title: 'Nueva aplicación',
        }}
      />
      <Stack.Screen
        name="CreateApplication4"
        component={CreateApplication4Screen}
        options={{
          title: 'Nueva aplicación',
        }}
      />
    </Stack.Navigator>
  );
};

export default ApplicationStack;
