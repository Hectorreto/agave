export const formatNumber = (value: string | number) => {
  const number = Number(value);
  const rounded = number.toFixed(2);
  const withoutDecimals = Number(rounded);
  return String(withoutDecimals);
};
