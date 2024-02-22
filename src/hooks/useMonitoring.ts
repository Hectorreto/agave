import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { findMonitoring, Monitoring } from '../services/monitoringService';

type Props = {
  id?: string;
  date?: Date;
  search?: string;
  createdAtSort?: 'ASC' | 'DESC';
};

const useMonitoring = ({ id, date, search, createdAtSort }: Props) => {
  const [data, setData] = useState<Monitoring[]>([]);

  useFocusEffect(
    useCallback(() => {
      findMonitoring({
        filter: {
          id,
          createdAt: !date
            ? undefined
            : {
                lower: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                upper: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
              },
          search: !search ? undefined : `%${search}%`,
        },
        sorting: {
          createdAt: createdAtSort,
        },
      }).then((value) => setData(value));
    }, [id, date, search, createdAtSort])
  );

  return {
    data,
  };
};

export default useMonitoring;
