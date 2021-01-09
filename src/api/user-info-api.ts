import { Options } from '../hooks/types';
import { REQUEST_METHOD } from '../constants';

export const userInfoApi = (request: { (options?: Options): Promise<any> }) => {
  const getInfo = () => {
    return request({
      method: REQUEST_METHOD.GET,
    })
  }

  return {
    getInfo,
  }
};
