import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateMonitoringScreen from '../screens/monitoring/CreateMonitoringScreen';
import MonitoringScreen from '../screens/monitoring/MonitoringScreen';

export type MonitoringStackParamList = {
  Monitoring: undefined;
  CreateMonitoring: undefined;
};

const Stack = createNativeStackNavigator<MonitoringStackParamList>();

const MonitoringStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Monitoring" component={MonitoringScreen} />
      <Stack.Screen name="CreateMonitoring" component={CreateMonitoringScreen} />
    </Stack.Navigator>
  );
};

export default MonitoringStack;
