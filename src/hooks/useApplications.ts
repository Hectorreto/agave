import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { Application, findApplications } from '../services/applicationService';

type Props = {
  search?: string;
};

const useApplications = ({ search }: Props) => {
  const [data, setData] = useState<Application[]>([]);

  useFocusEffect(
    useCallback(() => {
      findApplications({
        filter: {
          search: !search ? undefined : `%${search}%`,
        },
        sorting: {
          createdAt: 'DESC',
        },
      }).then((value) => setData(value));
    }, [search])
  );

  return {
    data,
  };
};

export default useApplications;
