import React from 'react';
import { Pressable, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';

import styles, { blueStyles, lightBlueStyles, redStyles, whiteStyles } from './styles';
import { Colors, shadowStyle } from '../../themes/theme';

type Props = {
  text: string;
  onPress?: () => void;
  IconLeft?: React.FC<SvgProps>;
  color: 'blue' | 'white' | 'lightBlue' | 'red';
};

const CustomButton = ({ text, onPress, IconLeft, color }: Props) => {
  const disabled = !onPress;

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        !disabled && shadowStyle,
        IconLeft !== undefined && styles.containerWithIconLeft,
        color === 'blue' && !pressed && blueStyles.container,
        color === 'blue' && pressed && blueStyles.pressed,
        color === 'white' && !pressed && whiteStyles.container,
        color === 'white' && pressed && whiteStyles.pressed,
        color === 'lightBlue' && !pressed && lightBlueStyles.container,
        color === 'lightBlue' && pressed && lightBlueStyles.pressed,
        color === 'red' && !pressed && redStyles.container,
        color === 'red' && pressed && redStyles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={onPress}>
      {IconLeft && (disabled ? <IconLeft fill={Colors.NEUTRAL_500} /> : <IconLeft />)}

      <Text
        style={[
          styles.text,
          color === 'blue' && blueStyles.text,
          color === 'white' && whiteStyles.text,
          color === 'lightBlue' && lightBlueStyles.text,
          color === 'red' && redStyles.text,
          disabled && styles.textDisabled,
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
