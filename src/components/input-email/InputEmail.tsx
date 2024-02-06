import { Text, TextInput, View } from 'react-native';

import styles from './styles';
import { Colors } from '../../themes/theme';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  nextInputRef?: React.RefObject<TextInput>;
  onSubmit?: () => void;
  errorMessage?: string;
};

const InputEmail = ({
  label,
  placeholder,
  value,
  onChange,
  nextInputRef,
  onSubmit,
  errorMessage,
}: Props) => {
  const showError = Boolean(errorMessage);

  return (
    <View style={styles.container}>
      <Text style={[styles.inputLabel, showError && styles.textError]}>{label}</Text>
      <TextInput
        style={[styles.textInput, showError && styles.textInputError]}
        placeholder={placeholder}
        placeholderTextColor={Colors.NEUTRAL_600}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        value={value}
        onChangeText={onChange}
        returnKeyType={nextInputRef && 'next'}
        onSubmitEditing={onSubmit || (nextInputRef && (() => nextInputRef.current?.focus()))}
        blurOnSubmit={!nextInputRef}
      />
      {showError && <Text style={styles.textError}>{errorMessage}</Text>}
    </View>
  );
};

export default InputEmail;
