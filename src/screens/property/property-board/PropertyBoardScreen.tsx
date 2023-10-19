import { ScrollView, Text, View } from 'react-native';
import { BarChart, PieChart, LineChart } from 'react-native-gifted-charts';

import styles from './styles';
import Eco from '../../../../assets/svg/eco.svg';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import PestControl from '../../../../assets/svg/pest_control.svg';
import Divider from '../../../components/divider/Divider';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import InputSelect from '../../../components/input-select/InputSelect';
import { Colors } from '../../../themes/theme';

const getColor = (index: number, total: number) => {
  const h = (236 + (index * 360) / total) % 360;
  return `hsl(${h}, 75%, 50%)`;
};

const PropertyBoardScreen = () => {
  const barData = [
    { value: 38, label: '2018' },
    { value: 58, label: '2019' },
    { value: 88, label: '2020' },
    { value: 58, label: '2021' },
    { value: 24, label: '2022' },
    { value: 52, label: '2023' },
  ];

  const pieData = [
    { value: 25 },
    { value: 25 },
    { value: 25 },
    { value: 25 },
    { value: 25 },
    { value: 25 },
    { value: 25 },
    { value: 25 },
    { value: 25 },
  ];

  const lineData = [
    { value: 34 },
    { value: 80, label: '2018' },
    { value: 65, label: '2019' },
    { value: 110, label: '2020' },
    { value: 95, label: '2021' },
    { value: 135, label: '2022' },
    { value: 65, label: '2023' },
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

      <View style={[styles.cardContainer, styles.cardContainerGap16]}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>Cultivos</Text>
        </View>
        <View style={{ marginBottom: 10, marginHorizontal: 20, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <PieChart
              data={pieData.map((item, index) => ({
                value: item.value,
                color: getColor(index, pieData.length),
              }))}
              radius={60}
              strokeWidth={1}
              strokeColor={Colors.NEUTRAL}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', gap: 8, paddingLeft: 24 }}>
            {pieData.map((_value, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View
                  style={{
                    backgroundColor: getColor(index, pieData.length),
                    width: 21,
                    height: 8,
                  }}
                />
                <Text style={{ color: Colors.NEUTRAL_700 }}>Cultivo {index + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ marginHorizontal: 24 }}>
          <Divider />
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={{ width: 200 }}>
            <InputSelect
              placeholder="Tipo de cultivo"
              value=""
              items={[{ label: '1', value: '1' }]}
              onChange={() => {}}
              iconLeft={<FilterAlt style={styles.leftIcon} />}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          <View style={[styles.cardDataInnerContainer, { width: 140 }]}>
            <Text style={styles.cardDataLeftText}>92</Text>
            <Text style={styles.cardDataRightText}>calificación promedio</Text>
          </View>
          <View style={[styles.cardDataInnerContainer, { width: 140 }]}>
            <Text style={styles.cardDataLeftText}>84</Text>
            <Text style={styles.cardDataRightText}>kg de perso promedio</Text>
          </View>
          <View style={[styles.cardDataInnerContainer, { width: 140 }]}>
            <Text style={styles.cardDataLeftText}>13%</Text>
            <Text style={styles.cardDataRightText}>de maleza</Text>
          </View>
        </View>

        <View style={{ marginTop: 25 }}>
          <View style={{ alignItems: 'center' }}>
            <View>
              <LineChart
                data={lineData}
                color={Colors.CHART_E1}
                thickness={2}
                hideDataPoints
                initialSpacing={0}
                endSpacing={0}
                spacing={40}
                yAxisColor={Colors.NEUTRAL_200}
                xAxisColor={Colors.NEUTRAL_200}
                showVerticalLines
                verticalLinesColor={Colors.NEUTRAL_200}
                noOfSections={5}
                stepHeight={20}
                rulesType="solid"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginLeft: 48,
              marginTop: 10,
            }}>
            <View
              style={{
                backgroundColor: Colors.CHART_E1,
                width: 21,
                height: 8,
              }}
            />
            <Text style={{ color: Colors.NEUTRAL_700 }}>peso promedio en kg</Text>
          </View>
        </View>

        <View style={{ marginTop: 25, marginBottom: 30 }}>
          <View style={{ alignItems: 'center' }}>
            <View>
              <LineChart
                data={lineData}
                color={Colors.CHART_B1}
                thickness={2}
                hideDataPoints
                initialSpacing={0}
                endSpacing={0}
                spacing={40}
                yAxisColor={Colors.NEUTRAL_200}
                xAxisColor={Colors.NEUTRAL_200}
                showVerticalLines
                verticalLinesColor={Colors.NEUTRAL_200}
                noOfSections={5}
                stepHeight={20}
                rulesType="solid"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginLeft: 48,
              marginTop: 10,
            }}>
            <View
              style={{
                backgroundColor: Colors.CHART_B1,
                width: 21,
                height: 8,
              }}
            />
            <Text style={{ color: Colors.NEUTRAL_700 }}>calificación promedio</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PropertyBoardScreen;
