import React from 'react';
import styles from './game.pcss';

export const Game = () => {
  return (
    <main className={styles.game}>
      <h1>Game</h1>
      <canvas/>
    </main>
  );
}
