import React from 'react';
import { Pressable, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';

import styles from './styles';
import { colors } from '../../themes/theme';

type Props = {
  label: string;
  Icon: React.FC<SvgProps>;
  onPress: () => void;
};

const Item = ({ Icon, label, onPress }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? colors.primary100 : colors.neutral,
        },
        styles.itemContainer,
      ]}
      onPress={onPress}>
      <Icon />
      <Text style={styles.itemText}>{label}</Text>
    </Pressable>
  );
};

export default Item;
