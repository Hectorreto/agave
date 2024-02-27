import { mapToGraphData } from './helpers';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  propertyGuid: string;
  cropTypeGuid: string;
};

const getPropertyBoard2 = async ({ accessToken, propertyGuid, cropTypeGuid }: Props) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query PropertyBoard(
          $landGuid: String!
          $cropTypeGuid: String
        ) {
          grades: dashboard(getDashboardInput: { land_guid: $landGuid dashboard_type: "GRADES" crop_type_guid: $cropTypeGuid }) {
            dashboardData { 
              indicators { indicatorId value }
              xAxisLabels yAxisLabels yAxisValues
            }
          }
          avgWeight: dashboard(getDashboardInput: { land_guid: $landGuid dashboard_type: "AVG_WEIGHT" crop_type_guid: $cropTypeGuid }) {
            dashboardData { 
              indicators { indicatorId value }
              xAxisLabels yAxisLabels yAxisValues
            }
          }
          undergrowth: dashboard(getDashboardInput: { land_guid: $landGuid dashboard_type: "UNDERGROWTH_PERCENTAGE" crop_type_guid: $cropTypeGuid }) {
            dashboardData { 
              indicators { indicatorId value }
              xAxisLabels yAxisLabels yAxisValues
            }
          }
        }
      `,
      variables: {
        landGuid: propertyGuid,
        cropTypeGuid: cropTypeGuid || undefined,
      },
    }),
  });
  const gqlResponse = await response.json();

  return {
    grades: mapToGraphData(gqlResponse.data.grades.dashboardData),
    avgWeight: mapToGraphData(gqlResponse.data.avgWeight.dashboardData),
    undergrowth: mapToGraphData(gqlResponse.data.undergrowth.dashboardData),
  };
};

export default getPropertyBoard2;
