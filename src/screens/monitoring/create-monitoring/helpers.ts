import uuid from 'react-native-uuid';

import { Monitoring } from '../../../services/monitoringService';

export const newMonitoring = (): Monitoring => {
  return {
    id: uuid.v4() as string,
    createdAt: 0,
    updatedAt: 0,
    createdBy: '[Usuario]',
    updatedBy: '[Usuario]',
    property: '',
    quadrantNumber: '',
    plantsPerQuadrant: '',
    quadrantQualification: '',
    monitoringQualification: '',
    imageUri: '',
    latitude: 0,
    longitude: 0,
  };
};

export const validateMonitoring = (
  monitoring: Monitoring,
  form: (Partial<Monitoring> | undefined)[]
) => {
  if (!monitoring.property) return false;
  if (!monitoring.quadrantNumber) return false;
  if (!monitoring.plantsPerQuadrant) return false;

  if (!monitoring.quadrantQualification) return false;
  if (!monitoring.monitoringQualification) return false;
  if (!monitoring.imageUri) return false;

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
    if (!form[7].physicalDamageLeafType) return false;
  }

  return true;
};
