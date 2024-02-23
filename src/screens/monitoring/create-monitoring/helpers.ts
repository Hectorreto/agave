import uuid from 'react-native-uuid';

import { Monitoring } from '../../../services/monitoringService';

export const newMonitoring = (): Monitoring => {
  return {
    id: uuid.v4() as string,
    createdAt: 0,
    updatedAt: 0,
    createdBy: '[Usuario]',
    updatedBy: '[Usuario]',
    quadrantNumber: '',
    plantsPerQuadrant: '',
    quadrantQualification: 0,
    monitoringQualification: 0,
    imageUri: '',
    latitude: 0,
    longitude: 0,
    propertyId: '',
  };
};

export const validateMonitoring = (
  monitoring: Monitoring,
  form: (Partial<Monitoring> | undefined)[]
) => {
  if (!monitoring.propertyId) return false;
  if (!monitoring.quadrantNumber) return false;
  if (!monitoring.plantsPerQuadrant) return false;

  if (form[0]) {
    if (!form[0].plantPerformanceKg) return false;
  }

  if (form[1]) {
    if (!form[1].plagueType) return false;
    if (!form[1].plagueIncidence) return false;
  }

  if (form[2]) {
    if (!form[2].diseaseType) return false;
    if (!form[2].diseaseIncidence) return false;
  }

  if (form[3]) {
    if (!form[3].undergrowthName) return false;
    if (!form[3].undergrowthLeafType) return false;
    if (!form[3].undergrowthHeight) return false;
  }

  if (form[4]) {
    if (!form[4].phytotoxicDamageHerbicideIncidence) return false;
    if (!form[4].phytotoxicDamagePesticideIncidence) return false;
    if (!form[4].phytotoxicDamageExcessSaltIncidence) return false;
  }

  if (form[5]) {
    if (!form[5].environmentalDamageFrostIncidence) return false;
    if (!form[5].environmentalDamageStressIncidence) return false;
    if (!form[5].environmentalDamageFloodIncidence) return false;
    if (!form[5].environmentalDamageFireIncidence) return false;
    if (!form[5].environmentalDamageHailIncidence) return false;
    if (!form[5].environmentalDamageOtherIncidence) return false;
  }

  if (form[6]) {
    if (!form[6].colorimetryIncidence) return false;
    if (!form[6].colorimetryComments) return false;
  }

  if (form[7]) {
    if (!form[7].physicalDamageType) return false;
    if (!form[7].physicalDamageIncidence) return false;
  }

  return true;
};

export const getQuadrantQualification = (form: (Partial<Monitoring> | undefined)[]) => {
  let qualification = 39;

  if (form[1]) {
    if (form[1].plagueIncidence === 'low') qualification -= 1;
    if (form[1].plagueIncidence === 'medium') qualification -= 2;
    if (form[1].plagueIncidence === 'high') qualification -= 3;
  }

  if (form[2]) {
    if (form[2].diseaseIncidence === 'low') qualification -= 1;
    if (form[2].diseaseIncidence === 'medium') qualification -= 2;
    if (form[2].diseaseIncidence === 'high') qualification -= 3;
  }

  if (form[3]) {
    if (form[3].undergrowthLeafType === 'wide') qualification -= 1;
    if (form[3].undergrowthLeafType === 'narrow') qualification -= 1;
    if (form[3].undergrowthLeafType === 'woody') qualification -= 1;
  }

  if (form[4]) {
    if (form[4].phytotoxicDamageHerbicideIncidence === 'low') qualification -= 1;
    if (form[4].phytotoxicDamageHerbicideIncidence === 'medium') qualification -= 2;
    if (form[4].phytotoxicDamageHerbicideIncidence === 'high') qualification -= 3;

    if (form[4].phytotoxicDamagePesticideIncidence === 'low') qualification -= 1;
    if (form[4].phytotoxicDamagePesticideIncidence === 'medium') qualification -= 2;
    if (form[4].phytotoxicDamagePesticideIncidence === 'high') qualification -= 3;

    if (form[4].phytotoxicDamageExcessSaltIncidence === 'low') qualification -= 1;
    if (form[4].phytotoxicDamageExcessSaltIncidence === 'medium') qualification -= 2;
    if (form[4].phytotoxicDamageExcessSaltIncidence === 'high') qualification -= 3;
  }

  if (form[5]) {
    if (form[5].environmentalDamageFrostIncidence === 'low') qualification -= 1;
    if (form[5].environmentalDamageFrostIncidence === 'medium') qualification -= 2;
    if (form[5].environmentalDamageFrostIncidence === 'high') qualification -= 3;

    if (form[5].environmentalDamageStressIncidence === 'low') qualification -= 1;
    if (form[5].environmentalDamageStressIncidence === 'medium') qualification -= 2;
    if (form[5].environmentalDamageStressIncidence === 'high') qualification -= 3;

    if (form[5].environmentalDamageFloodIncidence === 'low') qualification -= 1;
    if (form[5].environmentalDamageFloodIncidence === 'medium') qualification -= 2;
    if (form[5].environmentalDamageFloodIncidence === 'high') qualification -= 3;

    if (form[5].environmentalDamageFireIncidence === 'low') qualification -= 1;
    if (form[5].environmentalDamageFireIncidence === 'medium') qualification -= 2;
    if (form[5].environmentalDamageFireIncidence === 'high') qualification -= 3;

    if (form[5].environmentalDamageHailIncidence === 'low') qualification -= 1;
    if (form[5].environmentalDamageHailIncidence === 'medium') qualification -= 2;
    if (form[5].environmentalDamageHailIncidence === 'high') qualification -= 3;

    if (form[5].environmentalDamageOtherIncidence === 'low') qualification -= 1;
    if (form[5].environmentalDamageOtherIncidence === 'medium') qualification -= 2;
    if (form[5].environmentalDamageOtherIncidence === 'high') qualification -= 3;
  }

  if (form[6]) {
    if (form[6].colorimetryIncidence === 'good') qualification -= 0;
    if (form[6].colorimetryIncidence === 'regular') qualification -= 1;
    if (form[6].colorimetryIncidence === 'bad') qualification -= 2;
  }

  if (form[7]) {
    if (form[7].physicalDamageIncidence === 'low') qualification -= 1;
    if (form[7].physicalDamageIncidence === 'medium') qualification -= 2;
    if (form[7].physicalDamageIncidence === 'high') qualification -= 3;
  }

  return {
    score: qualification,
    qualification: Number(((qualification * 100) / 39).toFixed(2)),
  };
};
