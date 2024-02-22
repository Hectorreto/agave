import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { useMapData } from './helpers';
import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import ExpandLess from '../../../../assets/svg/expand_less.svg';
import ExpandMore from '../../../../assets/svg/expand_more.svg';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import Search from '../../../../assets/svg/search.svg';
import MoreVert from '../../../../assets/svg/table/more_vert.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import FilterDate from '../../../components/filter-date/FilterDate';
import InputText from '../../../components/input-text/InputText';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import useExits from '../../../hooks/useExits';
import { ExitStackParamList } from '../../../navigation/ExitStack';
import { Colors } from '../../../themes/theme';
import { GUADALAJARA_REGION } from '../../../utils/constants';
import { formatDate, formatDateTime, formatTime } from '../../../utils/dateUtils';

type Props = NativeStackScreenProps<ExitStackParamList, 'ListExits'>;

const ListExitScreen = ({ navigation }: Props) => {
  const [date, setDate] = useState<Date>();
  const [search, setSearch] = useState('');
  const [createdAtSort, setCreatedAtSort] = useState<'ASC' | 'DESC'>('DESC');
  const { data } = useExits({ date, search, createdAtSort });
  const { mapRef, markerRefs, moveMapToExit } = useMapData(data);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FilterDate date={date} onChange={setDate} />
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        initialRegion={GUADALAJARA_REGION}>
        {data.map((exit) => (
          <Marker
            key={exit.id}
            ref={markerRefs.get(exit.id)}
            coordinate={{ latitude: exit.latitude, longitude: exit.longitude }}
            title={exit.type}
            description={formatDateTime(exit.createdAt)}
            onCalloutPress={() => navigation.navigate('SeeExit', { id: exit.id })}
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
        <View style={{ width: 270 }}>
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
        titles={[
          <Text style={styles.tableTitleText}>Tipo de salida</Text>,
          <Text style={styles.tableTitleText}>Plantas</Text>,
          <TouchableOpacity
            onPress={() => {
              if (createdAtSort === 'ASC') {
                setCreatedAtSort('DESC');
              } else {
                setCreatedAtSort('ASC');
              }
            }}
            style={styles.tableDateSort}>
            <Text style={styles.tableTitleTextSort}>Fecha</Text>
            {createdAtSort === 'DESC' ? (
              <ExpandMore fill={Colors.PRIMARY_200} />
            ) : (
              <ExpandLess fill={Colors.PRIMARY_200} />
            )}
          </TouchableOpacity>,
          <></>,
        ]}
        rows={data.map((exit) => ({
          id: exit.id,
          values: [
            <TouchableOpacity style={styles.rowButton} onPress={() => moveMapToExit(exit)}>
              <Text style={styles.dataText}>{exit.type}</Text>
            </TouchableOpacity>,
            <TouchableOpacity style={styles.rowButton} onPress={() => moveMapToExit(exit)}>
              <Text style={styles.dataText}>{exit.plantCount}</Text>
            </TouchableOpacity>,
            <TouchableOpacity style={styles.rowButton} onPress={() => moveMapToExit(exit)}>
              <Text style={styles.formattedDate}>{formatDate(exit.createdAt)}</Text>
              <Text style={styles.formattedDate}>{formatTime(exit.createdAt)}</Text>
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
