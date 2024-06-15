export const getSessionStorage = (key, defaultValue) => {
  const saved = sessionStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};
