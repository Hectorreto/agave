import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import MoreVert from '../../../../assets/svg/table/more_vert.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import FilterDate from '../../../components/filter-date/FilterDate';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import { formatDateTime } from '../../../utils/dateUtils';

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

const PropertyPlantExitsScreen = () => {
  const [date, setDate] = useState<Date>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderTabIndicator
        items={[
          { label: 'Tablero', screen: 'PropertyBoard' },
          { label: 'Información general', screen: 'PropertyGeneralInfo' },
          { label: 'Salidas de plantas', screen: 'PropertyPlantExits' },
        ]}
        active="PropertyPlantExits"
      />
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
        <CustomButton color="blue" text="Nueva salida" Icon={AddCircle} onPress={() => {}} />
      </View>
      <Divider />
      <PaginatedTable
        titles={['Tipo de salida', 'Plantas', 'Fecha', '']}
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <Text style={styles.dataText}>{value.type}</Text>,
            <Text style={styles.dataText}>{value.plants}</Text>,
            <Text style={styles.formattedDate}>{formatDateTime(value.date)}</Text>,
            <View style={styles.moreButton}>
              <CustomButton color="blueWhite" Icon={MoreVert} onPress={() => {}} />
            </View>,
          ],
        }))}
      />
    </ScrollView>
  );
};

export default PropertyPlantExitsScreen;
