import React from 'react';
import { Pressable, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';

import styles, {
  blueStyles,
  blueWhiteStyles,
  lightBlueStyles,
  redStyles,
  redWhiteStyles,
  whiteStyles,
} from './styles';
import { Colors, shadowStyle } from '../../themes/theme';

type Props = {
  text?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  Icon?: React.FC<SvgProps>;
  color: 'blue' | 'white' | 'lightBlue' | 'red' | 'redWhite' | 'blueWhite';
  small?: boolean;
};

const allStyles = {
  blue: blueStyles,
  blueWhite: blueWhiteStyles,
  white: whiteStyles,
  lightBlue: lightBlueStyles,
  red: redStyles,
  redWhite: redWhiteStyles,
};

const iconColors = {
  blue: { normal: Colors.NEUTRAL, pressed: Colors.NEUTRAL },
  blueWhite: { normal: Colors.NEUTRAL, pressed: Colors.NEUTRAL },
  white: { normal: Colors.PRIMARY, pressed: Colors.PRIMARY },
  lightBlue: { normal: Colors.PRIMARY, pressed: Colors.PRIMARY },
  red: { normal: Colors.NEUTRAL, pressed: Colors.NEUTRAL },
  redWhite: { normal: Colors.ALERT_RED, pressed: Colors.NEUTRAL },
};

const CustomButton = ({ text, onPress, Icon, color, onLongPress, small }: Props) => {
  const disabled = !onPress;
  const colorStyles = allStyles[color];

  const IconWithColor = ({ pressed }: any) => {
    if (!Icon) return;
    if (disabled) {
      return <Icon fill={Colors.NEUTRAL_500} />;
    }
    const iconColor = iconColors[color].normal;
    const iconColorPressed = iconColors[color].pressed;
    return <Icon fill={pressed ? iconColorPressed : iconColor} />;
  };

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        !disabled && shadowStyle,
        Boolean(text) && styles.containerWithText,
        Boolean(text) && Icon !== undefined && styles.containerWithIcon,
        !text && Icon !== undefined && styles.containerOnlyIcon,
        !pressed && colorStyles.container,
        pressed && colorStyles.pressed,
        disabled && styles.disabled,
        disabled && !text && Icon && styles.disabledOnlyIcon,
        small && styles.containerSmall,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}>
      {({ pressed }) => (
        <>
          <IconWithColor pressed={pressed} />

          {Boolean(text) && (
            <Text
              style={[
                styles.text,
                colorStyles.text,
                disabled && styles.textDisabled,
                small && styles.textSmall,
              ]}>
              {text}
            </Text>
          )}
        </>
      )}
    </Pressable>
  );
};

export default CustomButton;
