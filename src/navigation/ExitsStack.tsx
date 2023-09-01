import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateExitScreen from '../screens/exits/CreateExitScreen';
import ExitsScreen from '../screens/exits/ExitsScreen';

export type ExitsStackParamList = {
  Exits: undefined;
  CreateExit: undefined;
};

const Stack = createNativeStackNavigator<ExitsStackParamList>();

const PropertiesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Exits" component={ExitsScreen} />
      <Stack.Screen name="CreateExit" component={CreateExitScreen} />
    </Stack.Navigator>
  );
};

export default PropertiesStack;
