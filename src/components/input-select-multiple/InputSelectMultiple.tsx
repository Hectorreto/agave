import { ReactElement, useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import styles from './styles';
import ArrowDropDown from '../../../assets/svg/arrow_drop_down.svg';
import Checkbox from '../checkbox/Checkbox';

type Props = {
  label?: string;
  placeholder: string;
  values: string[];
  onChange?: (values: string[]) => void;
  items: {
    label: string;
    value: string;
  }[];
  iconLeft?: ReactElement;
  submitted?: boolean;
};

const InputSelectMultiple = ({
  label,
  placeholder,
  values,
  onChange,
  items,
  iconLeft,
  submitted,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const text = values
    .map((value) => items.find((item) => item.value === value)?.label)
    .sort()
    .join(', ');
  const disabled = !onChange || !items.length;
  const isValid = values.length > 0;
  const showError = submitted && !isValid;

  return (
    <>
      <View style={styles.container}>
        {Boolean(label) && (
          <Text style={[styles.inputLabel, showError && styles.inputLabelError]}>{label}</Text>
        )}
        <TouchableOpacity
          style={[
            styles.inputContainer,
            disabled && styles.inputContainerDisabled,
            !disabled && values.length !== 0 && styles.inputWithValue,
            iconLeft && { paddingLeft: 0 },
            showError && styles.inputError,
          ]}
          onPress={() => setIsOpen(!isOpen)}
          disabled={disabled}>
          {iconLeft}
          {text ? (
            <Text style={[styles.inputValue, disabled && styles.inputValueDisabled]}>{text}</Text>
          ) : (
            <Text style={styles.inputPlaceholder} numberOfLines={1}>
              {placeholder}
            </Text>
          )}
          <ArrowDropDown />
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        onRequestClose={() => setIsOpen(false)}
        visible={Boolean(isOpen && onChange)}
        animationType="fade">
        <View style={styles.backgroundContainer}>
          <Pressable style={styles.modalOutside} onPress={() => setIsOpen(false)} />
          <ScrollView style={styles.modal}>
            {items.map((item) => {
              const enabled = values.indexOf(item.value) !== -1;

              return (
                <View key={item.value} style={styles.listItem}>
                  <Checkbox
                    label={item.label}
                    value={enabled}
                    onChange={() => {
                      if (!onChange) return;
                      if (enabled) {
                        onChange(values.filter((value) => value !== item.value));
                      } else {
                        onChange([...values, item.value].sort());
                      }
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default InputSelectMultiple;
