import uuid from 'react-native-uuid';

import { Application, createApplications } from '../../../services/applicationService';

export const newApplication = (): Application => {
  return {
    id: uuid.v4() as string,
    createdAt: 0,
    updatedAt: 0,
    createdBy: '',
    updatedBy: '',
    property: '',
    applicationMonth: '',
    state: 'inProcess',
    scheduledDate: 0,
    concept: '',
    containerAmount: '',
    notes: '',
  };
};

export const saveApplications = async (applications: Application[]) => {
  await createApplications(
    applications.map((application) => {
      const nowTime = new Date().getTime();
      return {
        ...application,
        createdAt: nowTime,
        updatedAt: nowTime,
        createdBy: '[Usuario]',
        updatedBy: '[Usuario]',
        state: 'inProcess',
      };
    })
  );
};
