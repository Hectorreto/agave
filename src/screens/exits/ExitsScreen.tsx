import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import ArrowDropDown from '../../../assets/svg/arrow_drop_down.svg';
import FilterAlt from '../../../assets/svg/filter_alt.svg';
import Search from '../../../assets/svg/search.svg';
import MoreVert from '../../../assets/svg/table/more_vert.svg';
import BlueButton from '../../components/blue-button/BlueButton';
import Divider from '../../components/divider/Divider';
import PaginatedTable from '../../components/paginated-table/PaginatedTable';
import { ExitsStackParamList } from '../../navigation/ExitsStack';
import { formatDateTime } from '../../utils/dateUtils';

type Props = NativeStackScreenProps<ExitsStackParamList, 'Exits'>;

const data = [
  {
    id: '1',
    type: 'Fitosanitaria',
    plants: '###',
    date: new Date(2023, 7, 8, 15, 34),
  },
  {
    id: '2',
    type: 'Para monitoreo',
    plants: '###',
    date: new Date(2023, 7, 6, 10, 3),
  },
  {
    id: '3',
    type: 'Fitosanitaria',
    plants: '###',
    date: new Date(2023, 7, 1, 9, 41),
  },
];

const ExitsScreen = ({ navigation }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filterContainer}>
        <FilterAlt style={styles.filterLeftIcon} />
        <Text style={styles.filterText}>Fecha de monitoreo</Text>
        <ArrowDropDown style={styles.filterRightIcon} />
      </View>
      <View style={styles.map} />
      <View style={styles.newExitContainer}>
        <BlueButton text="Nueva salida" onPress={() => navigation.navigate('CreateExit')} />
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
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <Text style={styles.dataText}>{value.type}</Text>,
            <Text style={styles.dataText}>{value.plants}</Text>,
            <Text style={styles.formattedDate}>{formatDateTime(value.date)}</Text>,
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => navigation.navigate('SeeExit')}>
              <MoreVert />
            </TouchableOpacity>,
          ],
        }))}
      />
    </ScrollView>
  );
};

export default ExitsScreen;
