import { ReactElement, useRef } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import styles from './styles';
import { Colors } from '../../themes/theme';

type Props = {
  label?: string;
  placeholder: string;
  value: string;
  onChange?: (text: string) => void;
  multiline?: boolean;
  iconRight?: ReactElement;
};

const InputNumber = ({ label, placeholder, value, onChange, multiline, iconRight }: Props) => {
  const disabled = !onChange;
  const ref = useRef<TextInput>(null);

  const handleOnChange = () => {
    if (!onChange) return undefined;
    return (text: string) => {
      const isNumber = !isNaN(Number(text));
      if (isNumber) {
        onChange(text);
      } else if (text === '.') {
        onChange('0.');
      }
    };
  };

  const handleOnEndEditing = () => {
    if (!onChange) return undefined;
    return () => {
      if (value !== '') {
        const number = Number(value);
        onChange(String(number));
      }
    };
  };

  return (
    <View style={styles.container}>
      {Boolean(label) && <Text style={styles.inputLabel}>{label}</Text>}
      <View>
        <TextInput
          ref={ref}
          editable={!disabled}
          style={[
            multiline ? styles.textInputMultiline : styles.textInput,
            disabled && styles.disabled,
            !disabled && value !== '' && styles.inputWithValue,
            iconRight !== undefined && { paddingRight: 40 },
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.NEUTRAL_600}
          value={value}
          onChangeText={handleOnChange()}
          multiline={multiline}
          keyboardType="numeric"
          onEndEditing={handleOnEndEditing()}
          maxLength={15}
        />
        {iconRight && (
          <Pressable onPress={() => ref.current?.focus()} style={styles.rightIcon}>
            {iconRight}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default InputNumber;
