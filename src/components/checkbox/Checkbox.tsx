import { Pressable, Text } from 'react-native';

import styles from './styles';
import CheckBoxOn from '../../../assets/svg/checkbox/check_box.svg';
import CheckBoxOff from '../../../assets/svg/checkbox/check_box_outline_blank.svg';
import CheckBoxOffPressed from '../../../assets/svg/checkbox/check_box_outline_blank_pressed.svg';
import CheckBoxOnPressed from '../../../assets/svg/checkbox/check_box_pressed.svg';

type Props = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const Checkbox = ({ label, value, onChange }: Props) => {
  return (
    <Pressable style={styles.container} onPress={() => onChange(!value)}>
      {({ pressed }) => (
        <>
          {!value && !pressed && <CheckBoxOff />}
          {!value && pressed && <CheckBoxOffPressed />}
          {value && !pressed && <CheckBoxOn />}
          {value && pressed && <CheckBoxOnPressed />}

          <Text style={styles.text}>{label}</Text>
        </>
      )}
    </Pressable>
  );
};

export default Checkbox;
