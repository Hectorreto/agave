export const sleep = async (seconds: number) => {
  const ms = seconds * 1000;
  return new Promise<undefined>((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });
};
