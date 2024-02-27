import { mapToGraphData } from './helpers';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  propertyGuid: string;
};

const getPropertyBoard1 = async ({ accessToken, propertyGuid }: Props) => {
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
        ) {
          plants: dashboard(getDashboardInput: { land_guid: $landGuid dashboard_type: "PLANTS" }) {
            dashboardData { 
              indicators { indicatorId value }
              xAxisLabels yAxisLabels yAxisValues
            }
          }
          acres: dashboard(getDashboardInput: { land_guid: $landGuid dashboard_type: "ACRES" }) {
            dashboardData { 
              indicators { indicatorId value }
              xAxisLabels yAxisLabels yAxisValues
            }
          }
          crops: dashboard(getDashboardInput: { land_guid: $landGuid dashboard_type: "CROPS" }) {
            dashboardData { 
              indicators { indicatorId value }
              xAxisLabels yAxisLabels yAxisValues
            }
          }
        }
      `,
      variables: {
        landGuid: propertyGuid,
      },
    }),
  });
  const gqlResponse = await response.json();

  return {
    plants: mapToGraphData(gqlResponse.data.plants.dashboardData),
    acres: mapToGraphData(gqlResponse.data.acres.dashboardData),
    crops: mapToGraphData(gqlResponse.data.crops.dashboardData),
  };
};

export default getPropertyBoard1;
