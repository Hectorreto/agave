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
import IconMoreVert from '../../../../assets/svg/table/more_vert.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import FilterDate from '../../../components/filter-date/FilterDate';
import InputText from '../../../components/input-text/InputText';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import useMonitoring from '../../../hooks/useMonitoring';
import { MonitoringStackParamList } from '../../../navigation/MonitoringStack';
import { Colors } from '../../../themes/theme';
import { GUADALAJARA_REGION } from '../../../utils/constants';
import { formatDate, formatDateTime, formatTime } from '../../../utils/dateUtils';

type Props = NativeStackScreenProps<MonitoringStackParamList, 'ListMonitoring'>;

const ListMonitoringScreen = ({ navigation }: Props) => {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState<Date>();
  const [createdAtSort, setCreatedAtSort] = useState<'ASC' | 'DESC'>('DESC');
  const { data } = useMonitoring({ date, search, createdAtSort });
  const { mapRef, markerRefs, moveMapToMonitoring } = useMapData(data);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FilterDate date={date} onChange={setDate} />
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        initialRegion={GUADALAJARA_REGION}>
        {data.map((monitoring) => (
          <Marker
            key={monitoring.id}
            ref={markerRefs.get(monitoring.id)}
            coordinate={{ latitude: monitoring.latitude, longitude: monitoring.longitude }}
            title={monitoring.propertyName}
            description={formatDateTime(monitoring.createdAt)}
            onCalloutPress={() =>
              navigation.navigate('SeeMonitoring', { monitoringId: monitoring.id })
            }
          />
        ))}
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
        <View style={{ width: 270 }}>
          <InputText
            placeholder="Predio o fecha..."
            value={search}
            onChange={setSearch}
            iconRight={<Search />}
          />
        </View>
      </View>
      <PaginatedTable
        maxRows={3}
        flex={[1, 0, 0]}
        titles={[
          <Text style={styles.tableTitleText}>Predio</Text>,
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
        rows={data.map((value) => ({
          id: value.id,
          values: [
            <TouchableOpacity style={styles.rowButton} onPress={() => moveMapToMonitoring(value)}>
              <Text style={styles.dataText}>{value.propertyName}</Text>
            </TouchableOpacity>,
            <TouchableOpacity style={styles.rowButton} onPress={() => moveMapToMonitoring(value)}>
              <Text style={styles.formattedDate}>{formatDate(value.createdAt)}</Text>
              <Text style={styles.formattedDate}>{formatTime(value.createdAt)}</Text>
            </TouchableOpacity>,
            <View style={styles.moreButton}>
              <CustomButton
                color="white"
                Icon={IconMoreVert}
                onPress={() => navigation.navigate('SeeMonitoring', { monitoringId: value.id })}
              />
            </View>,
          ],
        }))}
      />
    </ScrollView>
  );
};

export default ListMonitoringScreen;
