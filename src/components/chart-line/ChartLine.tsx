import { Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { Colors } from '../../themes/theme';

type Props = {
  data: any[];
  color: string;
  text: string;
};

const ChartLine = ({ data, color, text }: Props) => {
  return (
    <View style={{ marginTop: 25 }}>
      <View style={{ alignItems: 'center' }}>
        <View>
          <LineChart
            data={data}
            color={color}
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
            backgroundColor: color,
            width: 21,
            height: 8,
          }}
        />
        <Text style={{ color: Colors.NEUTRAL_700 }}>{text}</Text>
      </View>
    </View>
  );
};

export default ChartLine;
