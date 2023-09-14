import { Text, View } from 'react-native';

import styles from './styles';

type ItemProps = {
  current: number;
  value: number;
  label: string;
};

const Item = ({ current, value, label }: ItemProps) => {
  return (
    <View style={styles.titleContainer}>
      <View
        style={[
          styles.numberContainer,
          value < current && styles.prev,
          current < value && styles.next,
        ]}>
        <Text style={styles.numberText}>{value}</Text>
      </View>
      {Boolean(label) && (
        <Text style={[styles.title, current === value && styles.titleBold]}>{label}</Text>
      )}
    </View>
  );
};

type Props = {
  current: number;
  titles: string[];
};

const TabIndicator = ({ current, titles }: Props) => {
  return (
    <View style={styles.container}>
      {titles
        .reduce<string[]>((array, value, index) => {
          if (index > 0) {
            array.push('');
          }
          array.push(value);
          return array;
        }, [])
        .map((label, index) =>
          index % 2 === 0 ? (
            <Item key={index} value={index / 2 + 1} current={current} label={label} />
          ) : (
            <View key={index} style={styles.divider} />
          )
        )}
    </View>
  );
};

export default TabIndicator;
