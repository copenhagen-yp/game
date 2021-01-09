import { Options } from '../hooks/types';

const ratingFieldName = 'points';
const cursor = 0;
const limit = 10;

export const leaderboardApi = (request: { (options?: Options): Promise<any> }) => {
  const addUser = (name: string, id: number, points: number) => {
    return request({
      body: JSON.stringify({
        'data': {
          name,
          id,
          points,
        },
        ratingFieldName
      }),
    })
  };

  const getLeaderboard = () => {
    return request({
      body: JSON.stringify({
        ratingFieldName,
        cursor,
        limit,
      }),
    })
  };

  return { addUser, getLeaderboard };
}
