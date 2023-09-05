import { ReactElement } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Footer from './Footer';
import styles from './styles';

type Props = {
  titles: string[];
  rows: {
    id: string;
    values: ReactElement[];
  }[];
};

const PaginatedTable = ({ titles, rows }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
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
    </View>
  );
};

export default PaginatedTable;
