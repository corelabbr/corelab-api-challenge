export const emailValidate = (email: string): boolean => {
  const regex = /^(?=.{8,50}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);
};
