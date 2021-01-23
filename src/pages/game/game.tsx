import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../components';

import { PlayGround } from './play-ground';
import * as gameActions from '../../store/game/actions';
import * as gameSelectors from '../../store/game/selectors';
import { AppState } from '../../store/reducer';
import { Button } from '../../components';
import { GAME_STATUSES } from '../../store/game/constants';

import styles from './game.pcss';
import { Button } from '../../components';

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

export const Game = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const canvasWrapperRef = useRef(null);

  const [playGround, setPlayGround] = useState<any>(null);
  const gameStatus = useSelector<AppState>(gameSelectors.getStatus);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const canvasObj: any = canvasRef.current;

    if (canvasObj) {
      const ctx = canvasObj.getContext('2d');
      handleResizeCanvasWrapper();
      const playGroundObj = new PlayGround(canvasObj, ctx, handleFinish);

      setPlayGround(playGroundObj);
    }

    const canvasWrapperRefElement: any = canvasWrapperRef.current;

    if (canvasWrapperRefElement) {
      window.addEventListener('resize', handleResizeCanvasWrapper);
    }

    return () => {
      window.removeEventListener('resize', handleResizeCanvasWrapper);
    };
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
      playGround.handleClickCanvas(event);
    }
  };
  const changeCanvasSize = (width: number, height: number) => {
    const canvas: any = canvasRef.current;

    if (canvas) {
      const ratio = canvas.width / canvas.height;

      let canvasHeight = height;
      let canvasWidth = canvasHeight * ratio;

      if (canvasWidth > width) {
        canvasWidth = width;
        canvasHeight = canvasWidth / ratio;
      }

      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';
    }
  };

  const handleResizeCanvasWrapper = () => {
    if (!isFullScreen) {
      changeCanvasSize(canvasWidth, canvasHeight);
    }

    const canvasWrapperElement: any = canvasWrapperRef.current;

    const width = canvasWrapperElement.offsetWidth;
    const height = canvasWrapperElement.offsetHeight;

    changeCanvasSize(width, height);
  };

  const handleCLickFullscreen = () => {
    if (!containerRef || !containerRef.current) {
      return;
    }

    const elem = containerRef.current;

    if (!document.fullscreenElement) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (elem.requestFullscreen) {

        setIsFullScreen(true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        setIsFullScreen(false);

        document.exitFullscreen();
      }

      handleResizeCanvasWrapper();
    }
  };

  return (
    <main className={styles.game}>
      <Modal
        isOpen={modalIsOpen}
      >
        <Button onClick={handleRestartClick}>Начать заново</Button>
      </Modal>
      <h1>Game</h1>
      <div className={styles.container} ref={containerRef}>
        <Button
          onClick={handleCLickFullscreen}
        >
          {isFullScreen ? 'Свернуть' : 'Развернуть'}
        </Button>
        <div className={styles.canvasWrapper} ref={canvasWrapperRef}>
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
