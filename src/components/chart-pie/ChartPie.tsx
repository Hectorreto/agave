import { Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import { Colors } from '../../themes/theme';

const getColor = (index: number, total: number) => {
  const chartColors = [
    Colors.CHART_A,
    Colors.CHART_B1,
    Colors.CHART_C1,
    Colors.CHART_D1,
    Colors.CHART_E1,
    Colors.CHART_A1,
    Colors.CHART_B,
    Colors.CHART_C,
    Colors.CHART_D,
    Colors.CHART_E,
  ];

  if (index < chartColors.length) {
    return chartColors[index];
  }

  const h = (236 + (index * 360) / total) % 360;
  return `hsl(${h}, 75%, 50%)`;
};

type Props = {
  data: { label: string; value: number }[];
};

const ChartPie = ({ data }: Props) => {
  return (
    <View style={{ marginBottom: 10, marginHorizontal: 20, flexDirection: 'row' }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <PieChart
          data={data.map((item, index) => ({
            value: item.value,
            color: getColor(index, data.length),
          }))}
          radius={60}
          strokeWidth={1}
          strokeColor={Colors.NEUTRAL}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', gap: 8, paddingLeft: 24 }}>
        {data.map(({ label }, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View
              style={{
                backgroundColor: getColor(index, data.length),
                width: 21,
                height: 8,
              }}
            />
            <Text style={{ color: Colors.NEUTRAL_700 }}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ChartPie;
