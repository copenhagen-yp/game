import { REQUEST_METHOD, API_URL } from './../constants';
import { Options } from '../hooks/types';

export const forumApi = (request: { (url: string, options?: Options): Promise<any> }) => {
  const getTopics = () => {
    return request(
      API_URL.FORUM,
      {
        method: REQUEST_METHOD.GET,
      });
  };

  const createTopic = (topicData) => {
    return request(
      API_URL.FORUM,
      {
        body: JSON.stringify(topicData),
        method: REQUEST_METHOD.POST,
      }
    );
  };

  const getTopic = (id) => {
    return request(
      `${API_URL.FORUM}/${id}`,
      {
        method: REQUEST_METHOD.GET,
      });
  };

  const createMessage = (id, messageData) => {
    return request(
      `${API_URL.FORUM}/${id}/message`,
      {
        body: JSON.stringify(messageData),
        method: REQUEST_METHOD.POST,
      }
    );
  };

  return {
    getTopics,
    createTopic,
    getTopic,
    createMessage,
  };
};
