import { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import { API_URL } from '../constants';
import { Options } from './types';

export const useHttp = (url: string) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { addToast } = useToasts();
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestAuth = useCallback(
    async(options?: Options) => {
      try {
        const response = await fetch(`${API_URL.DOMAIN}${url}`, { ...options, headers });
        const data = await response.json();

        if (!response.ok) {
          throw data;
        }

        return data;

      } catch ({ reason }) {
        setErrors(prevState => [...prevState, reason]);
        addToast(reason, { appearance: 'error' });
      }
    },[]);

  return {
    requestAuth,
    errors
  };
};