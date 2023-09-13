import { useRef, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import styles from './styles';
import ArrowDropDown from '../../../assets/svg/arrow_drop_down.svg';
import { Colors } from '../../themes/theme';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onPress?: (text: string) => void;
  items: {
    label: string;
    value: string;
  }[];
};

const InputSelect = ({ label, placeholder, value, onPress, items }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const text = items.find((item) => item.value === value)?.label;
  const disabled = !onPress;

  const ref = useRef<View>(null);
  const [pageY, setPageY] = useState(0);

  return (
    <View
      style={[styles.container, isOpen && { zIndex: (1000 * 1000 * 1000) / (pageY || 1) }]}
      ref={ref}
      onLayout={() => {
        ref.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
          setPageY(pageY);
        });
      }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View>
        <TouchableOpacity
          style={[
            styles.inputContainer,
            disabled && styles.inputContainerDisabled,
            !disabled && value !== '' && styles.inputWithValue,
          ]}
          onPress={() => setIsOpen(!isOpen)}
          disabled={disabled}>
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
        <View>
          {isOpen && onPress && (
            <ScrollView style={styles.dropdown}>
              {items.map((item) => (
                <Pressable
                  key={item.value}
                  onPress={() => {
                    onPress(item.value);
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
          )}
        </View>
      </View>
    </View>
  );
};

export default InputSelect;
