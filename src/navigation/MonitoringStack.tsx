import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import MonitoringTabs from './MonitoringTabs';
import HeaderBackButton from '../components/header-back-button/HeaderBackButton';
import HeaderOpenDrawerButton from '../components/header-open-drawer-button/HeaderOpenDrawerButton';
import CreateMonitoringScreen from '../screens/monitoring/create-monitoring/CreateMonitoringScreen';
import ListMonitoringScreen from '../screens/monitoring/list-monitoring/ListMonitoringScreen';
import { Colors } from '../themes/theme';

export type MonitoringStackParamList = {
  ListMonitoring: undefined;
  CreateMonitoring: undefined;
  SeeMonitoring: { monitoringId: string };
};

const Stack = createNativeStackNavigator<MonitoringStackParamList>();

const MonitoringStack = () => {
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
        name="ListMonitoring"
        component={ListMonitoringScreen}
        options={{
          title: 'Monitoreo',
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
        name="CreateMonitoring"
        component={CreateMonitoringScreen}
        options={{ title: 'Nuevo monitoreo' }}
      />
      <Stack.Screen
        name="SeeMonitoring"
        component={MonitoringTabs}
        options={{ title: 'Ver monitoreo' }}
      />
    </Stack.Navigator>
  );
};

export default MonitoringStack;
