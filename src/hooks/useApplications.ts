import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { Application, findApplications } from '../services/applicationService';

type Props = {
  search?: string;
};

export const MonthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const ApplicationStates: any = {
  scheduled: 'Programado',
  inProcess: 'En proceso',
  finalized: 'Finalizado',
};

const useApplications = ({ search }: Props) => {
  const [data, setData] = useState<Application[]>([]);

  const handleSearch = (result: Application[]) => {
    if (!search) {
      setData(result);
    } else {
      const s = search.toLocaleLowerCase();
      const filteredData = result.filter((value) => {
        const month = MonthNames[Number(value.applicationMonth)].toLocaleLowerCase();
        const state = ApplicationStates[value.state].toLocaleLowerCase();
        return (
          value.propertyName?.toLocaleLowerCase().includes(s) ||
          month.toLocaleLowerCase().includes(s) ||
          state.toLocaleLowerCase().includes(s)
        );
      });
      setData(filteredData);
    }
  };

  useFocusEffect(
    useCallback(() => {
      findApplications({
        sorting: {
          createdAt: 'DESC',
        },
      }).then(handleSearch);
    }, [search])
  );

  return {
    data,
  };
};

export default useApplications;
