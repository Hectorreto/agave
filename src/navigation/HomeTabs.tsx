import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { JSX } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import Applications from '../../assets/svg/tabs/applications.svg';
import Exits from '../../assets/svg/tabs/exits.svg';
import Monitoring from '../../assets/svg/tabs/monitoring.svg';
import Property from '../../assets/svg/tabs/property.svg';
import ApplicationsScreen from '../screens/home/ApplicationsScreen';
import ExitsScreen from '../screens/home/ExitsScreen';
import MonitoringScreen from '../screens/home/MonitoringScreen';
import PropertyScreen from '../screens/home/PropertyScreen';
import { colors } from '../themes/theme';

export type RootStackParamList = {
  Property: undefined;
  Exits: undefined;
  Monitoring: undefined;
  Applications: undefined;
};

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
        },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          color: colors.primary700,
        },
      }}>
      <Tab.Screen
        name="Property"
        component={PropertyScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconFocused : styles.iconDefault}>
              <Property fill={focused ? colors.neutral : colors.primary700} />
            </View>
          ),
          tabBarLabel: 'Predio',
        }}
      />
      <Tab.Screen
        name="Exits"
        component={ExitsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconFocused : styles.iconDefault}>
              <Exits fill={focused ? colors.neutral : colors.primary700} />
            </View>
          ),
          tabBarLabel: 'Salidas',
        }}
      />
      <Tab.Screen
        name="Monitoring"
        component={MonitoringScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconFocused : styles.iconDefault}>
              <Monitoring fill={focused ? colors.neutral : colors.primary700} />
            </View>
          ),
          tabBarLabel: 'Monitoreo',
        }}
      />
      <Tab.Screen
        name="Applications"
        component={ApplicationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconFocused : styles.iconDefault}>
              <Applications fill={focused ? colors.neutral : colors.primary700} />
            </View>
          ),
          tabBarLabel: 'Aplicaciones',
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
