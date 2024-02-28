export const range = (start: number, end: number, step = 1) => {
  const values = [];
  for (let i = start; i < end; i += step) {
    values.push(i);
  }
  return values;
};

export const sum = (values: number[]) => {
  let result = 0;
  for (const value of values) {
    result += value;
  }
  return result;
};

export const zip = <T, U>(list1: T[], list2: U[]) => {
  const length = Math.max(list1.length, list2.length);
  const result: [T, U][] = [];

  for (let i = 0; i < length; i++) {
    result[i] = [list1[i], list2[i]];
  }

  return result;
};

export const parseArray = (value: string) => {
  try {
    const result = JSON.parse(value);
    if (!Array.isArray(result)) return [];
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};