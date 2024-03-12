// working with default email input type pattern
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#pattern
export const checkEmailPattern = (val: string) => {
  const pattern =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  return pattern.test(val);
};
