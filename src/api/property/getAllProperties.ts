const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  limit: number;
  skip: number;
};

const getAllProperties = async ({ accessToken, limit, skip }: Props) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query Lands($findLandsArgs: FindLandssArgs!) {
          lands(findLandsArgs: $findLandsArgs) {
            data {
              guid
              created_date
              updated_date
              created_by {
                first_name
                last_name
              }
              name
              plantation_year
              crop_types {
                name
                guid
              }
              place {
                center {
                  lat
                  lng
                }
                area
              }
              planted_plants
              folio
              registry_number
              internal_identifier
              tables_by_property
              enabled
            }
          }
        }
      `,
      variables: {
        findLandsArgs: {
          skip,
          limit,
          sort: {
            column: 'plantation_year',
            order: 'DESC',
          },
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  return gqlResponse.data.lands.data;
};

export default getAllProperties;
