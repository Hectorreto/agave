import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { Colors } from '../../themes/theme';

type Props = {
  data: { value: number }[];
  frontColor: string;
  borderColor: string;
  xAxisLabels: string[];
};

const ChartBar = ({ data, frontColor, borderColor, xAxisLabels }: Props) => {
  return (
    <View style={{ marginLeft: 20, marginTop: 30, marginBottom: 40 }}>
      <BarChart
        xAxisLabelTexts={xAxisLabels}
        data={data}
        frontColor={frontColor}
        barWidth={13.69}
        barStyle={{
          borderWidth: 2,
          borderRadius: 2,
          borderColor,
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
  );
};

export default ChartBar;
