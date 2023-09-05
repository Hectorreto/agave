import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateExitScreen from '../screens/exits/create-exit/CreateExitScreen';
import ListPropertyScreen from '../screens/property/ListPropertyScreen';
import PropertyDetailsScreens from '../screens/property/PropertyDetailsScreen';

export type PropertyStackParamList = {
  ListProperties: undefined;
  PropertyDetails: undefined;
  CreateExit: undefined;
};

const Stack = createNativeStackNavigator<PropertyStackParamList>();

const PropertyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListProperties" component={ListPropertyScreen} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreens} />
      <Stack.Screen name="CreateExit" component={CreateExitScreen} />
    </Stack.Navigator>
  );
};

export default PropertyStack;
