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

  const hectareTotal = useMemo(() => {
    let sum = 0;
    data.forEach((v) => {
      sum += Number(v.hectareNumber) || 0;
    });
    return sum;
  }, [data]);

  const plantData = useMemo(() => {
    return getPlantData(data);
  }, [data]);

  const plantTotal = useMemo(() => {
    let sum = 0;
    data.forEach((v) => {
      sum += Number(v.plantsPlantedNumber) || 0;
    });
    return sum;
  }, [data]);

  return {
    hectareData,
    hectareTotal,
    plantData,
    plantTotal,
  };
};

export const usePropertyPieData = () => {
  const { data } = useProperties({ createdAtSort: 'ASC' });

  const cropData = useMemo(() => {
    const types = data.map((v) => v.cropType);
    const count: { [key: string]: number } = {};
    types.forEach((type) => {
      if (!count[type]) count[type] = 0;
      count[type]++;
    });
    return Object.entries(count).map(([year, cnt]) => ({
      label: year,
      value: cnt,
    }));
  }, [data]);

  return {
    cropData,
  };
};
