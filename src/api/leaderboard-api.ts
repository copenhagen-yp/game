import { API_URL, REQUEST_METHOD } from './../constants';
import { Options } from '../hooks/types';

const ratingFieldName = 'points';
const cursor = 0;
const limit = 10;

export const leaderboardApi = (request: { (url: string, options?: Options): Promise<any> }) => {
  const addUser = (name: string, id: number, points: number) => {
    return request(
      API_URL.LEADERBOARD,
      {
        body: JSON.stringify({
          data: {
            name,
            id,
            points,
          },
          ratingFieldName,
        }),
        method: REQUEST_METHOD.POST
      });
  };

  const getLeaderboard = () => {
    return request(
      API_URL.LEADERBOARD_ALL,
      {
        body: JSON.stringify({
          ratingFieldName,
          cursor,
          limit,
        }),
        method: REQUEST_METHOD.POST
      });
  };

  return { addUser, getLeaderboard };
};
