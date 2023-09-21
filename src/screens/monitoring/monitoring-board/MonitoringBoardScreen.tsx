import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';

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
      <View style={styles.map} />
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
