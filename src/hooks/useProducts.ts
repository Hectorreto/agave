import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { findProducts, Product } from '../services/productService';

type Props = {
  applicationId: string;
};

export const useProducts = ({ applicationId }: Props) => {
  const [data, setData] = useState<Product[]>([]);

  useFocusEffect(
    useCallback(() => {
      findProducts({
        filter: {
          applicationId,
        },
      }).then((value) => setData(value));
    }, [applicationId])
  );

  return {
    data,
  };
};
