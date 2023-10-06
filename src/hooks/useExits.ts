import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { Exit, findExits } from '../services/exitService';

type Props = {
  date?: Date;
  search: string;
  createdAtSort: 'ASC' | 'DESC';
};

export const useExits = ({ date, search, createdAtSort }: Props) => {
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
          property: !search ? undefined : `%${search}%`,
          type: !search ? undefined : `%${search}%`,
          plantCount: !search ? undefined : `%${search}%`,
        },
        sorting: {
          createdAt: createdAtSort,
        },
      }).then((value) => setData(value));
    }, [date, search, createdAtSort])
  );

  return {
    data,
  };
};
