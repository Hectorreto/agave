import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { TouchableOpacity, View } from 'react-native';

import ApplicationsStack from './ApplicationsStack';
import ExitsStack from './ExitsStack';
import { HomeDrawerParamList } from './HomeDrawer';
import MonitoringStack from './MonitoringStack';
import PropertiesStack from './PropertiesStack';
import styles from './styles';
import Menu from '../../assets/svg/header/menu.svg';
import Applications from '../../assets/svg/tabs/applications.svg';
import Exits from '../../assets/svg/tabs/exits.svg';
import Monitoring from '../../assets/svg/tabs/monitoring.svg';
import Property from '../../assets/svg/tabs/property.svg';
import { colors } from '../themes/theme';

export type HomeTabsParamList = {
  PropertiesStack: undefined;
  ExitsStack: undefined;
  MonitoringStack: undefined;
  ApplicationsStack: undefined;
};

type Props = DrawerScreenProps<HomeDrawerParamList, 'HomeTabs'>;

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = ({ navigation }: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
        },
        tabBarItemStyle: {
          marginTop: 5,
        },
        tabBarLabelStyle: {
          color: colors.primary700,
          marginBottom: 15,
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: '700',
          color: colors.primary700,
        },
        headerShadowVisible: true,
        headerLeft: () => (
          <TouchableOpacity style={styles.drawerIcon} onPressOut={() => navigation.openDrawer()}>
            <Menu />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        name="PropertiesStack"
        component={PropertiesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconFocused : styles.iconDefault}>
              <Property fill={focused ? colors.neutral : colors.primary700} />
            </View>
          ),
          title: 'Predio',
          tabBarLabel: 'Predio',
        }}
      />
      <Tab.Screen
        name="ExitsStack"
        component={ExitsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconFocused : styles.iconDefault}>
              <Exits fill={focused ? colors.neutral : colors.primary700} />
            </View>
          ),
          title: 'Salidas',
          tabBarLabel: 'Salidas',
        }}
      />
      <Tab.Screen
        name="MonitoringStack"
        component={MonitoringStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconFocused : styles.iconDefault}>
              <Monitoring fill={focused ? colors.neutral : colors.primary700} />
            </View>
          ),
          title: 'Monitoreo',
          tabBarLabel: 'Monitoreo',
        }}
      />
      <Tab.Screen
        name="ApplicationsStack"
        component={ApplicationsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconFocused : styles.iconDefault}>
              <Applications fill={focused ? colors.neutral : colors.primary700} />
            </View>
          ),
          title: 'Aplicaciones',
          tabBarLabel: 'Aplicaciones',
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
