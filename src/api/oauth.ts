import { API_URL, REQUEST_METHOD } from './../constants';
import { Options } from '../hooks/types';

export const oauthApi = (request: { (url: string, options?: Options): Promise<any> }) => {
  const getServiceId = () => {
    return request(
      API_URL.OAUTH_SERVICE_ID,
      { method: REQUEST_METHOD.GET });
  };

  const sendOauthCode = (code: string) => {
    return request(
      API_URL.OAUTH_CODE,
      {
        body: JSON.stringify({
          code
        }),
        method: REQUEST_METHOD.POST
      });
  };

  return {
    getServiceId,
    sendOauthCode,
  };
};

export const generateOauthLink = (serviceId: string) => {
  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${window.location.origin}`;
};
