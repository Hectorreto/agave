import { Text, TextInput, View } from 'react-native';

import styles from './styles';
import { Colors } from '../../themes/theme';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChange?: (text: string) => void;
  multiline?: boolean;
};

const InputText = ({ label, placeholder, value, onChange, multiline }: Props) => {
  const disabled = !onChange;

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        editable={!disabled}
        style={[
          multiline ? styles.textInputMultiline : styles.textInput,
          disabled && styles.disabled,
          !disabled && value !== '' && styles.inputWithValue,
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.NEUTRAL_600}
        value={value}
        onChangeText={onChange}
        multiline={multiline}
      />
    </View>
  );
};

export default InputText;
