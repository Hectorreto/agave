import { ReactElement, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Footer from './Footer';
import styles from './styles';

type Props = {
  maxRows?: number;
  titles: ReactElement[];
  rows: {
    id: string;
    values: ReactElement[];
  }[];
  showFooter?: boolean;
  flex?: number[];
};

const PaginatedTable = ({ titles, rows, maxRows = 5, showFooter = true, flex }: Props) => {
  const [page, setPage] = useState(1);
  const total = rows.length;
  const start = Math.min((page - 1) * maxRows + 1, total);
  const end = Math.min(page * maxRows, total);
  const lastPage = Math.max(Math.ceil(total / maxRows), 1);
  const filteredRows = showFooter ? rows.slice(start - 1, end) : rows;

  const children = titles.map((title, index) => (
    <View key={index} style={[flex?.[index] !== undefined && { flex: flex[index] }]}>
      <View style={styles.titleContainer}>{title}</View>
      {filteredRows.map((row, i) => (
        <View key={row.id} style={i % 2 === 0 ? styles.dataEvenContainer : styles.dataOddContainer}>
          {row.values[index]}
        </View>
      ))}
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {flex ? (
          <View style={styles.content}>{children}</View>
        ) : (
          <ScrollView horizontal style={styles.content}>
            {children}
          </ScrollView>
        )}
        {showFooter && (
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
        )}
      </View>
    </View>
  );
};

export default PaginatedTable;
