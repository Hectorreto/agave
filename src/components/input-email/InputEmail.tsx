import { Text, TextInput, View } from 'react-native';

import styles from './styles';
import { Colors } from '../../themes/theme';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  nextInputRef?: React.RefObject<TextInput>;
};

const InputEmail = ({ label, placeholder, value, onChange, nextInputRef }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.NEUTRAL_600}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        value={value}
        onChangeText={onChange}
        returnKeyType={nextInputRef && 'next'}
        onSubmitEditing={nextInputRef && (() => nextInputRef.current?.focus())}
        blurOnSubmit={!nextInputRef}
      />
    </View>
  );
};

export default InputEmail;
