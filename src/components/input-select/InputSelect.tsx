import { ReactElement, useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import styles from './styles';
import ArrowDropDown from '../../../assets/svg/arrow_drop_down.svg';
import { Colors } from '../../themes/theme';

type Props = {
  label?: string;
  placeholder: string;
  value: string;
  onChange?: (text: string) => void;
  items: {
    label: string;
    value: string;
  }[];
  iconLeft?: ReactElement;
  submitted?: boolean;
};

const InputSelect = ({
  label,
  placeholder,
  value,
  onChange,
  items,
  iconLeft,
  submitted,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const text = items.find((item) => item.value === value)?.label;
  const disabled = !onChange || !items.length;
  const isValid = Boolean(value);
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
            !disabled && value !== '' && styles.inputWithValue,
            iconLeft && { paddingLeft: 0 },
            showError && styles.inputError,
          ]}
          onPress={() => setIsOpen(!isOpen)}
          disabled={disabled}>
          {iconLeft}
          {text ? (
            <Text
              style={[styles.inputValue, disabled && styles.inputValueDisabled]}
              numberOfLines={1}>
              {text}
            </Text>
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
            {items.map((item) => (
              <Pressable
                key={item.value}
                onPress={() => {
                  onChange?.(item.value);
                  setIsOpen(false);
                }}
                style={({ pressed }) => [
                  styles.listItemContainer,
                  pressed && { backgroundColor: Colors.PRIMARY_100 },
                ]}>
                <Text style={styles.listItem}>{item.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default InputSelect;
