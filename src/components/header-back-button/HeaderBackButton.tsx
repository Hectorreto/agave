import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import styles from './styles';
import ArrowBack from '../../../assets/svg/header/arrow_back_ios.svg';

const HeaderBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.container}>
      <ArrowBack />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
