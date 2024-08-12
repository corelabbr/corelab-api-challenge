export const nameValidate = (name: string): boolean => {
  return /^[a-zA-ZÀ-ú0-9_.-\s]+$/.test(name);
};
