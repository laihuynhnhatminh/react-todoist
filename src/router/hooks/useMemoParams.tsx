import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export function useMemoParams() {
  const params = useParams();

  return useMemo(() => params, [params]);
}
