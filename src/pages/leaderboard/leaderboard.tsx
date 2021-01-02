import React, { useEffect, useState } from 'react';

import { response } from 'pages/leaderboard/types';
import { useHttp } from '../../hooks/useHttp';
import { API_URL } from '../../constants';
import { leaderboardApi } from '../../api/leaderboard-api';
import styles from './leaderboard.pcss';

export const Leaderboard = () => {
  const [playersData, setPlayersData] = useState([{ data: { name: 'download', points: 'download', id: 0 } }]);
  const [loading, setLoading] = useState(true);
  const { request } = useHttp(API_URL.LEADERBOARD_ALL);
  const { getLeaderboard } = leaderboardApi(request);

  useEffect(function () {
    getLeaderboard()
      .then((res: response) => {
        if (res) {
          setPlayersData(res);
          setLoading(false);
        }
      })
  }, []);

  return (
    <main className={styles.leaderboard}>
      <div className={styles.leaderboard__wrapper}>
        <h1 className={styles.leaderboard__title}>Leaderboard</h1>
        {loading ? 'Список лидеров загружается' :
          <table className={styles.leaderboard__table}>
            <thead>
              <tr>
                <th className={styles.leaderboard__cell}>Имя</th>
                <th className={`${styles.leaderboard__cell} ${styles.leaderboard__cell_textRight}`}>Очки</th>
              </tr>
            </thead>
            <tbody>
              {playersData.map((player, index) => (
                <tr key={player.data.id || index}>
                  <td className={styles.leaderboard__cell}>{player.data.name || 'Неизвестный'}</td>
                  <td className={`${styles.leaderboard__cell} ${styles.leaderboard__cell_textRight}`}>{player.data.points}</td>
                </tr>
              ))}
            </tbody>
          </table>}
      </div>
    </main>
  );
}
