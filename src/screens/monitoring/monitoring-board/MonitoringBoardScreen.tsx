import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import MapView, { MapMarker, Marker } from 'react-native-maps';
import ViewShot from 'react-native-view-shot';

import { useMonitoringQualification } from './helpers';
import styles from './styles';
import CardSmall from '../../../components/card-small/CardSmall';
import ChartLine from '../../../components/chart-line/ChartLine';
import CustomButton from '../../../components/custom-button/CustomButton';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import useGeneratePDF from '../../../hooks/useGeneratePDF';
import { MonitoringTabsParamList } from '../../../navigation/MonitoringTabs';
import { Colors } from '../../../themes/theme';
import { formatDateTime } from '../../../utils/dateUtils';

type Props = MaterialTopTabScreenProps<MonitoringTabsParamList, 'MonitoringBoard'>;

const MonitoringBoardScreen = ({ route }: Props) => {
  const { monitoring } = route.params;
  const markerRef = useRef<MapMarker>(null);
  const { lineData } = useMonitoringQualification();
  const { viewShotRef, loading: downloadingPDF, generatePDF } = useGeneratePDF();

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
      <ViewShot ref={viewShotRef} style={{ gap: 16, backgroundColor: Colors.NEUTRAL }}>
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

        <View style={[styles.cardContainer, styles.cardContainerGap16]}>
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <View style={{ width: 150 }}>
              <CardSmall
                left={String(monitoring.monitoringQualification)}
                right="calificación del monitoreo"
              />
            </View>
          </View>

          <ChartLine
            data={lineData}
            color={Colors.CHART_E1}
            text="calificaciones de los monitoreos"
          />
          <ChartLine data={lineData} color={Colors.CHART_B1} text="rendimiento" />

          {!downloadingPDF && (
            <View style={{ alignItems: 'center', marginTop: 16 }}>
              <CustomButton color="white" text="Descargar PDF" onPress={generatePDF} />
            </View>
          )}
        </View>
      </ViewShot>
    </ScrollView>
  );
};

export default MonitoringBoardScreen;
