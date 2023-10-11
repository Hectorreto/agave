import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { findProperties, Property } from '../services/propertyService';

type Props = {
  id?: string;
  search?: string;
};

const useProperties = ({ search }: Props) => {
  const [data, setData] = useState<Property[]>([]);

  useFocusEffect(
    useCallback(() => {
      findProperties({
        filter: {
          name: !search ? undefined : `%${search}%`,
        },
      }).then((value) => setData(value));
    }, [search])
  );

  return {
    data,
  };
};

export default useProperties;
