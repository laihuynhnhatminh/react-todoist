import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useMemoSearchParams() {
  const [searchParams] = useSearchParams();

  return useMemo(() => searchParams, [searchParams]);
}
