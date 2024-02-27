export const formatDateTime = (inputDate: Date | number) => {
  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatDate = (inputDate: Date | number) => {
  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatTime = (inputDate: Date | number) => {
  const date = new Date(inputDate);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const daysBetween = (time1: number, time2: number) => {
  const days1 = time1 / 1000 / 60 / 60 / 24;
  const days2 = time2 / 1000 / 60 / 60 / 24;

  const difference = Math.abs(days2 - days1);
  return Math.ceil(difference);
};
