import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MonitoringStackParamList } from './MonitoringStack';
import useMonitoring from '../hooks/useMonitoring';
import MonitoringGeneralInfoScreen from '../screens/monitoring/general-info/MonitoringGeneralInfoScreen';
import MonitoringBoardScreen from '../screens/monitoring/monitoring-board/MonitoringBoardScreen';
import { Monitoring } from '../services/monitoringService';

export type MonitoringTabsParamList = {
  MonitoringBoard: undefined;
  MonitoringGeneralInfo: { monitoring: Monitoring };
};

const Tab = createMaterialTopTabNavigator<MonitoringTabsParamList>();

type Props = NativeStackScreenProps<MonitoringStackParamList, 'SeeMonitoring'>;

const MonitoringTabs = ({ route }: Props) => {
  const { monitoringId } = route.params;
  const { data } = useMonitoring({ id: monitoringId });
  const monitoring = data[0];
  if (!monitoring) return;

  return (
    <Tab.Navigator tabBar={() => <></>} screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen name="MonitoringBoard" component={MonitoringBoardScreen} />
      <Tab.Screen
        name="MonitoringGeneralInfo"
        component={MonitoringGeneralInfoScreen}
        initialParams={{ monitoring }}
      />
    </Tab.Navigator>
  );
};

export default MonitoringTabs;
