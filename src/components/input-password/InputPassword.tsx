import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Info from '../../../assets/svg/info.svg';
import Visibility from '../../../assets/svg/visibility.svg';
import { Colors } from '../../themes/theme';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  nextInputRef?: React.RefObject<TextInput>;
  info?: string;
  inputRef?: React.RefObject<TextInput>;
  onSubmit?: () => void;
  errorMessage?: string;
};

const InputPassword = ({
  label,
  placeholder,
  value,
  onChange,
  nextInputRef,
  info,
  inputRef,
  onSubmit,
  errorMessage,
}: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const showError = Boolean(errorMessage);

  return (
    <View style={styles.container}>
      <Text style={[styles.inputLabel, showError && styles.textError]}>{label}</Text>
      <View style={[styles.inputContainer, showError && styles.textInputError]}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={Colors.NEUTRAL_600}
          secureTextEntry={secureTextEntry}
          autoComplete="current-password"
          autoCapitalize="none"
          value={value}
          onChangeText={onChange}
          ref={inputRef}
          returnKeyType={nextInputRef && 'next'}
          onSubmitEditing={onSubmit || (nextInputRef && (() => nextInputRef.current?.focus()))}
          blurOnSubmit={!nextInputRef}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Visibility />
        </TouchableOpacity>
      </View>
      {Boolean(info) && (
        <View style={styles.informationContainer}>
          <Text style={styles.helperText}>{info}</Text>
          <Info />
        </View>
      )}
      {showError && <Text style={styles.textError}>{errorMessage}</Text>}
    </View>
  );
};

export default InputPassword;
