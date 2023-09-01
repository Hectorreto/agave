import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeTabs from './HomeTabs';
import CustomDrawerContent from '../components/custom-drawer-content/CustomDrawerContent';

export type HomeDrawerParamList = {
  HomeTabs: undefined;
};

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeTabs" component={HomeTabs} />
    </Drawer.Navigator>
  );
}
