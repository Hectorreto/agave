import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ApplicationsStack from './ApplicationsStack';
import ExitsStack from './ExitsStack';
import MonitoringStack from './MonitoringStack';
import PropertiesStack from './PropertiesStack';
import Applications from '../../assets/svg/tabs/applications.svg';
import Exits from '../../assets/svg/tabs/exits.svg';
import Monitoring from '../../assets/svg/tabs/monitoring.svg';
import Property from '../../assets/svg/tabs/property.svg';
import TabBarIcon from '../components/tab-bar-icon/TabBarIcon';
import { colors } from '../themes/theme';

export type HomeTabsParamList = {
  PropertiesStack: undefined;
  ExitsStack: undefined;
  MonitoringStack: undefined;
  ApplicationsStack: undefined;
};

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 80 },
        tabBarItemStyle: { marginTop: 5 },
        tabBarLabelStyle: { marginBottom: 15, color: colors.primary700 },
      }}>
      <Tab.Screen
        name="PropertiesStack"
        component={PropertiesStack}
        options={{
          tabBarLabel: 'Predio',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Icon={Property} />,
        }}
      />
      <Tab.Screen
        name="ExitsStack"
        component={ExitsStack}
        options={{
          tabBarLabel: 'Salidas',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Icon={Exits} />,
        }}
      />
      <Tab.Screen
        name="MonitoringStack"
        component={MonitoringStack}
        options={{
          tabBarLabel: 'Monitoreo',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Icon={Monitoring} />,
        }}
      />
      <Tab.Screen
        name="ApplicationsStack"
        component={ApplicationsStack}
        options={{
          tabBarLabel: 'Aplicaciones',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Icon={Applications} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
