import { Property } from '../../services/propertyService';

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
              updated_by {
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
              floor_analysis {
                name
                path
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
  const data: any[] = gqlResponse.data.lands.data;

  return data.map<Property>((value) => ({
    id: value.guid,
    createdAt: value.created_date,
    updatedAt: value.updated_date,
    createdBy: JSON.stringify(value.created_by),
    updatedBy: JSON.stringify(value.updated_by),
    name: value.name,
    plantingYear: value.plantation_year,
    cropType: value.crop_types.map((value: any) => value.name).join(','),
    location: JSON.stringify(value.place),
    hectareNumber: value.place.area,
    plantsPlantedNumber: value.planted_plants,
    invoice: value.folio,
    registry: value.registry_number,
    internalIdentifier: value.internal_identifier,
    boardsPerProperty: value.tables_by_property,
    active: value.enabled ? 1 : 0,

    floorAnalysis: JSON.stringify({
      name: value.floor_analysis?.name,
      url: value.floor_analysis?.path,
    }),
  }));
};

export default getAllProperties;
