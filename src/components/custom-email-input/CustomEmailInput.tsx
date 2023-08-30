import React, { FC } from 'react';
import { Text, TextInput, View } from 'react-native';

import styles from './styles';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}

const CustomEmailInput: FC<Props> = ({ label, placeholder, value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#6E7981"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default CustomEmailInput;
