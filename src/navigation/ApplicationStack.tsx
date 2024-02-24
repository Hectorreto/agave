import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ApplicationFormStack from './ApplicationFormStack';
import HeaderBackButton from '../components/header-back-button/HeaderBackButton';
import HeaderOpenDrawerButton from '../components/header-open-drawer-button/HeaderOpenDrawerButton';
import FinaliceApplication1Screen from '../screens/applications/finalice-application/FinaliceApplication1Screen';
import FinaliceApplication2Screen from '../screens/applications/finalice-application/FinaliceApplication2Screen';
import ListApplicationScreen from '../screens/applications/list-application/ListApplicationScreen';
import { Application, Product } from '../services/applicationService';
import { Colors } from '../themes/theme';

export type ApplicationStackParamList = {
  ApplicationFormStack: { application: Partial<Application> } | undefined;
  ListApplications: undefined;
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
        name="ApplicationFormStack"
        component={ApplicationFormStack}
        options={({ route }) => {
          return {
            title: route.params?.application.id ? 'Ver aplicación' : 'Nueva aplicación',
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default ApplicationStack;
