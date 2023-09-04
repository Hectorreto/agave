import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import Menu from '../../../assets/svg/header/menu.svg';
import { colors } from '../../themes/theme';
import styles from '../styles';

export const screenOptions = (onPressHeader: () => void): BottomTabNavigationOptions => {
  return {
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
      <TouchableOpacity style={styles.drawerIcon} onPressOut={onPressHeader}>
        <Menu />
      </TouchableOpacity>
    ),
    headerTitleAlign: 'center',
  };
};

export const options = (label: string, Icon: React.FC<SvgProps>): BottomTabNavigationOptions => {
  return {
    tabBarIcon: ({ focused }) => (
      <View style={focused ? styles.iconFocused : styles.iconDefault}>
        <Icon fill={focused ? colors.neutral : colors.primary700} />
      </View>
    ),
    title: label,
    tabBarLabel: label,
  };
};
