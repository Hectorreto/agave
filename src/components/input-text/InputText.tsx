import { Text, TextInput, View } from 'react-native';

import styles from './styles';
import { Colors } from '../../themes/theme';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
};

const InputText = ({ label, placeholder, value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.NEUTRAL_600}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default InputText;
