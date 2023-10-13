import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { Exit, findExits } from '../services/exitService';

type Props = {
  date?: Date;
  search?: string;
  createdAtSort?: 'ASC' | 'DESC';
  propertyId?: string;
};

const useExits = ({ date, search, createdAtSort, propertyId }: Props) => {
  const [data, setData] = useState<Exit[]>([]);

  useFocusEffect(
    useCallback(() => {
      findExits({
        filter: {
          createdAt: !date
            ? undefined
            : {
                lower: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                upper: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
              },
          search: !search ? undefined : `%${search}%`,
          propertyId,
        },
        sorting: {
          createdAt: createdAtSort || 'DESC',
        },
      }).then((value) => setData(value));
    }, [date, search, createdAtSort, propertyId])
  );

  return {
    data,
  };
};

export default useExits;
