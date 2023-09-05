import React, { FC } from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import styles from './styles';
import { colors } from '../../themes/theme';

type Props = {
  focused: boolean;
  Icon: FC<SvgProps>;
};

const TabBarIcon = ({ focused, Icon }: Props) => {
  return (
    <View style={focused ? styles.iconFocused : styles.iconDefault}>
      <Icon fill={focused ? colors.neutral : colors.primary700} />
    </View>
  );
};

export default TabBarIcon;
