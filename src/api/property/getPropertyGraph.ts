const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  propertyGuid: string;
  dashboardType: 'PLANTS' | 'ACRES' | 'CROPS' | 'GRADES' | 'AVG_WEIGHT';
};

export type GraphData = {
  indicators: {
    indicatorId: string;
    value: number;
  }[];
  xAxisLabels: string[];
  yAxisLabels: string[];
  yAxisValues: number[];
};

const getPropertyGraph = async ({ accessToken, propertyGuid, dashboardType }: Props) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query Graph($getDashboardInput: GetDashboardInput!) {
          dashboard(getDashboardInput: $getDashboardInput) {
            dashboardData {
              indicators {
                indicatorId
                value
              }
              xAxisLabels
              yAxisLabels
              yAxisValues
            }
          }
        }
      `,
      variables: {
        getDashboardInput: {
          land_guid: propertyGuid,
          dashboard_type: dashboardType,
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  const data = gqlResponse.data.dashboard.dashboardData;
  const indicators: any[] = data.indicators;

  const result: GraphData = {
    indicators: indicators.map((value) => ({
      indicatorId: value.indicatorId,
      value: value.value,
    })),
    xAxisLabels: data.xAxisLabels,
    yAxisLabels: data.yAxisLabels,
    yAxisValues: data.yAxisValues,
  };

  return result;
};

export default getPropertyGraph;
