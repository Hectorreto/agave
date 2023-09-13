import React from 'react';
import { Pressable, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';

import styles from './styles';
import { Colors } from '../../themes/theme';

type Props = {
  label: string;
  Icon: React.FC<SvgProps>;
  onPress: () => void;
};

const DrawerItem = ({ Icon, label, onPress }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.PRIMARY_100 : Colors.NEUTRAL_50,
        },
        styles.itemContainer,
      ]}
      onPress={onPress}>
      <Icon />
      <Text style={styles.itemText}>{label}</Text>
    </Pressable>
  );
};

export default DrawerItem;
