import { Text, View } from 'react-native';

import styles from './styles';
import RadioButton from '../radio-button/RadioButton';

type Item = {
  label: string;
  value: string;
};

type Props = {
  title?: string;
  label: string;
  items: Item[];
  value: string;
  onChange?: (value: string) => void;
  submitted?: boolean;
};

const InputRadioGroup = ({ title, label, items, value, onChange, submitted }: Props) => {
  const isValid = Boolean(value);
  const showError = submitted && !isValid;

  return (
    <View style={styles.container}>
      {Boolean(title) && <Text style={[styles.title]}>{title}</Text>}
      <Text style={[styles.label, showError && styles.inputLabelError]}>{label}</Text>
      <View style={styles.innerContainer}>
        {items.map((item) => (
          <RadioButton
            key={item.value}
            label={item.label}
            active={item.value === value}
            onPress={onChange ? () => onChange(item.value) : undefined}
          />
        ))}
      </View>
    </View>
  );
};

export default InputRadioGroup;
