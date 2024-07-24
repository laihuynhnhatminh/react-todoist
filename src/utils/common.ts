export const isDev = () => {
  return import.meta.env.VITE_APP_BASE_API === 'development';
};
