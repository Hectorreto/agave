import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeTabs from './HomeTabs';
import DrawerContent from '../components/drawer-content/DrawerContent';

export type HomeDrawerParamList = {
  HomeTabs: undefined;
};

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={({ navigation }) => <DrawerContent navigation={navigation} />}
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeTabs" component={HomeTabs} />
    </Drawer.Navigator>
  );
}
