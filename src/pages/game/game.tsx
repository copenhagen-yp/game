import React from 'react';
import styles from './game.pcss';

export const Game = () => {
  return (
    <main className={styles.game}>
      <h1>Game</h1>
      <div className={styles.container}>
        <div className={styles.canvasWrapper}>
          <canvas className={styles.canvas} />
        </div>
      </div>
    </main>
  );
}
