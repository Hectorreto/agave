import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import Eco from '../../../../assets/svg/eco.svg';
import PestControl from '../../../../assets/svg/pest_control.svg';
import PropertyTabIndicator from '../../../components/property-tab-indicator/PropertyTabIndicator';

const PropertyBoardScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PropertyTabIndicator active={1} />
      <View style={styles.indicatorsContainer}>
        <View style={styles.indicator}>
          <View style={styles.indicatorIcon}>
            <PestControl />
          </View>
          <View>
            <Text style={styles.indicatorText1}>Plaga en Tabla A1</Text>
            <Text style={styles.indicatorText2}>en los últimos 30 días</Text>
          </View>
        </View>
        <View style={styles.indicator}>
          <View style={styles.indicatorIcon}>
            <Eco />
          </View>
          <View>
            <Text style={styles.indicatorText1}>Maleza en Tabla C</Text>
            <Text style={styles.indicatorText2}>en los últimos 30 días</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>Hectáreas</Text>
        </View>
        <View style={styles.cardDataContainer}>
          <View style={styles.cardDataInnerContainer}>
            <Text style={styles.cardDataLeftText}>3,557</Text>
            <Text style={styles.cardDataRightText}>hectáreas totales</Text>
          </View>
        </View>
        <View />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>Plantas</Text>
        </View>
        <View style={styles.cardDataContainer}>
          <View style={styles.cardDataInnerContainer}>
            <Text style={styles.cardDataLeftText}>12,759</Text>
            <Text style={styles.cardDataRightText}>plantas totales</Text>
          </View>
        </View>
        <View />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>Cultivos</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PropertyBoardScreen;
