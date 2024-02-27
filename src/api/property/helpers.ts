export type GraphData = {
  indicators: {
    indicatorId: string;
    value: number;
  }[];
  xAxisLabels: string[];
  yAxisLabels: string[];
  yAxisValues: number[];
};

export const mapToGraphData = (data: any): GraphData => {
  return {
    indicators: (data.indicators as any[]).map((value) => ({
      indicatorId: value.indicatorId,
      value: value.value,
    })),
    xAxisLabels: data.xAxisLabels,
    yAxisLabels: data.yAxisLabels,
    yAxisValues: data.yAxisValues,
  };
};
