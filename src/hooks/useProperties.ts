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

  const handleSearch = (result: Property[]) => {
    if (!search) {
      setData(result);
    } else {
      const s = search.toLocaleLowerCase();
      const filteredData = result.filter((value) => {
        return (
          value.name.toLocaleLowerCase().includes(s) ||
          value.registry.toLocaleLowerCase().includes(s) ||
          value.internalIdentifier.toLocaleLowerCase().includes(s)
        );
      });
      setData(filteredData);
    }
  };

  useFocusEffect(
    useCallback(() => {
      findProperties({
        filter: {
          id,
        },
        sorting: {
          createdAt: createdAtSort,
        },
      }).then(handleSearch);
    }, [id, search, createdAtSort])
  );

  return {
    data,
  };
};

export default useProperties;
