import { ReactElement, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Footer from './Footer';
import styles from './styles';

type Props = {
  maxRows?: number;
  titles: string[];
  rows: {
    id: string;
    values: ReactElement[];
  }[];
};

const PaginatedTable = ({ titles, rows, maxRows = 5 }: Props) => {
  const [page, setPage] = useState(1);
  const total = rows.length;
  const start = Math.min((page - 1) * maxRows + 1, total);
  const end = Math.min(page * maxRows, total);
  const lastPage = Math.max(Math.ceil(total / maxRows), 1);
  const filteredRows = rows.slice(start - 1, end);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView horizontal style={styles.content}>
          {titles.map((title, index) => (
            <View key={title}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title}</Text>
              </View>
              {filteredRows.map((row, i) => (
                <View
                  key={row.id}
                  style={i % 2 === 0 ? styles.dataEvenContainer : styles.dataOddContainer}>
                  {row.values[index]}
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        <Footer
          total={total}
          start={start}
          end={end}
          page={page}
          onPressPrev={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
          onPressNext={() => {
            if (end < total) {
              setPage(page + 1);
            }
          }}
          onPressStart={() => {
            setPage(1);
          }}
          onPressEnd={() => {
            setPage(lastPage);
          }}
        />
      </View>
    </View>
  );
};

export default PaginatedTable;
