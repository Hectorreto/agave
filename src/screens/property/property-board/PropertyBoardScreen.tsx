import { ScrollView, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import styles from './styles';
import Eco from '../../../../assets/svg/eco.svg';
import PestControl from '../../../../assets/svg/pest_control.svg';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import { Colors } from '../../../themes/theme';

const PropertyBoardScreen = () => {
  const barData = [
    { value: 38, label: '2018' },
    { value: 58, label: '2019' },
    { value: 88, label: '2020' },
    { value: 58, label: '2021' },
    { value: 24, label: '2022' },
    { value: 52, label: '2023' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderTabIndicator
        items={[
          { label: 'Tablero', screen: 'PropertyBoard' },
          { label: 'Información general', screen: 'PropertyGeneralInfo' },
          { label: 'Salidas de plantas', screen: 'PropertyPlantExits' },
        ]}
        active="PropertyBoard"
      />
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
        <View style={{ marginLeft: 20, marginTop: 30, marginBottom: 40 }}>
          <BarChart
            data={barData}
            frontColor={Colors.CHART_C}
            barWidth={13.69}
            barStyle={{
              borderWidth: 2,
              borderRadius: 2,
              borderColor: Colors.CHART_C1,
            }}
            disablePress
            rulesType="solid"
            rulesColor={Colors.NEUTRAL_200}
            spacing={13.69 * 2}
            initialSpacing={13.69}
            endSpacing={13.69}
            noOfSections={5}
            stepHeight={20}
            xAxisColor={Colors.NEUTRAL_200}
            yAxisColor={Colors.NEUTRAL_200}
          />
        </View>
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
        <View style={{ marginLeft: 20, marginTop: 30, marginBottom: 40 }}>
          <BarChart
            data={barData}
            frontColor={Colors.CHART_D}
            barWidth={13.69}
            barStyle={{
              borderWidth: 2,
              borderRadius: 2,
              borderColor: Colors.CHART_D1,
            }}
            disablePress
            rulesType="solid"
            rulesColor={Colors.NEUTRAL_200}
            spacing={13.69 * 2}
            initialSpacing={13.69}
            endSpacing={13.69}
            noOfSections={5}
            stepHeight={20}
            xAxisColor={Colors.NEUTRAL_200}
            yAxisColor={Colors.NEUTRAL_200}
          />
        </View>
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
