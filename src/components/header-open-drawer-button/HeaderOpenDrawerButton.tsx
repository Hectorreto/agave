import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Menu from '../../../assets/svg/header/menu.svg';

const HeaderOpenDrawerButton = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  return (
    <TouchableOpacity onPressOut={() => navigation.openDrawer()}>
      <Menu />
    </TouchableOpacity>
  );
};

export default HeaderOpenDrawerButton;
