export const passwordValidate = (password: string): boolean => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/.test(
    password,
  );
};
