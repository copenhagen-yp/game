import { useCallback, useState } from 'react';

import { API_URL } from '../constants';
import { Options } from './types';

export const useHttp = (url: string) => {
  const [errors, setErrors] = useState<string[]>([]);
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  const request = useCallback(
    async(options?: Options) => {
      try {
        const response = await fetch(`${API_URL.DOMAIN}${url}`, { ...options, credentials: 'include', headers });
        const data = await response.json();

        if (!response.ok) {
          throw data;
        }

        return data;
      } catch ({ reason }) {
        setErrors(prevState => [...prevState, reason]);
      }
    },[]);

  return {
    request,
    errors
  };
};