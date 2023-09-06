import { ReactElement } from 'react';
import { Pressable, Text } from 'react-native';

import styles, { blueStyles, lightBlueStyles, redStyles, whiteStyles } from './styles';

type Props = {
  text: string;
  onPress: () => void;
  iconLeft?: ReactElement;
  color: 'blue' | 'white' | 'lightBlue' | 'red';
};

const CustomButton = ({ text, onPress, iconLeft, color }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        iconLeft !== undefined && styles.containerWithIconLeft,
        color === 'blue' && !pressed && blueStyles.container,
        color === 'blue' && pressed && blueStyles.pressed,
        color === 'white' && !pressed && whiteStyles.container,
        color === 'white' && pressed && whiteStyles.pressed,
        color === 'lightBlue' && !pressed && lightBlueStyles.container,
        color === 'lightBlue' && pressed && lightBlueStyles.pressed,
        color === 'red' && !pressed && redStyles.container,
        color === 'red' && pressed && redStyles.pressed,
      ]}
      onPress={onPress}>
      {iconLeft}
      <Text
        style={[
          styles.text,
          color === 'blue' && blueStyles.text,
          color === 'white' && whiteStyles.text,
          color === 'lightBlue' && lightBlueStyles.text,
          color === 'red' && redStyles.text,
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
