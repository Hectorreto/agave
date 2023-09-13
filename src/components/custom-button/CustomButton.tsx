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
  Icon?: React.FC<SvgProps>;
  color: 'blue' | 'white' | 'lightBlue' | 'red' | 'redWhite' | 'blueWhite';
};

const CustomButton = ({ text, onPress, Icon, color }: Props) => {
  const disabled = !onPress;

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        !disabled && shadowStyle,
        Boolean(text) && styles.containerWithText,
        Boolean(text) && Icon !== undefined && styles.containerWithIcon,
        !text && Icon !== undefined && styles.containerOnlyIcon,
        color === 'blue' && !pressed && blueStyles.container,
        color === 'blue' && pressed && blueStyles.pressed,
        color === 'blueWhite' && !pressed && blueWhiteStyles.container,
        color === 'blueWhite' && pressed && blueWhiteStyles.pressed,
        color === 'white' && !pressed && whiteStyles.container,
        color === 'white' && pressed && whiteStyles.pressed,
        color === 'lightBlue' && !pressed && lightBlueStyles.container,
        color === 'lightBlue' && pressed && lightBlueStyles.pressed,
        color === 'red' && !pressed && redStyles.container,
        color === 'red' && pressed && redStyles.pressed,
        color === 'redWhite' && !pressed && redWhiteStyles.container,
        color === 'redWhite' && pressed && redWhiteStyles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={onPress}>
      {({ pressed }) => (
        <>
          {Icon &&
            (disabled ? (
              <Icon fill={Colors.NEUTRAL_500} />
            ) : color === 'blue' ? (
              <Icon fill={Colors.NEUTRAL} />
            ) : color === 'blueWhite' ? (
              <Icon fill={Colors.NEUTRAL} />
            ) : color === 'white' ? (
              <Icon fill={Colors.PRIMARY} />
            ) : color === 'lightBlue' ? (
              <Icon fill={Colors.PRIMARY} />
            ) : color === 'red' ? (
              <Icon fill={Colors.NEUTRAL} />
            ) : color === 'redWhite' ? (
              <Icon fill={pressed ? Colors.NEUTRAL : Colors.ALERT_RED} />
            ) : undefined)}

          {Boolean(text) && (
            <Text
              style={[
                styles.text,
                color === 'blue' && blueStyles.text,
                color === 'blueWhite' && blueWhiteStyles.text,
                color === 'white' && whiteStyles.text,
                color === 'lightBlue' && lightBlueStyles.text,
                color === 'red' && redStyles.text,
                color === 'redWhite' && redWhiteStyles.text,
                disabled && styles.textDisabled,
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
