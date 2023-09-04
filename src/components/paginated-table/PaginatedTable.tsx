import { ReactElement } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Footer from './Footer';
import styles from './styles';

interface Props {
  titles: string[];
  rows: {
    id: string;
    values: ReactElement[];
  }[];
}

const PaginatedTable = ({ titles, rows }: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.content}>
        {titles.map((title, index) => (
          <View key={title}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            {rows.map((row, i) => (
              <View
                key={row.id}
                style={i % 2 === 0 ? styles.dataEvenContainer : styles.dataOddContainer}>
                {row.values[index]}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default PaginatedTable;
