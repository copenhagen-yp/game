import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PlayGround } from './play-ground';
import { resumeGame, pauseGame } from '../../store';

import styles from './game.pcss';

const canvasWidth = 700;
const canvasHeight = 500;

export const Game = () => {
  const canvasRef = useRef(null);
  const [playGround, setPlayGround] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const gameState = useSelector(store => store.game.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const canvasObj: any = canvasRef.current;

    if (canvasObj) {
      const ctx = canvasObj.getContext('2d');
      const playGroundObj = new PlayGround(canvasObj, ctx);

      setPlayGround(playGroundObj);
    }
  }, []);

  useEffect(() => {
    if (playGround) {
      playGround.start();
    }
  }, [playGround]);

  useEffect(() => {
    if (!playGround) {
      return;
    }

    cancelAnimationFrame(playGround.requestAnimationId);

    switch (gameState) {
      case 'pause':
        playGround.pause();
        break;

      case 'resume':
        playGround.render();
        break;
    }
  }, [gameState]);

  const handlePauseClick = () => {
    switch (gameState) {
      case 'pause':
        dispatch(resumeGame());
        break;

      case 'resume':
        dispatch(pauseGame());
        break;
    }
  };

  const handleCanvasClick = (event: any) => {
    if (playGround) {
      playGround.handleClickCanvas(event, handlePauseClick);
    }
  };

  return (
    <main className={styles.game}>
      <h1>Game</h1>
      <div className={styles.container}>
        <div className={styles.canvasWrapper}>
          <canvas
            className={styles.canvas}
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
          />
        </div>
      </div>
    </main>
  );
}
//
// const mapStateToProps = (store: any) => {
//   return {
//     game: store.game,
//   }
// }
//
// const ConnectedGame = connect(mapStateToProps)(Game);
//
// export { ConnectedGame as Game };
