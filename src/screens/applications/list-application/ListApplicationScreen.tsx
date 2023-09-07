import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, Text, View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import Search from '../../../../assets/svg/search.svg';
import MoreVert from '../../../../assets/svg/table/more_vert.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'ListApplications'>;

const data = [
  {
    id: '1',
    property: 'Nombre del predio',
    month: 'Septiembre',
    state: 'inProcess',
  },
  {
    id: '2',
    property: 'Nombre del predio',
    month: 'Agosto',
    state: 'finalized',
  },
  {
    id: '3',
    property: 'Nombre del predio',
    month: 'Enero',
    state: 'inProcess',
  },
  {
    id: '4',
    property: 'Nombre del predio',
    month: 'Marzo',
    state: 'finalized',
  },
  {
    id: '5',
    property: 'Nombre del predio',
    month: 'Diciembre',
    state: 'finalized',
  },
  {
    id: '6',
    property: 'Nombre del predio',
    month: 'Junio',
    state: 'finalized',
  },
];

const ListApplicationScreen = ({ navigation }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filterAndSearchContainer}>
        <FilterAlt />
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>Predio o lugar...</Text>
          <Search />
        </View>
      </View>
      <PaginatedTable
        titles={['Predio', 'Mes de aplicación', 'Estado', '']}
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <Text style={styles.dataText}>{value.property}</Text>,
            <Text style={styles.dataText}>{value.month}</Text>,
            <Text style={styles.dataText}>{value.state}</Text>,
            <Pressable
              style={({ pressed }) => [styles.moreButton, pressed && styles.moreButtonPressed]}
              onPress={() => navigation.navigate('CreateApplication1')}>
              <MoreVert />
            </Pressable>,
          ],
        }))}
      />
      <View style={styles.newItemContainer}>
        <CustomButton
          text="Nueva aplicación"
          color="blue"
          IconLeft={AddCircle}
          onPress={() => navigation.navigate('CreateApplication1')}
        />
      </View>
    </ScrollView>
  );
};

export default ListApplicationScreen;
