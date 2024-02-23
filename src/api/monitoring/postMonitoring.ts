import postFile from './postFile';
import { MonitoringContainer } from '../../screens/monitoring/create-monitoring/CreateMonitoringScreen';
import { Monitoring } from '../../services/monitoringService';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

type Props = {
  accessToken: string;
  monitoring: Monitoring;
};

const incidenceTypes: any = {
  low: 'LOW',
  medium: 'MEDIUM',
  high: 'HIGH',
};

const leafTypes: any = {
  wide: 'undergrowth_wide',
  narrow: 'undergrowth_narrow',
  woody: 'undergrowth_woody',
};

const qualityTypes: any = {
  good: 'GOOD',
  regular: 'REGULAR',
  bad: 'BAD',
};

const getIncidence = (value?: string) => {
  if (!value) return '';
  return incidenceTypes[value];
};

const getQuality = (value?: string) => {
  if (!value) return '';
  return qualityTypes[value];
};

const postMonitoring = async ({ accessToken, monitoring }: Props) => {
  if (!monitoring.data) return;
  const imageGuid = await postFile({ monitoring, accessToken }).catch(console.error);

  const data: MonitoringContainer[] = JSON.parse(monitoring.data);

  const quadrantsData = data.map((value) => {
    const formData = [];

    if (value.form[0]) {
      formData.push({
        type: 'PERFORMANCE',
        values: [
          {
            type: 'number',
            formControlId: 'performance',
            value: value.form[0].plantPerformanceKg,
          },
        ],
      });
    }
    if (value.form[1]) {
      formData.push({
        type: 'PLAGUE',
        values: [
          {
            type: 'text',
            formControlId: 'plague_name',
            value: value.form[1].plagueType,
          },
          {
            type: 'incidence',
            formControlId: 'plague_incidence',
            value: getIncidence(value.form[1].plagueIncidence),
          },
        ],
      });
    }
    if (value.form[2]) {
      formData.push({
        type: 'SICKNESS',
        values: [
          {
            type: 'text',
            formControlId: 'sickness_name',
            value: value.form[2].diseaseType,
          },
          {
            type: 'incidence',
            formControlId: 'sickness_incidence',
            value: getIncidence(value.form[2].diseaseIncidence),
          },
        ],
      });
    }
    if (value.form[3]) {
      formData.push({
        type: 'UNDERGROWTH',
        values: [
          {
            type: 'text',
            formControlId: 'undergrowth_name',
            value: value.form[3].undergrowthName,
          },
          {
            type: 'number',
            formControlId: leafTypes[value.form[3].undergrowthLeafType as string],
            value: value.form[3].undergrowthHeight,
          },
        ],
      });
    }
    if (value.form[4]) {
      formData.push({
        type: 'PHYTOTOXIC_DAMAGE',
        values: [
          {
            type: 'incidence',
            formControlId: 'phytotoxic_herbicides',
            value: getIncidence(value.form[4].phytotoxicDamageHerbicideIncidence),
          },
          {
            type: 'incidence',
            formControlId: 'phytotoxic_pesticides',
            value: getIncidence(value.form[4].phytotoxicDamagePesticideIncidence),
          },
          {
            type: 'incidence',
            formControlId: 'phytotoxic_salt_excess',
            value: getIncidence(value.form[4].phytotoxicDamageExcessSaltIncidence),
          },
        ],
      });
    }
    if (value.form[5]) {
      formData.push({
        type: 'ENVIROMENTAL_DAMAGE',
        values: [
          {
            type: 'incidence',
            formControlId: 'environmental_freezing',
            value: getIncidence(value.form[5].environmentalDamageFrostIncidence),
          },
          {
            type: 'incidence',
            formControlId: 'environmental_stress',
            value: getIncidence(value.form[5].environmentalDamageStressIncidence),
          },
          {
            type: 'incidence',
            formControlId: 'environmental_flood',
            value: getIncidence(value.form[5].environmentalDamageFloodIncidence),
          },
          {
            type: 'incidence',
            formControlId: 'environmental_fire',
            value: getIncidence(value.form[5].environmentalDamageFireIncidence),
          },
          {
            type: 'incidence',
            formControlId: 'environmental_hail',
            value: getIncidence(value.form[5].environmentalDamageHailIncidence),
          },
          {
            type: 'incidence',
            formControlId: 'environmental_others',
            value: getIncidence(value.form[5].environmentalDamageOtherIncidence),
          },
        ],
      });
    }
    if (value.form[6]) {
      formData.push({
        type: 'COLORIMETRY',
        values: [
          {
            type: 'quality',
            formControlId: 'colorimetry_quality',
            value: getQuality(value.form[6].colorimetryIncidence),
          },
          {
            type: 'comment',
            formControlId: 'colorimetry_comment',
            value: value.form[6].colorimetryComments,
          },
        ],
      });
    }
    if (value.form[7]) {
      formData.push({
        type: 'PHYSICAL_DAMAGE',
        values: [
          {
            type: 'text',
            formControlId: 'physical_name',
            value: value.form[7].physicalDamageType,
          },
          {
            type: 'incidence',
            formControlId: 'physical_incidence',
            value: getIncidence(value.form[7].physicalDamageIncidence),
          },
        ],
      });
    }

    return {
      quadrantId: value.quadrant - 1,
      plants: [
        {
          plantId: value.plant - 1,
          formData,
        },
      ],
    };
  });

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        mutation CreateMonitoring($createMonitoringInput: CreateMonitoringInput!) {
          createMonitoring(createMonitoringInput: $createMonitoringInput) {
            guid
            __typename
          }
        }
      `,
      variables: {
        createMonitoringInput: {
          land_guid: monitoring.propertyId,
          plants_by_quadrant: Number(monitoring.plantsPerQuadrant),
          quadrants: Number(monitoring.quadrantNumber),
          scheduled_date: Date.now(),
          quadrantsData,
          comments: monitoring.comments,
          picture_guid: imageGuid,
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  return gqlResponse.data.createMonitoring.guid;
};

export default postMonitoring;
