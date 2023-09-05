import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateApplicationScreen from '../screens/applications/CreateApplicationScreen';
import ListApplicationScreen from '../screens/applications/ListApplicationScreen';

export type ApplicationStackParamList = {
  ListApplications: undefined;
  CreateApplication: undefined;
};

const Stack = createNativeStackNavigator<ApplicationStackParamList>();

const ApplicationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListApplications" component={ListApplicationScreen} />
      <Stack.Screen name="CreateApplication" component={CreateApplicationScreen} />
    </Stack.Navigator>
  );
};

export default ApplicationStack;
