import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import ArrowDropDown from '../../../../assets/svg/arrow_drop_down.svg';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import Search from '../../../../assets/svg/search.svg';
import MoreVert from '../../../../assets/svg/table/more_vert.svg';
import database from '../../../../database';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import { ExitStackParamList } from '../../../navigation/ExitStack';
import { Exit } from '../../../services/exitService';
import { formatDateTime } from '../../../utils/dateUtils';

type Props = NativeStackScreenProps<ExitStackParamList, 'ListExits'>;

const ListExitScreen = ({ navigation }: Props) => {
  const [update] = useState(4);
  const [data, setData] = useState<Exit[]>([]);

  useEffect(() => {
    console.log(JSON.stringify(data, null, 2));
  }, [data]);

  useEffect(() => {
    database.transaction((transaction) => {
      const sql = 'SELECT * FROM exit;';
      transaction.executeSql(sql, [], (_, { rows }) => {
        const data = rows._array;
        setData(data);
      });
    });
  }, [update]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filterContainer}>
        <FilterAlt style={styles.filterLeftIcon} />
        <Text style={styles.filterText}>Fecha de monitoreo</Text>
        <ArrowDropDown style={styles.filterRightIcon} />
      </View>
      <View style={styles.map} />
      <View style={styles.newItemContainer}>
        <CustomButton
          color="blue"
          text="Nueva salida"
          Icon={AddCircle}
          onPress={() => navigation.navigate('CreateExit')}
        />
      </View>
      <Divider />
      <View style={styles.filterAndSearchContainer}>
        <FilterAlt />
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>Predio o lugar...</Text>
          <Search />
        </View>
      </View>
      <PaginatedTable
        titles={['Tipo de salida', 'Plantas', 'Fecha', '']}
        rows={data.map((exit) => ({
          id: exit.id,
          values: [
            <Text style={styles.dataText}>{exit.type}</Text>,
            <Text style={styles.dataText}>{exit.plantCount}</Text>,
            <Text style={styles.formattedDate}>{formatDateTime(new Date(exit.createdAt))}</Text>,
            <View style={styles.moreButton}>
              <CustomButton
                color="blueWhite"
                Icon={MoreVert}
                onPress={() => navigation.navigate('SeeExit')}
              />
            </View>,
          ],
        }))}
      />
    </ScrollView>
  );
};

export default ListExitScreen;
