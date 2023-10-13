import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import ExpandLess from '../../../../assets/svg/expand_less.svg';
import ExpandMore from '../../../../assets/svg/expand_more.svg';
import MoreVert from '../../../../assets/svg/table/more_vert.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import FilterDate from '../../../components/filter-date/FilterDate';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import PaginatedTable from '../../../components/paginated-table/PaginatedTable';
import useExits from '../../../hooks/useExits';
import { PropertyTabsParamList } from '../../../navigation/PropertyTabs';
import { Colors } from '../../../themes/theme';
import { GUADALAJARA_REGION } from '../../../utils/constants';
import { formatDate, formatDateTime, formatTime } from '../../../utils/dateUtils';
import { useMapData } from '../../exits/list-exits/helpers';

type Props = MaterialTopTabScreenProps<PropertyTabsParamList, 'PropertyPlantExits'>;

const PropertyPlantExitsScreen = ({ route, navigation }: Props) => {
  const [date, setDate] = useState<Date>();
  const [createdAtSort, setCreatedAtSort] = useState<'ASC' | 'DESC'>('DESC');

  const { property } = route.params;
  const { data } = useExits({ date, propertyId: property.id, createdAtSort });
  const { mapRef, markerRefs, moveMapToExit } = useMapData(data);

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
      <MapView ref={mapRef} style={styles.map} initialRegion={GUADALAJARA_REGION}>
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
          onPress={() =>
            (navigation as any).navigate('ExitStack', {
              screen: 'CreateExit',
              initial: false,
            })
          }
        />
      </View>
      <Divider />
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

export default PropertyPlantExitsScreen;
