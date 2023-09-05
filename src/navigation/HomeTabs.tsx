import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ApplicationStack from './ApplicationStack';
import ExitStack from './ExitStack';
import MonitoringStack from './MonitoringStack';
import PropertyStack from './PropertyStack';
import Applications from '../../assets/svg/tabs/applications.svg';
import Exits from '../../assets/svg/tabs/exits.svg';
import Monitoring from '../../assets/svg/tabs/monitoring.svg';
import Property from '../../assets/svg/tabs/property.svg';
import TabBarIcon from '../components/tab-bar-icon/TabBarIcon';
import { Colors } from '../themes/theme';

export type HomeTabsParamList = {
  PropertyStack: undefined;
  ExitStack: undefined;
  MonitoringStack: undefined;
  ApplicationStack: undefined;
};

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 80 },
        tabBarItemStyle: { height: 80 },
        tabBarLabelStyle: {
          marginBottom: 16,
          color: Colors.PRIMARY_700,
        },
      }}>
      <Tab.Screen
        name="PropertyStack"
        component={PropertyStack}
        options={{
          tabBarLabel: 'Predio',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Icon={Property} />,
        }}
      />
      <Tab.Screen
        name="ExitStack"
        component={ExitStack}
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
        name="ApplicationStack"
        component={ApplicationStack}
        options={{
          tabBarLabel: 'Aplicaciones',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Icon={Applications} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
