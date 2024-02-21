import { Monitoring } from '../../services/monitoringService';

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
  const data: any[] = gqlResponse.data.monitorings.data;

  return data.map<Monitoring>((value) => ({
    id: '',
    guid: value.guid,
    createdAt: value.created_date,
    updatedAt: value.updated_date,
    createdBy: JSON.stringify(value.created_by),
    updatedBy: JSON.stringify(value.updated_by),
    quadrantNumber: value.quadrants,
    plantsPerQuadrant: value.plants_by_quadrant,
    quadrantQualification: 0,
    monitoringQualification: value.grade,
    comments: value.comments,
    imageUri: value.picture?.path,
    latitude: 0,
    longitude: 0,
    propertyId: value.land?.guid,
  }));
};

export default getAllMonitoring;
