import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import Create from '../../../../assets/svg/create.svg';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import Search from '../../../../assets/svg/search.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import FilterDate from '../../../components/filter-date/FilterDate';
import InputText from '../../../components/input-text/InputText';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import { MonitoringStackParamList } from '../../../navigation/MonitoringStack';
import { formatDateTime } from '../../../utils/dateUtils';

const data = [
  {
    id: '1',
    name: 'Nombre del predio',
    date: new Date(2023, 7, 8, 15, 34),
  },
  {
    id: '2',
    name: 'Nombre del predio',
    date: new Date(2023, 7, 6, 10, 3),
  },
  {
    id: '3',
    name: 'Nombre del predio',
    date: new Date(2023, 7, 1, 9, 41),
  },
];

type Props = NativeStackScreenProps<MonitoringStackParamList, 'ListMonitoring'>;

const ListMonitoringScreen = ({ navigation }: Props) => {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState<Date>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FilterDate date={date} onChange={setDate} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20.6739329,
          longitude: -103.4178149,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: 20.6739329,
            longitude: -103.4178149,
          }}
          title="Marker Title 1"
          description="Marker Description 1"
        />
      </MapView>
      <View style={styles.newItemContainer}>
        <CustomButton
          color="blue"
          text="Nuevo monitoreo"
          Icon={AddCircle}
          onPress={() => navigation.navigate('CreateMonitoring')}
        />
      </View>
      <Divider />
      <View style={styles.filterAndSearchContainer}>
        <FilterAlt />
        <View style={{ width: 260 }}>
          <InputText
            placeholder="Predio o lugar..."
            value={search}
            onChange={setSearch}
            iconRight={<Search />}
          />
        </View>
      </View>
      <PaginatedTable
        titles={[
          <Text style={styles.tableTitleText}>Predio</Text>,
          <Text style={styles.tableTitleText}>Fecha</Text>,
          <></>,
        ]}
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <Text style={styles.dataText}>{value.name}</Text>,
            <Text style={styles.formattedDate}>{formatDateTime(value.date)}</Text>,
            <View style={styles.moreButton}>
              <CustomButton
                color="white"
                Icon={Create}
                onPress={() => navigation.navigate('SeeMonitoring')}
              />
            </View>,
          ],
        }))}
      />
    </ScrollView>
  );
};

export default ListMonitoringScreen;
