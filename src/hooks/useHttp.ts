import { useCallback, useState } from 'react';

import { API_URL } from '../constants';
import { Options } from './types';

export const useHttp = (url: string) => {
  const [errors, setErrors] = useState<string[]>([]);
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestAuth = useCallback(
    (options?: Options ) => {
      fetch(`${API_URL.DOMEN}${url}`, { ...options, headers })
        .then(resp => resp.json().then((json) => {
          if (resp.status >= 300) {
            return Promise.reject(json);
          } else {
            return json;
          }
        }))
        .catch(({ reason }: {[index: string]: string}) => {
          setErrors(prevState => [...prevState, reason]);
        });
    },[]);
  return {
    requestAuth,
    errors
  };
};