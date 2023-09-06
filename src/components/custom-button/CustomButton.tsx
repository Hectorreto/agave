import { ReactElement } from 'react';
import { Pressable, Text } from 'react-native';

import styles, { blueStyles, lightBlueStyles, whiteStyles } from './styles';

type Props = {
  text: string;
  onPress: () => void;
  iconLeft?: ReactElement;
  color: 'blue' | 'white' | 'lightBlue';
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
      ]}
      onPress={onPress}>
      {iconLeft}
      <Text
        style={[
          styles.text,
          color === 'blue' && blueStyles.text,
          color === 'white' && whiteStyles.text,
          color === 'lightBlue' && lightBlueStyles.text,
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
