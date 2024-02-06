const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const isEmail = (value: string) => {
  return EMAIL_REGEX.test(value);
};
