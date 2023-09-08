import { Text, View } from 'react-native';

import styles from './style';

type ItemProps = {
  index: number;
  value: number;
  label: string;
};

const Item = ({ index, value, label }: ItemProps) => {
  return (
    <View style={styles.tabsTitleContainer}>
      <View
        style={[
          styles.tabsNumberContainer,
          value < index && styles.tabsPrev,
          index < value && styles.tabsNext,
        ]}>
        <Text style={styles.tabsNumberText}>{value}</Text>
      </View>
      {index === value && <Text style={styles.tabsTitle}>{label}</Text>}
    </View>
  );
};

type Props = {
  index: number;
};

const CreateApplicationTabs = ({ index }: Props) => {
  return (
    <View style={styles.tabsContainer}>
      <Item value={1} index={index} label="General" />
      <View style={styles.tabsDivider} />

      <Item value={2} index={index} label="Receta" />
      <View style={styles.tabsDivider} />

      <Item value={3} index={index} label="Ticket" />
      <View style={styles.tabsDivider} />

      <Item value={4} index={index} label="Iniciar aplicación" />
    </View>
  );
};

export default CreateApplicationTabs;
