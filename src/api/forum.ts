import { REQUEST_METHOD, API_URL } from './../constants';
import { Options } from '../hooks/types';

export const forumApi = (request: { (url: string, options?: Options): Promise<any> }) => {
  const getTopics = () => {
    return request(
      API_URL.FORUM_TOPIC,
      {
        method: REQUEST_METHOD.GET,
      });
  };

  const createTopic = (topicData) => {
    return request(
      API_URL.FORUM_TOPIC,
      {
        body: JSON.stringify(topicData),
        method: REQUEST_METHOD.POST,
      }
    );
  };

  return {
    getTopics,
    createTopic,
  };
};
