import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { Asset } from 'expo-asset';
import { manipulateAsync } from 'expo-image-manipulator';
import { printAsync } from 'expo-print';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import MapView, { MapMarker, Marker } from 'react-native-maps';
import ViewShot from 'react-native-view-shot';

import styles from './styles';
import CardSmall from '../../../components/card-small/CardSmall';
import ChartLine from '../../../components/chart-line/ChartLine';
import CustomButton from '../../../components/custom-button/CustomButton';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import { MonitoringTabsParamList } from '../../../navigation/MonitoringTabs';
import { Colors } from '../../../themes/theme';
import { formatDateTime } from '../../../utils/dateUtils';

type Props = MaterialTopTabScreenProps<MonitoringTabsParamList, 'MonitoringBoard'>;

const lineData = [
  { value: 34 },
  { value: 80, label: '2018' },
  { value: 65, label: '2019' },
  { value: 110, label: '2020' },
  { value: 95, label: '2021' },
  { value: 135, label: '2022' },
  { value: 65, label: '2023' },
];

const MonitoringBoardScreen = ({ route }: Props) => {
  const { monitoring } = route.params;
  const markerRef = useRef<MapMarker>(null);
  const viewShotRef = useRef<ViewShot>(null);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    if (downloadingPDF) {
      handleDownloadPDF().catch(console.error);
    }
  }, [downloadingPDF]);

  const handleDownloadPDF = async () => {
    if (!viewShotRef.current?.capture) return;
    try {
      const uri = await viewShotRef.current.capture();
      const asset = Asset.fromURI(uri);
      const image = await manipulateAsync(asset.localUri ?? asset.uri, [], { base64: true });
      const html = `
      <html lang="es">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <title>document</title>
        </head>
        <body style="justify-content: center; align-items: center; display: flex">
          <img
            src="data:image/jpeg;base64,${image.base64}"
            alt="image"
            style="height: 99vh;"
          />
        </body>
      </html>
    `;
      await printAsync({ html });
    } catch (error) {
      console.error(error);
    } finally {
      setDownloadingPDF(false);
    }
  };

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
            <View style={{ width: 140 }}>
              <CardSmall left="92" right="calificación del monitoreo" />
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
              <CustomButton
                color="white"
                text="Descargar PDF"
                onPress={() => setDownloadingPDF(true)}
              />
            </View>
          )}
        </View>
      </ViewShot>
    </ScrollView>
  );
};

export default MonitoringBoardScreen;
