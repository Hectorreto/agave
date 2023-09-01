import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeTabs from './HomeTabs';

export type HomeDrawerParamList = {
  HomeTabs: undefined;
};

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="HomeTabs" component={HomeTabs} />
    </Drawer.Navigator>
  );
}
