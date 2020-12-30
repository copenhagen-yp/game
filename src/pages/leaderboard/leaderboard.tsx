import React, { useEffect, useState } from 'react';

import { useHttp } from './../../hooks/useHttp';
import styles from './leaderboard.pcss';
import { API_URL } from '../../constants';
import { response } from 'pages/leaderboard/types';

export const Leaderboard = () => {
  const [playersData, setPlayersData] = useState([{ data: { name: 'download', points: 'download' } }]);
  const [loading, setLoading] = useState(true);
  const { request } = useHttp(API_URL.LEADERBOARD_ALL);

  useEffect(function () {
    request({
      method: 'POST',
      body: JSON.stringify({
        'ratingFieldName': 'points',
        'cursor': 0,
        'limit': 10,
      }),
    }).then(function (res: response) {
      if (res) {
        setPlayersData(res);
        setLoading(false);
      }
    })
  }, [null]);

  return (
    <main className={styles.game}>
      <h1>Leaderboard</h1>
      {loading ? 'Заглушка на время загрузки' :
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Очки</th>
            </tr>
          </thead>
          <tbody>
            {playersData.map((player) => (
              <tr key={player.data.name}>
                <td>{player.data.name}</td>
                <td>{player.data.points}</td>
              </tr>
            ))}
          </tbody>
        </table>}
    </main>
  );
}
