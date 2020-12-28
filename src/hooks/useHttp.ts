import { useCallback, useState } from 'react';

import { Options } from './types';

const _DOMEN = 'https://ya-praktikum.tech/api/v2/';

export const useHttp = (url: string) => {
  const [errors, setErrors] = useState<string[]>([]);
  const headers = new Headers();

  headers.append('Content-Type', 'application/json')
  const request = useCallback(
    (options?: Options ) => {
      return fetch(`${_DOMEN}${url}`, { ...options, credentials: 'include', headers })
        .then(resp => {
          if (resp.status >= 300) {
            return Promise.reject();
          } else {
            return resp.json();
          }
        })
        .then(json => json)
        .catch((err: string) => {
          setErrors(prevState => [...prevState, err]);
        });
    },[]);

  return {
    request,
    errors
  };
}