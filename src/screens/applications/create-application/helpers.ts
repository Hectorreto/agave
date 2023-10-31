import uuid from 'react-native-uuid';

import { Application } from '../../../services/applicationService';

export const newApplication = (): Application => {
  return {
    id: uuid.v4() as string,
    createdAt: 0,
    updatedAt: 0,
    createdBy: '[Usuario]',
    updatedBy: '[Usuario]',
    applicationMonth: '',
    state: 'inProcess',
    scheduledDate: 0,
    concept: '',
    containerAmount: '',
    notes: '',
    videoUri: '',
    propertyId: '',
  };
};
