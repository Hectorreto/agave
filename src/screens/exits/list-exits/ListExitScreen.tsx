import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { GUADALAJARA_REGION, useExits, useMapData, useTableData } from './helpers';
import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import Search from '../../../../assets/svg/search.svg';
import MoreVert from '../../../../assets/svg/table/more_vert.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import FilterDate from '../../../components/filter-date/FilterDate';
import InputText from '../../../components/input-text/InputText';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import { ExitStackParamList } from '../../../navigation/ExitStack';
import { formatDateTime } from '../../../utils/dateUtils';

type Props = NativeStackScreenProps<ExitStackParamList, 'ListExits'>;

const ListExitScreen = ({ navigation }: Props) => {
  const [date, setDate] = useState<Date>();
  const { data } = useExits(date);
  const { mapRef, markerRefs, moveMapToExit } = useMapData(data);
  const [search, setSearch] = useState('');
  const { filteredData } = useTableData(data, search);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FilterDate date={date} onChange={setDate} />
      <MapView ref={mapRef} style={styles.map} initialRegion={GUADALAJARA_REGION}>
        {data.map((exit) => (
          <Marker
            key={exit.id}
            ref={markerRefs.get(exit.id)}
            coordinate={{ latitude: exit.latitude, longitude: exit.longitude }}
            title={exit.type}
            description={formatDateTime(exit.createdAt)}
          />
        ))}
      </MapView>
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
        maxRows={3}
        titles={['Tipo de salida', 'Plantas', 'Fecha', '']}
        rows={filteredData.map((exit) => ({
          id: exit.id,
          values: [
            <TouchableOpacity style={styles.rowButton} onPress={() => moveMapToExit(exit)}>
              <Text style={styles.dataText}>{exit.type}</Text>
            </TouchableOpacity>,
            <TouchableOpacity style={styles.rowButton} onPress={() => moveMapToExit(exit)}>
              <Text style={styles.dataText}>{exit.plantCount}</Text>
            </TouchableOpacity>,
            <TouchableOpacity style={styles.rowButton} onPress={() => moveMapToExit(exit)}>
              <Text style={styles.formattedDate}>{formatDateTime(exit.createdAt)}</Text>
            </TouchableOpacity>,
            <View style={styles.moreButton}>
              <CustomButton
                color="blueWhite"
                Icon={MoreVert}
                onPress={() => navigation.navigate('SeeExit', { id: exit.id })}
              />
            </View>,
          ],
        }))}
      />
    </ScrollView>
  );
};

export default ListExitScreen;
