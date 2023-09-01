import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

import styles from './styles';

interface Props {
  label: string;
  Icon: React.FC<SvgProps>;
  onPress: () => void;
}

const Item = ({ Icon, label, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Icon />
      <Text style={styles.itemText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Item;
