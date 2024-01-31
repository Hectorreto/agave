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
  info?: string;
  inputRef?: React.RefObject<TextInput>;
  onSubmit?: () => void;
};

const InputPassword = ({
  label,
  placeholder,
  value,
  onChange,
  info,
  inputRef,
  onSubmit,
}: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
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
          onSubmitEditing={onSubmit}
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
    </View>
  );
};

export default InputPassword;
