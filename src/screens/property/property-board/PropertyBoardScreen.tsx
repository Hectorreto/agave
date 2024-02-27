import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import getAlerts, { Alert } from '../../../api/property/getAlerts';
import getPropertyGraph, { GraphData } from '../../../api/property/getPropertyGraph';
import CardAlert from '../../../components/card-alert/CardAlert';
import CardSmall from '../../../components/card-small/CardSmall';
import ChartBar from '../../../components/chart-bar/ChartBar';
import ChartLine from '../../../components/chart-line/ChartLine';
import ChartPie from '../../../components/chart-pie/ChartPie';
import Divider from '../../../components/divider/Divider';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import InputSelectMultiple from '../../../components/input-select-multiple/InputSelectMultiple';
import { AuthContext } from '../../../contexts/notification-context/AuthContext';
import { PropertyTabsParamList } from '../../../navigation/PropertyTabs';
import { Colors } from '../../../themes/theme';
import { formatNumber, zip } from '../../../utils/numberUtils';

type Props = MaterialTopTabScreenProps<PropertyTabsParamList, 'PropertyBoard'>;

const PropertyBoardScreen = ({ route }: Props) => {
  const { accessToken } = useContext(AuthContext);
  const propertyGuid = route.params.property.guid;

  const { property } = route.params;
  const cropTypes = property.cropType.split(',');
  const [cropTypeFilter, setCropTypeFilter] = useState<string[]>([]);

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [plantData, setPlantData] = useState<GraphData>();
  const [hectareData, setHectareData] = useState<GraphData>();
  const [cropData, setCropData] = useState<GraphData>();
  const [gradesData, setGradesData] = useState<GraphData>();
  const [weightData, setWeightData] = useState<GraphData>();

  useEffect(() => {
    getAlerts({ accessToken, propertyGuid })
      .then((data) => setAlerts(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getPropertyGraph({ accessToken, propertyGuid, dashboardType: 'PLANTS' })
      .then((data) => setPlantData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getPropertyGraph({ accessToken, propertyGuid, dashboardType: 'ACRES' })
      .then((data) => setHectareData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getPropertyGraph({ accessToken, propertyGuid, dashboardType: 'CROPS' })
      .then((data) => setCropData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getPropertyGraph({ accessToken, propertyGuid, dashboardType: 'GRADES' })
      .then((data) => setGradesData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getPropertyGraph({ accessToken, propertyGuid, dashboardType: 'AVG_WEIGHT' })
      .then((data) => setWeightData(data))
      .catch((error) => console.error(error));
  }, []);

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
      {alerts.length > 0 && (
        <View style={styles.indicatorsContainer}>
          {alerts.map((alert) => (
            <CardAlert
              key={alert.guid}
              type={alert.alertType}
              title={alert.detailTitle}
              time={alert.createdAt}
            />
          ))}
        </View>
      )}
      {hectareData && (
        <View style={styles.cardContainer}>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>Hectáreas</Text>
          </View>
          <View style={styles.cardDataContainer}>
            <CardSmall
              left={formatNumber(hectareData.indicators[0].value)}
              right="hectáreas totales"
            />
          </View>
          <ChartBar
            data={hectareData.yAxisValues.map((value) => ({ value }))}
            xAxisLabels={hectareData.xAxisLabels}
            frontColor={Colors.CHART_C}
            borderColor={Colors.CHART_C1}
          />
        </View>
      )}
      {plantData && (
        <View style={styles.cardContainer}>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>Plantas</Text>
          </View>
          <View style={styles.cardDataContainer}>
            <CardSmall left={formatNumber(plantData.indicators[0].value)} right="plantas totales" />
          </View>
          <ChartBar
            data={plantData.yAxisValues.map((value) => ({ value }))}
            xAxisLabels={plantData.xAxisLabels}
            frontColor={Colors.CHART_D}
            borderColor={Colors.CHART_D1}
          />
        </View>
      )}
      <View style={[styles.cardContainer, styles.cardContainerGap16, { paddingBottom: 30 }]}>
        {cropData && (
          <>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>Cultivos</Text>
            </View>
            <ChartPie
              data={zip(cropData.xAxisLabels, cropData.yAxisValues).map(([label, value]) => ({
                label,
                value,
              }))}
            />
          </>
        )}

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

        {weightData && (
          <ChartLine
            data={weightData.yAxisValues.map((value) => ({ value }))}
            xAxisLabels={weightData.xAxisLabels}
            color={Colors.CHART_E1}
            text="peso promedio en kg"
          />
        )}
        {gradesData && (
          <ChartLine
            data={gradesData.yAxisValues.map((value) => ({ value }))}
            xAxisLabels={gradesData.xAxisLabels}
            color={Colors.CHART_B1}
            text="calificación promedio"
          />
        )}
      </View>
    </ScrollView>
  );
};

export default PropertyBoardScreen;
