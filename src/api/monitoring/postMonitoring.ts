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
  const formData = [];
  if (monitoring.plantPerformanceKg) {
    formData.push({
      type: 'PERFORMANCE',
      values: [
        {
          type: 'number',
          formControlId: 'performance',
          value: monitoring.plantPerformanceKg,
        },
      ],
    });
  }
  if (monitoring.plagueType) {
    formData.push({
      type: 'PLAGUE',
      values: [
        {
          type: 'text',
          formControlId: 'plague_name',
          value: monitoring.plagueType,
        },
        {
          type: 'incidence',
          formControlId: 'plague_incidence',
          value: getIncidence(monitoring.plagueIncidence),
        },
      ],
    });
  }
  if (monitoring.diseaseType) {
    formData.push({
      type: 'SICKNESS',
      values: [
        {
          type: 'text',
          formControlId: 'sickness_name',
          value: monitoring.diseaseType,
        },
        {
          type: 'incidence',
          formControlId: 'sickness_incidence',
          value: getIncidence(monitoring.diseaseIncidence),
        },
      ],
    });
  }
  if (
    monitoring.undergrowthName &&
    monitoring.undergrowthLeafType &&
    monitoring.undergrowthHeight
  ) {
    formData.push({
      type: 'UNDERGROWTH',
      values: [
        {
          type: 'text',
          formControlId: 'undergrowth_name',
          value: monitoring.undergrowthName,
        },
        {
          type: 'number',
          formControlId: leafTypes[monitoring.undergrowthLeafType],
          value: monitoring.undergrowthHeight,
        },
      ],
    });
  }
  if (
    monitoring.phytotoxicDamageHerbicideIncidence ||
    monitoring.phytotoxicDamagePesticideIncidence ||
    monitoring.phytotoxicDamageExcessSaltIncidence
  ) {
    formData.push({
      type: 'PHYTOTOXIC_DAMAGE',
      values: [
        {
          type: 'incidence',
          formControlId: 'phytotoxic_herbicides',
          value: getIncidence(monitoring.phytotoxicDamageHerbicideIncidence),
        },
        {
          type: 'incidence',
          formControlId: 'phytotoxic_pesticides',
          value: getIncidence(monitoring.phytotoxicDamagePesticideIncidence),
        },
        {
          type: 'incidence',
          formControlId: 'phytotoxic_salt_excess',
          value: getIncidence(monitoring.phytotoxicDamageExcessSaltIncidence),
        },
      ],
    });
  }
  if (
    monitoring.environmentalDamageFrostIncidence ||
    monitoring.environmentalDamageStressIncidence ||
    monitoring.environmentalDamageFloodIncidence ||
    monitoring.environmentalDamageFireIncidence ||
    monitoring.environmentalDamageHailIncidence ||
    monitoring.environmentalDamageOtherIncidence
  ) {
    formData.push({
      type: 'ENVIROMENTAL_DAMAGE',
      values: [
        {
          type: 'incidence',
          formControlId: 'environmental_freezing',
          value: getIncidence(monitoring.environmentalDamageFrostIncidence),
        },
        {
          type: 'incidence',
          formControlId: 'environmental_stress',
          value: getIncidence(monitoring.environmentalDamageStressIncidence),
        },
        {
          type: 'incidence',
          formControlId: 'environmental_flood',
          value: getIncidence(monitoring.environmentalDamageFloodIncidence),
        },
        {
          type: 'incidence',
          formControlId: 'environmental_fire',
          value: getIncidence(monitoring.environmentalDamageFireIncidence),
        },
        {
          type: 'incidence',
          formControlId: 'environmental_hail',
          value: getIncidence(monitoring.environmentalDamageHailIncidence),
        },
        {
          type: 'incidence',
          formControlId: 'environmental_others',
          value: getIncidence(monitoring.environmentalDamageOtherIncidence),
        },
      ],
    });
  }
  if (monitoring.colorimetryIncidence || monitoring.colorimetryComments) {
    formData.push({
      type: 'COLORIMETRY',
      values: [
        {
          type: 'quality',
          formControlId: 'colorimetry_quality',
          value: getQuality(monitoring.colorimetryIncidence),
        },
        {
          type: 'comment',
          formControlId: 'colorimetry_comment',
          value: monitoring.colorimetryComments,
        },
      ],
    });
  }
  if (monitoring.physicalDamageType || monitoring.physicalDamageIncidence) {
    formData.push({
      type: 'PHYSICAL_DAMAGE',
      values: [
        {
          type: 'text',
          formControlId: 'physical_name',
          value: monitoring.physicalDamageType,
        },
        {
          type: 'incidence',
          formControlId: 'physical_incidence',
          value: getIncidence(monitoring.physicalDamageIncidence),
        },
      ],
    });
  }

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
          quadrantsData: [
            {
              quadrantId: 0,
              plants: [
                {
                  plantId: 0,
                  formData,
                },
              ],
            },
          ],
        },
      },
    }),
  });
  const gqlResponse = await response.json();
  return gqlResponse.data.createMonitoring.guid;
};

export default postMonitoring;
