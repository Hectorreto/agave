import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { Application, findApplications } from '../../../services/applicationService';

export const useApplications = () => {
  const [data, setData] = useState<Application[]>([]);

  useFocusEffect(
    useCallback(() => {
      findApplications().then((value) => setData(value));
    }, [])
  );

  return {
    data,
  };
};
