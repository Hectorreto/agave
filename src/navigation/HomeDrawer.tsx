import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeTabs from './HomeTabs';

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeTabs" component={HomeTabs} />
    </Drawer.Navigator>
  );
}
