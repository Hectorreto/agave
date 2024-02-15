const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  limit: number;
  skip: number;
};

const getAllMonitoring = async ({ accessToken, limit, skip }: Props) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query Query($findMonitoringArgs: FindMonitoringArgs!) {
          monitorings(findMonitoringArgs: $findMonitoringArgs) {
            data {
              guid
              created_date
              updated_date
              created_by {
                first_name
                last_name
              }
              updated_by {
                first_name
                last_name
              }
              quadrants
              plants_by_quadrant
              grade
              comments
              picture {
                path
              }
              land {
                guid
              }
            }
          }
        }
      
      `,
      variables: {
        findMonitoringArgs: {
          skip,
          limit,
          sort: {
            column: 'scheduled_date',
            order: 'DESC',
          },
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  return gqlResponse.data.monitorings.data;
};

export default getAllMonitoring;
