import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PropertyStackParamList } from './PropertyStack';
import useProperties from '../hooks/useProperties';
import PropertyGeneralInfoScreen from '../screens/property/general-info/PropertyGeneralInfoScreen';
import PropertyPlantExitsScreen from '../screens/property/plant-exits/PropertyPlantExitsScreen';
import PropertyBoardScreen from '../screens/property/property-board/PropertyBoardScreen';
import { Property } from '../services/propertyService';

export type PropertyTabsParamList = {
  PropertyBoard: { property: Property };
  PropertyGeneralInfo: { property: Property };
  PropertyPlantExits: { property: Property };
};

const Tab = createMaterialTopTabNavigator<PropertyTabsParamList>();

type Props = NativeStackScreenProps<PropertyStackParamList, 'PropertyTabs'>;

const PropertyTabs = ({ route }: Props) => {
  const { propertyId } = route.params;
  const { data } = useProperties({ id: propertyId });
  const property = data[0];
  if (!property) return;

  return (
    <Tab.Navigator tabBar={() => <></>} screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen
        name="PropertyBoard"
        component={PropertyBoardScreen}
        initialParams={{ property }}
      />
      <Tab.Screen
        name="PropertyGeneralInfo"
        component={PropertyGeneralInfoScreen}
        initialParams={{ property }}
      />
      <Tab.Screen
        name="PropertyPlantExits"
        component={PropertyPlantExitsScreen}
        initialParams={{ property }}
      />
    </Tab.Navigator>
  );
};

export default PropertyTabs;
