import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../components';
import withStyles from 'isomorphic-style-loader/withStyles';

import { PlayGround } from './play-ground';
import * as gameActions from '../../store/game/actions';
import * as gameSelectors from '../../store/game/selectors';
import { userActions } from '../../store/user';
import { AppState } from '../../store/reducer';
import { Button } from '../../components';
import { GAME_STATUSES } from '../../store/game/constants';

import styles from './game.pcss';

declare let SSR: boolean;

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

export const Game = withStyles(styles)(() => {
  if (SSR) {
    return null;
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const [playGround, setPlayGround] = useState<any>(null);
  const gameStatus = useSelector<AppState>(gameSelectors.getStatus);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const canvasObj = canvasRef.current;

    if (canvasObj) {
      const ctx = canvasObj.getContext('2d');
      const playGroundObj = new PlayGround(canvasObj, ctx, handleFinish, handleSetPoint);

      handleResizeCanvasWrapper();
      setPlayGround(playGroundObj);
    }

    const canvasWrapperRefElement = canvasWrapperRef.current;

    if (canvasWrapperRefElement) {
      window.addEventListener('resize', handleResizeCanvasWrapper);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
    }

    return () => {
      window.removeEventListener('resize', handleResizeCanvasWrapper);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
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
      playGround.handleClickCanvas(event, handlePauseClick);
    }
  };

  const handleSetPoint = (point: number) => {
    dispatch(userActions.setPointUser(point));
  };
  
  const changeCanvasSize = (width: number, height: number) => {
    const canvas = canvasRef.current;

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
      changeCanvasSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    const canvasWrapperElement = canvasWrapperRef.current;

    if(canvasWrapperElement) {
      const width = canvasWrapperElement.offsetWidth;
      const height = canvasWrapperElement.offsetHeight;

      changeCanvasSize(width, height);
    }
  };

  const handleFullscreenChange = () => {
    setIsFullScreen(!!document.fullscreenElement);
    handleResizeCanvasWrapper();
  };

  const handleClickFullscreen = () => {
    if (!containerRef || !containerRef.current) {
      return;
    }

    const elem = containerRef.current;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <main className={styles.game}>
      <h1>Game</h1>
      <div
        className={styles.container}
        ref={containerRef}
      >
        {containerRef.current && (
          <Modal
            isOpen={modalIsOpen}
            parentSelector={() => containerRef.current}
          >
            <Button onClick={handleRestartClick}>
              Начать заново
            </Button>
          </Modal>
        )}
        <Button
          onClick={handleClickFullscreen}
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
});
