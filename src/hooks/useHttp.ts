import { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import { API_URL } from '../constants';
import { Options } from './types';

export const useHttp = (url: string, method: string, withoutHeaders?: boolean) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { addToast } = useToasts();
  const headers = new Headers();

  if (!withoutHeaders) {
    headers.append('Content-Type', 'application/json');
  }

  const request = useCallback(
    async(options?: Options) => {
      try {
        const response = await fetch(`${API_URL.API_DOMAIN}${url}`, { ...options, credentials: 'include', method: method, headers });
        let data;

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (!response.ok) {
          throw data;
        }

        return data;
      } catch (error) {
        if (error.reason) {
          setErrors(prevState => [...prevState, error.reason]);
          addToast(error.reason, { appearance: 'error' });
        } else if (typeof error === 'string') {
          setErrors(prevState => [...prevState, error]);
          addToast(error, { appearance: 'error' });
        } else {
          addToast('Что-то пошло не так', { appearance: 'error' });
        }
      }
    },[]);

  return {
    request,
    errors
  };
};
