import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import PropertyGeneralInfoScreen from '../screens/property/general-info/PropertyGeneralInfoScreen';
import PropertyPlantExitsScreen from '../screens/property/plant-exits/PropertyPlantExitsScreen';
import PropertyBoardScreen from '../screens/property/property-board/PropertyBoardScreen';

export type PropertyTabsParamList = {
  PropertyBoard: undefined;
  PropertyGeneralInfo: undefined;
  PropertyPlantExits: undefined;
};

const Tab = createMaterialTopTabNavigator<PropertyTabsParamList>();

const PropertyTabs = () => {
  return (
    <Tab.Navigator tabBar={() => <></>} screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen name="PropertyBoard" component={PropertyBoardScreen} />
      <Tab.Screen name="PropertyGeneralInfo" component={PropertyGeneralInfoScreen} />
      <Tab.Screen name="PropertyPlantExits" component={PropertyPlantExitsScreen} />
    </Tab.Navigator>
  );
};

export default PropertyTabs;
