import { MonitoringContainer } from '../../screens/monitoring/create-monitoring/CreateMonitoringScreen';
import { Monitoring } from '../../services/monitoringService';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

const incidenceTypes: any = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

const qualityTypes: any = {
  good: 'GOOD',
  regular: 'REGULAR',
  bad: 'BAD',
};

const getIncidence = (value?: string) => {
  if (!value) return undefined;
  return incidenceTypes[value];
};

const getQuality = (value?: string) => {
  if (!value) return undefined;
  return qualityTypes[value];
};

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
              quadrantsData {
                grade
                quadrantId
                plants {
                  plantId
                  picture_guid
                  formData {
                    type
                    values {
                      formControlId
                      type
                      value
                    }
                  }
                }
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

  return data.map<Monitoring>((value) => {
    const monitoringContainers: MonitoringContainer[] = [];
    value.quadrantsData.map((quadrant: any) => {
      quadrant.plants.map((plant: any) => {
        const localForm = Array<Partial<Monitoring> | undefined>(8).fill(undefined);

        plant.formData.forEach((remoteForm: any) => {
          remoteForm.values.forEach((remoteValue: any) => {
            if (remoteForm.type === 'PERFORMANCE') {
              localForm[0] ??= {};
              if (remoteValue.formControlId === 'performance') {
                localForm[0].plantPerformanceKg = remoteValue.value;
              }
            }
            if (remoteForm.type === 'PLAGUE') {
              localForm[1] ??= {};
              if (remoteValue.formControlId === 'plague_name') {
                localForm[1].plagueType = remoteValue.value;
              }
              if (remoteValue.formControlId === 'plague_incidence') {
                localForm[1].plagueIncidence = getIncidence(remoteValue.value);
              }
            }
            if (remoteForm.type === 'SICKNESS') {
              localForm[2] ??= {};
              if (remoteValue.formControlId === 'sickness_name') {
                localForm[2].diseaseType = remoteValue.value;
              }
              if (remoteValue.formControlId === 'sickness_incidence') {
                localForm[2].diseaseIncidence = getIncidence(remoteValue.value);
              }
            }
            if (remoteForm.type === 'UNDERGROWTH') {
              localForm[3] ??= {};
              if (remoteValue.formControlId === 'undergrowth_name') {
                localForm[3].undergrowthName = remoteValue.value;
              }
              if (remoteValue.formControlId === 'undergrowth_wide') {
                localForm[3].undergrowthLeafType = 'wide';
                localForm[3].undergrowthHeight = remoteValue.value;
              }
              if (remoteValue.formControlId === 'undergrowth_narrow') {
                localForm[3].undergrowthLeafType = 'narrow';
                localForm[3].undergrowthHeight = remoteValue.value;
              }
              if (remoteValue.formControlId === 'undergrowth_woody') {
                localForm[3].undergrowthLeafType = 'woody';
                localForm[3].undergrowthHeight = remoteValue.value;
              }
            }
            if (remoteForm.type === 'PHYTOTOXIC_DAMAGE') {
              localForm[4] ??= {};
              if (remoteValue.formControlId === 'phytotoxic_herbicides') {
                localForm[4].phytotoxicDamageHerbicideIncidence = getIncidence(remoteValue.value);
              }
              if (remoteValue.formControlId === 'phytotoxic_pesticides') {
                localForm[4].phytotoxicDamagePesticideIncidence = getIncidence(remoteValue.value);
              }
              if (remoteValue.formControlId === 'phytotoxic_salt_excess') {
                localForm[4].phytotoxicDamageExcessSaltIncidence = getIncidence(remoteValue.value);
              }
            }
            if (remoteForm.type === 'ENVIROMENTAL_DAMAGE') {
              localForm[5] ??= {};
              if (remoteValue.formControlId === 'environmental_freezing') {
                localForm[5].environmentalDamageFrostIncidence = getIncidence(remoteValue.value);
              }
              if (remoteValue.formControlId === 'environmental_stress') {
                localForm[5].environmentalDamageStressIncidence = getIncidence(remoteValue.value);
              }
              if (remoteValue.formControlId === 'environmental_flood') {
                localForm[5].environmentalDamageFloodIncidence = getIncidence(remoteValue.value);
              }
              if (remoteValue.formControlId === 'environmental_fire') {
                localForm[5].environmentalDamageFireIncidence = getIncidence(remoteValue.value);
              }
              if (remoteValue.formControlId === 'environmental_hail') {
                localForm[5].environmentalDamageHailIncidence = getIncidence(remoteValue.value);
              }
              if (remoteValue.formControlId === 'environmental_others') {
                localForm[5].environmentalDamageOtherIncidence = getIncidence(remoteValue.value);
              }
            }
            if (remoteForm.type === 'COLORIMETRY') {
              localForm[6] ??= {};
              if (remoteValue.formControlId === 'colorimetry_quality') {
                localForm[6].colorimetryIncidence = getQuality(remoteValue.value);
              }
              if (remoteValue.formControlId === 'colorimetry_comment') {
                localForm[6].colorimetryComments = remoteValue.value;
              }
            }
            if (remoteForm.type === 'PHYSICAL_DAMAGE') {
              localForm[7] ??= {};
              if (remoteValue.formControlId === 'physical_name') {
                localForm[7].physicalDamageType = remoteValue.value;
              }
              if (remoteValue.formControlId === 'physical_incidence') {
                localForm[7].physicalDamageIncidence = getIncidence(remoteValue.value);
              }
            }
          });
        });

        monitoringContainers.push({
          quadrant: quadrant.quadrantId + 1,
          plant: plant.plantId + 1,
          form: localForm,
        });
      });
    });

    return {
      id: value.guid,
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
      data: JSON.stringify(monitoringContainers),
    };
  });
};

export default getAllMonitoring;
