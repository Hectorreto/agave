import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ApplicationsScreen from '../screens/applications/ApplicationsScreen';
import CreateApplicationScreen from '../screens/applications/CreateApplicationScreen';

export type ApplicationsStackParamList = {
  Applications: undefined;
  CreateApplication: undefined;
};

const Stack = createNativeStackNavigator<ApplicationsStackParamList>();

const ApplicationsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Applications" component={ApplicationsScreen} />
      <Stack.Screen name="CreateApplication" component={CreateApplicationScreen} />
    </Stack.Navigator>
  );
};

export default ApplicationsStack;
