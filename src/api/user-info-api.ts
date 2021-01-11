import { Options } from '../hooks/types';
import { REQUEST_METHOD } from '../constants';

export const userInfoApi = (request: { (options?: Options): Promise<any> }) => {
  const getInfo = () => {
    return request({
      method: REQUEST_METHOD.GET,
    })
  }

  const updateUserAvatar = (image: any) => {
    if (!image) {
      return Promise.reject();
    }

    const formData = new FormData();

    formData.append('avatar', image);

    return request({
      method: REQUEST_METHOD.PUT,
      body: formData,
    })
  }

  return {
    getInfo,
    updateUserAvatar,
  }
};
