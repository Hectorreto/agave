const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  propertyGuid: string;
};

export type Alert = {
  guid: string;
  createdAt: number;
  updatedAt: number;
  plantId: number;
  quadrantId: number;
  value: string;
  detailTitle: string;
  alertType: string;
};

const getAlerts = async ({ accessToken, propertyGuid }: Props) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query Alerts($findAlertsArgs: FindAlertsArgs!) {
          alerts(findAlertsArgs: $findAlertsArgs) {
            count
            data {
              guid
              created_date
              updated_date
              plant_id
              quadrant_id
              value
              detail_title
              alert_type
            }
          }
        }
      `,
      variables: {
        findAlertsArgs: {
          limit: 0,
          skip: 0,
          sort: {
            column: 'created_date',
            order: 'DESC',
          },
          filters: {
            land: {
              filterType: ':single_relation:',
              relationKey: 'guid',
              value: propertyGuid,
            },
          },
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  const data: any[] = gqlResponse.data.alerts.data;

  return data.map<Alert>((value) => ({
    guid: value.guid,
    createdAt: value.created_date,
    updatedAt: value.updated_date,
    plantId: value.plant_id,
    quadrantId: value.quadrant_id,
    value: value.value,
    detailTitle: value.detail_title,
    alertType: value.alert_type,
  }));
};

export default getAlerts;
