import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';

import ApplicationsStack from './ApplicationsStack';
import ExitsStack from './ExitsStack';
import { HomeDrawerParamList } from './HomeDrawer';
import MonitoringStack from './MonitoringStack';
import PropertiesStack from './PropertiesStack';
import { options, screenOptions } from './utils/HomeTabsUtils';
import Applications from '../../assets/svg/tabs/applications.svg';
import Exits from '../../assets/svg/tabs/exits.svg';
import Monitoring from '../../assets/svg/tabs/monitoring.svg';
import Property from '../../assets/svg/tabs/property.svg';

export type HomeTabsParamList = {
  PropertiesStack: undefined;
  ExitsStack: undefined;
  MonitoringStack: undefined;
  ApplicationsStack: undefined;
};

type Props = DrawerScreenProps<HomeDrawerParamList, 'HomeTabs'>;

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = ({ navigation }: Props) => {
  return (
    <Tab.Navigator screenOptions={screenOptions(() => navigation.openDrawer())}>
      <Tab.Screen
        name="PropertiesStack"
        component={PropertiesStack}
        options={options('Predio', Property)}
      />
      <Tab.Screen name="ExitsStack" component={ExitsStack} options={options('Salidas', Exits)} />
      <Tab.Screen
        name="MonitoringStack"
        component={MonitoringStack}
        options={options('Monitoreo', Monitoring)}
      />
      <Tab.Screen
        name="ApplicationsStack"
        component={ApplicationsStack}
        options={options('Aplicaciones', Applications)}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
