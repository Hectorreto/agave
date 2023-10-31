import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Today from '../../../assets/svg/today.svg';
import { formatDate } from '../../utils/dateUtils';

type Props = {
  label: string;
  date?: Date;
  onChange?: (date: Date) => void;
  submitted?: boolean;
};

const InputDate = ({ label, date, onChange, submitted }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const disabled = !onChange;
  const isValid = Boolean(date);
  const showError = submitted && !isValid;

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.inputLabel, showError && styles.inputLabelError]}>{label}</Text>
        <TouchableOpacity
          style={[
            styles.input,
            disabled && styles.inputContainerDisabled,
            !disabled && date !== undefined && styles.inputWithValue,
            showError && styles.inputError,
          ]}
          disabled={!onChange}
          onPress={() => setIsOpen(true)}>
          {date ? (
            <Text style={[styles.inputValue, disabled && styles.textDisabled]}>
              {formatDate(date)}
            </Text>
          ) : (
            <Text style={styles.inputPlaceholder}>dd/mm/aaaa</Text>
          )}
          <Today />
        </TouchableOpacity>
      </View>
      {isOpen && (
        <DateTimePicker
          value={date || new Date()}
          onChange={(event, date) => {
            setIsOpen(false);
            if (event.type === 'set' && date && onChange) {
              onChange(date);
            }
          }}
        />
      )}
    </>
  );
};

export default InputDate;
