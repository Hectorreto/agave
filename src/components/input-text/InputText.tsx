import { Text, TextInput, View } from 'react-native';

import styles from './styles';
import { Colors } from '../../themes/theme';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  multiline?: boolean;
};

const InputText = ({ label, placeholder, value, onChange, multiline }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={multiline ? styles.textInputMultiline : styles.textInput}
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
