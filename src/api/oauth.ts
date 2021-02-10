import { API_URL, REQUEST_METHOD } from './../constants';
import { Options } from '../hooks/types';

export const oauthApi = (request: { (url: string, options?: Options): Promise<any> }) => {
  const getServiceId = () => {
    return request(
      API_URL.OAUTH_SERVICE_ID,
      { method: REQUEST_METHOD.GET });
  };

  return { getServiceId };
};
