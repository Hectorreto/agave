import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { findProperties, Property } from '../services/propertyService';

type Props = {
  id?: string;
  search?: string;
  createdAtSort?: 'ASC' | 'DESC';
};

const useProperties = ({ id, search, createdAtSort }: Props) => {
  const [data, setData] = useState<Property[]>([]);

  useFocusEffect(
    useCallback(() => {
      findProperties({
        filter: {
          id,
          search: !search ? undefined : `%${search}%`,
        },
        sorting: {
          createdAt: createdAtSort,
        },
      }).then((value) => setData(value));
    }, [id, search, createdAtSort])
  );

  return {
    data,
  };
};

export default useProperties;
