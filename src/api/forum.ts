import { REQUEST_METHOD, API_URL } from './../constants';
import { Options } from '../hooks/types';

export const forumApi = (request: { (url: string, options?: Options): Promise<any> }) => {
  const getTopics = () => {
    return request(
      API_URL.GET_TOPICS,
      {
        method: REQUEST_METHOD.GET
      });
  };

  return { getTopics };
};
