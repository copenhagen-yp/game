import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../components';

import { PlayGround } from './play-ground';
import * as gameActions from '../../store/game/actions';
import * as gameSelectors from '../../store/game/selectors';
import { userSelectors } from '../../store/user';
import { AppState } from '../../store/reducer';
import { Button } from '../../components';
import { GAME_STATUSES } from '../../store/game/constants';

import styles from './game.pcss';

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

export const Game = () => {
  const canvasRef = useRef(null);
  const [playGround, setPlayGround] = useState<any>(null);
  const gameStatus = useSelector<AppState>(gameSelectors.getStatus);
  const gameInfoUser = useSelector(userSelectors.getGameInfo);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const canvasObj: any = canvasRef.current;

    if (canvasObj) {
      const ctx = canvasObj.getContext('2d');
      const playGroundObj = new PlayGround(canvasObj, ctx, handleFinish, dispatch);

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

    switch (gameStatus) {
      case GAME_STATUSES.PAUSE:
        playGround.pause();
        break;

      case GAME_STATUSES.RESUME:
        playGround.resume();
        break;

      case GAME_STATUSES.FINISH:
        playGround.finish();
        break;

      case GAME_STATUSES.RESTART:
        playGround.start();
        dispatch(gameActions.resume());
        break;
    }
  }, [gameStatus]);

  const handlePauseClick = () => {
    switch (gameStatus) {
      case GAME_STATUSES.PAUSE:
        dispatch(gameActions.resume());
        break;

      case GAME_STATUSES.RESUME:
        dispatch(gameActions.pause());
        break;
    }
  };

  const handleRestartClick = () => {
    setIsOpen(false);
    dispatch(gameActions.restart());
  };

  const handleFinish = () => {
    setIsOpen(true);
    dispatch(gameActions.finish());
  };

  const handleCanvasClick = (event: any) => {
    if (playGround) {
      playGround.handleClickCanvas(event, handlePauseClick);
    }
  };

  console.log(gameInfoUser);
  
  return (
    <main className={styles.game}>
      <Modal
        isOpen={modalIsOpen}
      >
        <Button onClick={handleRestartClick}>Начать заново</Button>
      </Modal>
      <h1>Game</h1>
      <div className={styles.container}>
        <div className={styles.canvasWrapper}>
          <div className={styles.infoPanel}>
            <div className={styles.infoPanel__left}>
              Очки: {gameInfoUser.point}
            </div>
            <div className={styles.infoPanel__right}>
              Время: 01:00
            </div>
          </div>
          <canvas
            className={styles.canvas}
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onClick={handleCanvasClick}
          />
        </div>
      </div>
    </main>
  );
};
