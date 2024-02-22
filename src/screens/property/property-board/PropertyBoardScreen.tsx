import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { usePropertyBarData } from './helpers';
import styles from './styles';
// import Eco from '../../../../assets/svg/eco.svg';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
// import PestControl from '../../../../assets/svg/pest_control.svg';
import CardSmall from '../../../components/card-small/CardSmall';
import ChartBar from '../../../components/chart-bar/ChartBar';
import ChartLine from '../../../components/chart-line/ChartLine';
import ChartPie from '../../../components/chart-pie/ChartPie';
import Divider from '../../../components/divider/Divider';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import InputSelectMultiple from '../../../components/input-select-multiple/InputSelectMultiple';
import { PropertyTabsParamList } from '../../../navigation/PropertyTabs';
import { Colors } from '../../../themes/theme';
import { formatNumber } from '../../../utils/numberUtils';

type Props = MaterialTopTabScreenProps<PropertyTabsParamList, 'PropertyBoard'>;

const PropertyBoardScreen = ({ route }: Props) => {
  const { property } = route.params;
  const { hectareData, plantData } = usePropertyBarData();
  const cropTypes = property.cropType.split(',');
  const [cropTypeFilter, setCropTypeFilter] = useState<string[]>([]);

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
          // { label: 'Salidas de plantas', screen: 'PropertyPlantExits' },
        ]}
        active="PropertyBoard"
      />
      {/* <View style={styles.indicatorsContainer}>
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
      </View> */}

      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>Hectáreas</Text>
        </View>
        <View style={styles.cardDataContainer}>
          <CardSmall left={formatNumber(property.hectareNumber)} right="hectáreas totales" />
        </View>
        <ChartBar data={hectareData} frontColor={Colors.CHART_C} borderColor={Colors.CHART_C1} />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>Plantas</Text>
        </View>
        <View style={styles.cardDataContainer}>
          <CardSmall left={formatNumber(property.plantsPlantedNumber)} right="plantas totales" />
        </View>
        <ChartBar data={plantData} frontColor={Colors.CHART_D} borderColor={Colors.CHART_D1} />
      </View>

      <View style={[styles.cardContainer, styles.cardContainerGap16, { paddingBottom: 30 }]}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>Cultivos</Text>
        </View>
        <ChartPie
          data={cropTypes.map((value) => ({
            label: value,
            value: 1,
          }))}
        />

        <View style={{ marginHorizontal: 24 }}>
          <Divider />
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={{ width: 200 }}>
            <InputSelectMultiple
              placeholder="Tipo de cultivo"
              values={cropTypeFilter}
              onChange={setCropTypeFilter}
              items={cropTypes.map((value) => ({
                label: value,
                value,
              }))}
              iconLeft={<FilterAlt style={styles.leftIcon} />}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          <View style={{ minWidth: 140 }}>
            <CardSmall left="99.99" right={'calificación\npromedio'} />
          </View>
          <View style={{ minWidth: 140 }}>
            <CardSmall left="99.99" right={'kg de peso\npromedio'} />
          </View>
          <View style={{ minWidth: 140 }}>
            <CardSmall left="0%" right="de maleza" />
          </View>
        </View>

        <ChartLine data={lineData} color={Colors.CHART_E1} text="peso promedio en kg" />
        <ChartLine data={lineData} color={Colors.CHART_B1} text="calificación promedio" />
      </View>
    </ScrollView>
  );
};

export default PropertyBoardScreen;
