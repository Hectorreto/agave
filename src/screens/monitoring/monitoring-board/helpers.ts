import { useMemo } from 'react';

import useMonitoring from '../../../hooks/useMonitoring';
import { Monitoring } from '../../../services/monitoringService';

const getLineData = (monitoring: Monitoring[]) => {
  const byYear = new Map<number, Monitoring[]>();
  const years = monitoring.map((m) => new Date(m.createdAt).getFullYear());
  const currentYear = new Date().getFullYear();
  years.push(currentYear, currentYear - 5);

  const lowerYear = Math.min(...years);
  const upperYear = Math.max(...years);
  for (let year = lowerYear; year <= upperYear; year++) {
    byYear.set(year, []);
  }

  monitoring.forEach((m) => {
    const year = new Date(m.createdAt).getFullYear();
    byYear.get(year)?.push(m);
  });

  const result: { label?: number; value: number }[] = [];

  byYear.forEach((group, year) => {
    if (group.length === 0) {
      result.push({ label: year, value: 0 });
    } else {
      const values = group.map((m, index) => {
        if (index === 0) {
          return { value: m.monitoringQualification, label: year };
        } else {
          return { value: m.monitoringQualification };
        }
      });
      result.push(...values);
    }
  });

  return result;
};

export const useMonitoringQualification = () => {
  const { data } = useMonitoring({ createdAtSort: 'ASC' });

  const lineData = useMemo(() => {
    return getLineData(data);
  }, [data]);

  return { lineData };
};
