export const getLocalStorageItem = (key: string) => {
  const localStorageValue = localStorage.getItem(key);
  if (!localStorageValue) return null;
  return JSON.parse(localStorageValue);
};

export const setLocalStorageItem = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value));
  return;
};
