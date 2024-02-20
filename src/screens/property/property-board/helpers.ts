import { useMemo } from 'react';

import useProperties from '../../../hooks/useProperties';
import { Property } from '../../../services/propertyService';

const getHectareData = (data: Property[]) => {
  const years = data.map((value) => new Date(value.createdAt).getFullYear());
  const currentYear = new Date().getFullYear();
  years.push(currentYear, currentYear - 1);
  const lowerYear = Math.min(...years);
  const upperYear = Math.max(...years);

  const groups: { [key: string]: number } = {};
  for (let year = lowerYear; year <= upperYear; year++) {
    groups[year] = 0;
  }

  data.forEach((v) => {
    const year = new Date(v.createdAt).getFullYear();
    groups[year] += Number(v.hectareNumber) || 0;
  });

  return Object.entries(groups).map(([year, sum]) => ({
    label: year,
    value: sum,
  }));
};

const getPlantData = (data: Property[]) => {
  const years = data.map((value) => new Date(value.createdAt).getFullYear());
  const currentYear = new Date().getFullYear();
  years.push(currentYear, currentYear - 1);
  const lowerYear = Math.min(...years);
  const upperYear = Math.max(...years);

  const groups: { [key: string]: number } = {};
  for (let year = lowerYear; year <= upperYear; year++) {
    groups[year] = 0;
  }

  data.forEach((v) => {
    const year = new Date(v.createdAt).getFullYear();
    groups[year] += Number(v.plantsPlantedNumber) || 0;
  });

  return Object.entries(groups).map(([year, sum]) => ({
    label: year,
    value: sum,
  }));
};

export const usePropertyBarData = () => {
  const { data } = useProperties({ createdAtSort: 'ASC' });

  const hectareData = useMemo(() => {
    return getHectareData(data);
  }, [data]);

  const plantData = useMemo(() => {
    return getPlantData(data);
  }, [data]);

  return {
    hectareData,
    plantData,
  };
};
