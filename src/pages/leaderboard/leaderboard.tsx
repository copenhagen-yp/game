import React, { useState } from 'react';

import styles from './leaderboard.pcss';

export const Leaderboard = () => {
  const [playersData, /*setPlayersData*/] = useState([{ avatar: 'img.jpg', name: 'Petya', points: '25', id: 1 }]);

  return (
    <main className={styles.game}>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Аватар</th>
            <th>Имя</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>
          {playersData.map((player) => (
            <tr key={player.id}>
              <td>{player.avatar}</td>
              <td>{player.name}</td>
              <td>{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
