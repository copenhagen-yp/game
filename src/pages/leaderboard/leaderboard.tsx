import React, { useEffect, useState } from 'react';

import { useHttp } from './../../hooks/useHttp';
import styles from './leaderboard.pcss';

export const Leaderboard = () => {
  const [playersData, setPlayersData] = useState([{ data: { name: 'download', points: 'download', id: 1 } }]);

  const { request } = useHttp('leaderboard/all');

  useEffect(function () {
    request({
      method: 'POST',
      body: JSON.stringify({
        'ratingFieldName': 'points',
        'cursor': 0,
        'limit': 1,
      }),
    }).then(function (res) {
      setPlayersData(res);
    })
  }, [null]);

  return (
    <main className={styles.game}>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>
          {playersData.map((player) => (
            <tr key={player.data.points}>
              <td>{player.data.name}</td>
              <td>{player.data.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
