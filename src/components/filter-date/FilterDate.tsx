import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import ArrowDropDown from '../../../assets/svg/arrow_drop_down.svg';
import FilterAlt from '../../../assets/svg/filter_alt.svg';
import { formatDate } from '../../utils/dateUtils';

type Props = {
  date?: Date;
  onChange: (date: Date | undefined) => void;
};

const FilterDate = ({ date, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={[styles.container, date !== undefined && styles.containerWithValue]}
        onPress={() => setIsOpen(!isOpen)}>
        <FilterAlt style={styles.leftIcon} />
        {date ? (
          <Text style={styles.textValue}>{formatDate(date)}</Text>
        ) : (
          <Text style={styles.text}>Fecha de monitoreo</Text>
        )}
        <ArrowDropDown style={styles.rightIcon} />
      </TouchableOpacity>
      {isOpen && (
        <DateTimePicker
          value={date || new Date()}
          onChange={(event, date) => {
            setIsOpen(false);
            if (event.type === 'set' && date) {
              onChange(date);
            }
            if (event.type === 'dismissed') {
              onChange(undefined);
            }
          }}
        />
      )}
    </>
  );
};

export default FilterDate;
