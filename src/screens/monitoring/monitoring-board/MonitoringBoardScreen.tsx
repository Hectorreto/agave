import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useEffect, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import MapView, { MapMarker, Marker } from 'react-native-maps';

import styles from './styles';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import { MonitoringTabsParamList } from '../../../navigation/MonitoringTabs';
import { formatDateTime } from '../../../utils/dateUtils';

type Props = MaterialTopTabScreenProps<MonitoringTabsParamList, 'MonitoringBoard'>;

const MonitoringBoardScreen = ({ route }: Props) => {
  const { monitoring } = route.params;
  const markerRef = useRef<MapMarker>(null);

  useEffect(() => {
    setTimeout(() => {
      markerRef.current?.showCallout();
    }, 1);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderTabIndicator
        items={[
          { label: 'Tablero', screen: 'MonitoringBoard' },
          { label: 'Información general', screen: 'MonitoringGeneralInfo' },
        ]}
        active="MonitoringBoard"
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: monitoring.latitude,
          longitude: monitoring.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.05,
        }}>
        <Marker
          ref={markerRef}
          coordinate={{ latitude: monitoring.latitude, longitude: monitoring.longitude }}
          title={monitoring.property}
          description={formatDateTime(monitoring.createdAt)}
        />
      </MapView>
      <View style={styles.cardContainer}>
        <View style={styles.cardDataContainer}>
          <View style={styles.cardDataInnerContainer}>
            <Text style={styles.cardDataLeftText}>3,557</Text>
            <Text style={styles.cardDataRightText}>hectáreas totales</Text>
          </View>
        </View>
        <View />
      </View>
    </ScrollView>
  );
};

export default MonitoringBoardScreen;
