import { ScrollView, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import styles from './styles';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import { GUADALAJARA_REGION } from '../../../utils/constants';

const MonitoringBoardScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderTabIndicator
        items={[
          { label: 'Tablero', screen: 'MonitoringBoard' },
          { label: 'Información general', screen: 'MonitoringGeneralInfo' },
        ]}
        active="MonitoringBoard"
      />
      <MapView style={styles.map} initialRegion={GUADALAJARA_REGION}>
        <Marker
          coordinate={{
            latitude: 20.6739329,
            longitude: -103.4178149,
          }}
          title="Marker Title 1"
          description="Marker Description 1"
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
