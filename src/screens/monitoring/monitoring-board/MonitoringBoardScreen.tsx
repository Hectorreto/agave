import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ViewShot from 'react-native-view-shot';

import { useMonitoringLineData } from './helpers';
import styles from './styles';
import CardSmall from '../../../components/card-small/CardSmall';
import ChartLine from '../../../components/chart-line/ChartLine';
import CustomButton from '../../../components/custom-button/CustomButton';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import useGeneratePDF from '../../../hooks/useGeneratePDF';
import useProperties from '../../../hooks/useProperties';
import { MonitoringTabsParamList } from '../../../navigation/MonitoringTabs';
import { Colors } from '../../../themes/theme';
import { formatDateTime } from '../../../utils/dateUtils';
import { formatNumber } from '../../../utils/numberUtils';

type Props = MaterialTopTabScreenProps<MonitoringTabsParamList, 'MonitoringBoard'>;

const MonitoringBoardScreen = ({ route }: Props) => {
  const { monitoring } = route.params;
  const markerRef = useRef<MapMarker>(null);
  const { lineData1, lineData2 } = useMonitoringLineData();
  const { viewShotRef, loading: downloadingPDF, generatePDF } = useGeneratePDF();
  const { data: properties } = useProperties({ id: monitoring.propertyId });
  const property = properties[0];

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
          provider={PROVIDER_GOOGLE}
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
            title={property?.name}
            description={formatDateTime(monitoring.createdAt)}
          />
        </MapView>

        <View style={[styles.cardContainer, styles.cardContainerGap16]}>
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <CardSmall
              left={formatNumber(monitoring.monitoringQualification)}
              right={'calificación\ndel monitoreo'}
            />
          </View>

          <ChartLine
            data={lineData1}
            color={Colors.CHART_E1}
            text="calificaciones de los monitoreos"
          />
          <ChartLine data={lineData2} color={Colors.CHART_B1} text="rendimiento" />

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
