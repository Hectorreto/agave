import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateMonitoringScreen from '../screens/monitoring/CreateMonitoringScreen';
import ListMonitoringScreen from '../screens/monitoring/ListMonitoringScreen';

export type MonitoringStackParamList = {
  ListMonitoring: undefined;
  CreateMonitoring: undefined;
};

const Stack = createNativeStackNavigator<MonitoringStackParamList>();

const MonitoringStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListMonitoring" component={ListMonitoringScreen} />
      <Stack.Screen name="CreateMonitoring" component={CreateMonitoringScreen} />
    </Stack.Navigator>
  );
};

export default MonitoringStack;
