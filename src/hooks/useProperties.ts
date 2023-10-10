import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { findProperties, Property } from '../services/propertyService';

const useProperties = () => {
  const [data, setData] = useState<Property[]>([]);

  useFocusEffect(
    useCallback(() => {
      findProperties().then((value) => setData(value));
    }, [])
  );

  return {
    data,
  };
};

export default useProperties;
