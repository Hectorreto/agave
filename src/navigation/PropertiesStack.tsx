import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateExitScreen from '../screens/exits/create-exit/CreateExitScreen';
import ListPropertiesScreen from '../screens/property/ListPropertiesScreen';
import PropertyDetailsScreens from '../screens/property/PropertyDetailsScreen';

export type PropertiesStackParamList = {
  ListProperties: undefined;
  PropertyDetails: undefined;
  CreateExit: undefined;
};

const Stack = createNativeStackNavigator<PropertiesStackParamList>();

const PropertiesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListProperties" component={ListPropertiesScreen} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreens} />
      <Stack.Screen name="CreateExit" component={CreateExitScreen} />
    </Stack.Navigator>
  );
};

export default PropertiesStack;
