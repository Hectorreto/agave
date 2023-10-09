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
