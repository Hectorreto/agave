import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { Application, findApplications } from '../services/applicationService';

type Props = {
  search?: string;
};

export const useApplications = ({ search }: Props) => {
  const [data, setData] = useState<Application[]>([]);

  useFocusEffect(
    useCallback(() => {
      findApplications({
        filter: {
          property: !search ? undefined : `%${search}%`,
        },
      }).then((value) => setData(value));
    }, [search])
  );

  return {
    data,
  };
};
