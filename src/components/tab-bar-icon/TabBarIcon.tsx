import React, { FC } from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import styles from './styles';
import { Colors } from '../../themes/theme';

type Props = {
  focused: boolean;
  Icon: FC<SvgProps>;
};

const TabBarIcon = ({ focused, Icon }: Props) => {
  return (
    <View style={focused ? styles.iconFocused : styles.iconDefault}>
      <Icon fill={focused ? Colors.NEUTRAL_50 : Colors.PRIMARY_700} />
    </View>
  );
};

export default TabBarIcon;
