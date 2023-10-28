import { useMemo } from 'react';

import useMonitoring from '../../../hooks/useMonitoring';
import { Monitoring } from '../../../services/monitoringService';

const getGroupsByYear = (monitoring: Monitoring[]) => {
  const byYear = new Map<number, Monitoring[]>();
  const years = monitoring.map((m) => new Date(m.createdAt).getFullYear());
  const currentYear = new Date().getFullYear();
  years.push(currentYear, currentYear - 1);

  const lowerYear = Math.min(...years);
  const upperYear = Math.max(...years);
  for (let year = lowerYear; year <= upperYear; year++) {
    byYear.set(year, []);
  }

  monitoring.forEach((m) => {
    const year = new Date(m.createdAt).getFullYear();
    byYear.get(year)?.push(m);
  });

  return byYear;
};

const getLineData1 = (groups: Map<number, Monitoring[]>) => {
  const result: { value: number; label?: number }[] = [];

  groups.forEach((group, year) => {
    if (group.length === 0) {
      result.push({ value: 0, label: year });
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

const getLineData2 = (groups: Map<number, Monitoring[]>) => {
  const result: { value: number; label?: number }[] = [];

  groups.forEach((group, year) => {
    if (group.length === 0) {
      result.push({ value: 0, label: year });
    } else {
      const values = group.map((m, index) => {
        const performance = Number(m.plantPerformanceKg) || 0;
        if (index === 0) {
          return { value: performance, label: year };
        } else {
          return { value: performance };
        }
      });
      result.push(...values);
    }
  });

  return result;
};

export const useMonitoringLineData = () => {
  const { data } = useMonitoring({ createdAtSort: 'ASC' });

  const lineData1 = useMemo(() => {
    const groups = getGroupsByYear(data);
    return getLineData1(groups);
  }, [data]);

  const lineData2 = useMemo(() => {
    const groups = getGroupsByYear(data.filter((v) => v.plantPerformanceKg !== null));
    return getLineData2(groups);
  }, [data]);

  return { lineData1, lineData2 };
};
