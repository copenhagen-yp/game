import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import { GetLeadersResponseType } from './types';
import { useHttp } from '../../hooks/useHttp';
import { leaderboardApi } from '../../api';
import cn from 'classnames';
import styles from './leaderboard.pcss';

export const Leaderboard = withStyles(styles)(() => {
  const [playersData, setPlayersData] = useState<GetLeadersResponseType>([]);
  const [loading, setLoading] = useState(true);
  const { request } = useHttp();
  const { getLeaderboard } = leaderboardApi(request);

  useEffect(function () {
    getLeaderboard()
      .then((res: GetLeadersResponseType) => {
        if (res) {
          setPlayersData(res);
          setLoading(false);
        }
      });
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
                <th className={cn(styles.leaderboard__cell, styles.leaderboard__cell_textRight)}>Очки</th>
              </tr>
            </thead>
            <tbody>
              {playersData
                .filter((player) => {
                  return !!(player.data.name && player.data.points && player.data.id);
                })
                .map((player) => (
                  <tr key={player.data.id}>
                    <td className={styles.leaderboard__cell}>{player.data.name}</td>
                    <td className={cn(styles.leaderboard__cell, styles.leaderboard__cell_textRight)}>{player.data.points}</td>
                  </tr>
                ))}
            </tbody>
          </table>}
      </div>
    </main>
  );
});
