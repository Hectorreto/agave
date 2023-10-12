import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { findProperties, Property } from '../services/propertyService';

type Props = {
  id?: string;
  search?: string;
};

const useProperties = ({ id, search }: Props) => {
  const [data, setData] = useState<Property[]>([]);

  useFocusEffect(
    useCallback(() => {
      findProperties({
        filter: {
          id,
          name: !search ? undefined : `%${search}%`,
        },
      }).then((value) => setData(value));
    }, [id, search])
  );

  return {
    data,
  };
};

export default useProperties;
