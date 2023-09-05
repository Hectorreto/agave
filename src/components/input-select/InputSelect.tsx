import { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import ArrowDropDown from '../../../assets/svg/arrow_drop_down.svg';
import { Colors } from '../../themes/theme';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onPress: (text: string) => void;
  items: {
    label: string;
    value: string;
  }[];
};

const InputSelect = ({ label, placeholder, value, onPress, items }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const text = items.find((item) => item.value === value)?.label;

  return (
    <View style={[styles.container, isOpen && { zIndex: 1 }]}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View>
        <TouchableOpacity style={styles.inputContainer} onPress={() => setIsOpen(!isOpen)}>
          {text ? (
            <Text style={styles.inputValue} numberOfLines={1}>
              {text}
            </Text>
          ) : (
            <Text style={styles.inputPlaceholder} numberOfLines={1}>
              {placeholder}
            </Text>
          )}
          <ArrowDropDown />
        </TouchableOpacity>
        <View>
          {isOpen && (
            <View style={styles.dropdown}>
              {items.map((item) => (
                <Pressable
                  key={item.value}
                  onPress={() => {
                    onPress(item.value);
                    setIsOpen(false);
                  }}
                  style={({ pressed }) => [
                    pressed
                      ? { backgroundColor: Colors.PRIMARY_100 }
                      : { backgroundColor: Colors.NEUTRAL },
                    styles.listItemContainer,
                  ]}>
                  <Text style={styles.listItem}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default InputSelect;
