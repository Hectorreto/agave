import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { findMonitoring, Monitoring } from '../services/monitoringService';
import { formatDate, formatTime } from '../utils/dateUtils';

type Props = {
  id?: string;
  date?: Date;
  search?: string;
  createdAtSort?: 'ASC' | 'DESC';
};

const useMonitoring = ({ id, date, search, createdAtSort }: Props) => {
  const [data, setData] = useState<Monitoring[]>([]);

  const handleSearch = (result: Monitoring[]) => {
    if (!search) {
      setData(result);
    } else {
      const s = search.toLocaleLowerCase();
      const filteredData = result.filter((value) => {
        return (
          value.propertyName?.toLocaleLowerCase().includes(s) ||
          formatDate(value.createdAt).includes(s) ||
          formatTime(value.createdAt).includes(s)
        );
      });
      setData(filteredData);
    }
  };

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
        },
        sorting: {
          createdAt: createdAtSort,
        },
      }).then(handleSearch);
    }, [id, date, search, createdAtSort])
  );

  return {
    data,
  };
};

export default useMonitoring;
