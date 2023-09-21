import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MonitoringGeneralInfoScreen from '../screens/monitoring/general-info/MonitoringGeneralInfoScreen';
import MonitoringBoardScreen from '../screens/monitoring/monitoring-board/MonitoringBoardScreen';

export type MonitoringTabsParamList = {
  MonitoringBoard: undefined;
  MonitoringGeneralInfo: undefined;
};

const Tab = createMaterialTopTabNavigator<MonitoringTabsParamList>();

const MonitoringTabs = () => {
  return (
    <Tab.Navigator tabBar={() => <></>} screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen name="MonitoringBoard" component={MonitoringBoardScreen} />
      <Tab.Screen name="MonitoringGeneralInfo" component={MonitoringGeneralInfoScreen} />
    </Tab.Navigator>
  );
};

export default MonitoringTabs;
