const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const isEmail = (value: string) => {
  return Boolean(value.match(EMAIL_REGEX));
};
