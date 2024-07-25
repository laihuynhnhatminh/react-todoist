import { useParams } from 'react-router-dom';

type DefaultParams = Record<string, string | undefined>;

export function useRequiredParams<T extends DefaultParams = DefaultParams>() {
  const params = useParams<T>();
  return params as T;
}
