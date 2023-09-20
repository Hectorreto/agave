import { Pressable, Text } from 'react-native';

import styles from './styles';
import RadioButtonOn from '../../../assets/svg/radio-button/radio_button_checked.svg';
import RadioButtonOnPressed from '../../../assets/svg/radio-button/radio_button_checked_pressed.svg';
import RadioButtonOff from '../../../assets/svg/radio-button/radio_button_unchecked.svg';
import RadioButtonOffPressed from '../../../assets/svg/radio-button/radio_button_unchecked_pressed.svg';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

const RadioButton = ({ label, active, onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {({ pressed }) => (
        <>
          {!active && !pressed && <RadioButtonOff />}
          {!active && pressed && <RadioButtonOffPressed />}
          {active && !pressed && <RadioButtonOn />}
          {active && pressed && <RadioButtonOnPressed />}
          <Text>{label}</Text>
        </>
      )}
    </Pressable>
  );
};

export default RadioButton;
