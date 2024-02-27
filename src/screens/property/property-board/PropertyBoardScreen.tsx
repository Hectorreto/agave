import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';

import styles from './styles';
import FilterAlt from '../../../../assets/svg/filter_alt.svg';
import getAlerts, { Alert } from '../../../api/property/getAlerts';
import getPropertyBoard1 from '../../../api/property/getPropertyBoard1';
import getPropertyBoard2 from '../../../api/property/getPropertyBoard2';
import { GraphData } from '../../../api/property/helpers';
import CardAlert from '../../../components/card-alert/CardAlert';
import CardSmall from '../../../components/card-small/CardSmall';
import ChartBar from '../../../components/chart-bar/ChartBar';
import ChartLine from '../../../components/chart-line/ChartLine';
import ChartPie from '../../../components/chart-pie/ChartPie';
import Divider from '../../../components/divider/Divider';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import InputSelect from '../../../components/input-select/InputSelect';
import { AuthContext } from '../../../contexts/notification-context/AuthContext';
import { PropertyTabsParamList } from '../../../navigation/PropertyTabs';
import { CropType } from '../../../services/monitoringService';
import { Colors } from '../../../themes/theme';
import { parseArray, zip } from '../../../utils/arrayUtils';
import { formatNumber } from '../../../utils/numberUtils';

type Props = MaterialTopTabScreenProps<PropertyTabsParamList, 'PropertyBoard'>;

const PropertyBoardScreen = ({ route }: Props) => {
  const { accessToken } = useContext(AuthContext);
  const propertyGuid = route.params.property.guid;

  const { property } = route.params;
  const cropTypes: CropType[] = parseArray(property.cropType);
  const [cropTypeFilter, setCropTypeFilter] = useState('');

  const [alerts, setAlerts] = useState<Alert[]>([]);

  const [graphData1, setGraphData1] = useState<{
    plants: GraphData;
    acres: GraphData;
    crops: GraphData;
  }>();
  const [graphData2, setGraphData2] = useState<{
    grades: GraphData;
    avgWeight: GraphData;
    undergrowth: GraphData;
  }>();

  useEffect(() => {
    getAlerts({ accessToken, propertyGuid })
      .then((data) => setAlerts(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getPropertyBoard1({ accessToken, propertyGuid })
      .then((data) => setGraphData1(data))
      .catch((error) => console.error(error));
  }, []);

  const cacheBoard2 = useRef<any>({});
  useEffect(() => {
    const fetchData = async () => {
      return (cacheBoard2.current[cropTypeFilter] ??= getPropertyBoard2({
        accessToken,
        propertyGuid,
        cropTypeGuid: cropTypeFilter,
      }));
    };

    fetchData()
      .then((data) => setGraphData2(data))
      .catch((error) => console.error(error));
  }, [cropTypeFilter]);

  const averageGrade = graphData2?.grades?.indicators.find(
    (value) => value.indicatorId === 'AVG_GRADE'
  )?.value;

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

      {graphData1 !== undefined && !graphData2 && <ActivityIndicator size="large" />}
      {graphData1 && (
        <>
          <View style={styles.cardContainer}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>Hectáreas</Text>
            </View>
            <View style={styles.cardDataContainer}>
              <CardSmall
                left={formatNumber(graphData1.acres.indicators[0].value)}
                right="hectáreas totales"
              />
            </View>
            <ChartBar
              data={graphData1.acres.yAxisValues.map((value) => ({ value }))}
              xAxisLabels={graphData1.acres.xAxisLabels}
              frontColor={Colors.CHART_C}
              borderColor={Colors.CHART_C1}
            />
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>Plantas</Text>
            </View>
            <View style={styles.cardDataContainer}>
              <CardSmall
                left={formatNumber(graphData1.plants.indicators[0].value)}
                right="plantas totales"
              />
            </View>
            <ChartBar
              data={graphData1.plants.yAxisValues.map((value) => ({ value }))}
              xAxisLabels={graphData1.plants.xAxisLabels}
              frontColor={Colors.CHART_D}
              borderColor={Colors.CHART_D1}
            />
          </View>
        </>
      )}

      {!graphData2 && <ActivityIndicator size="large" />}
      {graphData1 && graphData2 && (
        <View style={[styles.cardContainer, styles.cardContainerGap16, { paddingBottom: 30 }]}>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>Cultivos</Text>
          </View>
          <ChartPie
            data={zip(graphData1.crops.xAxisLabels, graphData1.crops.yAxisValues).map(
              ([label, value]) => ({
                label,
                value,
              })
            )}
          />
          <View style={{ marginHorizontal: 24 }}>
            <Divider />
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 200 }}>
              <InputSelect
                onPressOut={() => setCropTypeFilter('')}
                placeholder="Tipo de cultivo"
                value={cropTypeFilter}
                onChange={setCropTypeFilter}
                items={cropTypes.map((value) => ({
                  label: value.name,
                  value: value.guid,
                }))}
                iconLeft={<FilterAlt style={styles.leftIcon} />}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: 'center',
            }}>
            <View style={{ minWidth: 140 }}>
              {averageGrade && (
                <CardSmall left={formatNumber(averageGrade)} right={'calificación\npromedio'} />
              )}
            </View>
            <View style={{ minWidth: 140 }}>
              <CardSmall
                left={formatNumber(graphData2.avgWeight.indicators[0].value)}
                right={'kg de peso\npromedio'}
              />
            </View>
            <View style={{ minWidth: 140 }}>
              <CardSmall
                left={`${formatNumber(graphData2.undergrowth.indicators[0].value)}%`}
                right="de maleza"
              />
            </View>
          </View>

          <ChartLine
            data={graphData2.avgWeight.yAxisValues.map((value) => ({ value }))}
            xAxisLabels={graphData2.avgWeight.xAxisLabels}
            color={Colors.CHART_E1}
            text="peso promedio en kg"
          />
          <ChartLine
            data={graphData2.grades.yAxisValues.map((value) => ({ value }))}
            xAxisLabels={graphData2.grades.xAxisLabels}
            color={Colors.CHART_B1}
            text="calificación promedio"
          />
        </View>
      )}
    </ScrollView>
  );
};

export default PropertyBoardScreen;
