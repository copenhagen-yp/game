import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

import { PlayGround } from './play-ground';
import * as gameActions from '../../store';

import styles from './game.pcss';
import { AppState } from '../../store/reducer';
import { Button } from '../../components';

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

export const Game = () => {
  const canvasRef = useRef(null);
  const [playGround, setPlayGround] = useState<any>(null);
  const gameState = useSelector<AppState>(store => store.game.status);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const canvasObj: any = canvasRef.current;

    if (canvasObj) {
      const ctx = canvasObj.getContext('2d');
      const playGroundObj = new PlayGround(canvasObj, ctx, handleFinish);

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
        playGround.resume();
        break;

      case 'finish':
        playGround.finish();
        break;

      case 'restart':
        playGround.start();
        dispatch(gameActions.resume());
        break;
    }
  }, [gameState]);

  const handlePauseClick = () => {
    switch (gameState) {
      case 'pause':
        dispatch(gameActions.resume());
        break;

      case 'resume':
        dispatch(gameActions.pause());
        break;
    }
  };

  const handleRestartClick = () => {
    setIsOpen(false);
    dispatch(gameActions.restart());
  }

  const handleFinish = () => {
    setIsOpen(true);
    dispatch(gameActions.finish());
  }

  const handleCanvasClick = (event: any) => {
    if (playGround) {
      playGround.handleClickCanvas(event, handlePauseClick);
    }
  };

  return (
    <main className={styles.game}>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
      >
        <Button onClick={handleRestartClick}>Начать заново</Button>
      </Modal>
      <h1>Game</h1>
      <div className={styles.container}>
        <div className={styles.canvasWrapper}>
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
}
