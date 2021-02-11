import React, { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../components';
import withStyles from 'isomorphic-style-loader/withStyles';

import { PlayGround } from './play-ground';
import { gameActions, gameSelectors } from '../../store/game';
import { userSelectors, userActions } from '../../store/user';
import { AppState } from '../../store/reducer';
import { Button } from '../../components';
import { GAME_STATUSES } from '../../store/game/constants';
import { leaderboardApi } from '../../api';
import { useHttp } from '../../hooks/useHttp';
import { routes } from '../../routes';

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
  const [isOpenFinishFailureModal, setIsOpenFinishFailureModal] = useState(false);
  const [isOpenFinishSuccessModal, setIsOpenFinishSuccessModal] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { request } = useHttp();
  const { addUser } = leaderboardApi(request);
  const point = useSelector(userSelectors.getGamePoint);
  const user = useSelector(userSelectors.getCurrent);

  useEffect(() => {
    const canvasObj = canvasRef.current;

    if (canvasObj) {
      const ctx = canvasObj.getContext('2d');

      if(ctx) {
        const playGroundObj = new PlayGround({
          canvas: canvasObj,
          context: ctx,
          handleFinishFailure,
          handleFinishSuccess,
          handleSetPoint,
        });

        handleResizeCanvasWrapper();
        setPlayGround(playGroundObj);
      }
    }

    const canvasWrapperRefElement = canvasWrapperRef.current;

    if (canvasWrapperRefElement) {
      window.addEventListener('resize', handleResizeCanvasWrapper);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
    }

    const handleVisibilityChangeWrap = () => handleVisibilityChangeRef.current();

    document.addEventListener('visibilitychange', handleVisibilityChangeWrap);

    return () => {
      window.removeEventListener('resize', handleResizeCanvasWrapper);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChangeWrap);

      handleGameDestroyRef.current();
    };
  }, []);

  useEffect(() => {
    if (playGround) {
      playGround.start();
      dispatch(gameActions.resume());
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
    setIsOpenFinishFailureModal(false);
    setIsOpenFinishSuccessModal(false);
    dispatch(gameActions.restart());
  };

  const handleFinishFailure = () => {
    setIsOpenFinishFailureModal(true);
    dispatch(gameActions.finish());
  };

  const handleFinishSuccess = useCallback((countPoint: number) => {
    if(user?.first_name && user?.id) {
      addUser(user.first_name, user.id, countPoint)
        .then((res: any) => {
          if (res) {
            setIsOpenFinishSuccessModal(true);
            dispatch(gameActions.finish());
          }
        });
    }
  }, []);

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

  const handleVisibilityChange = () => {
    if (document.hidden && gameStatus === 'resume') {
      dispatch(gameActions.pause());
    }
  };

  const handleGameDestroy = () => {
    dispatch(gameActions.destroy());
    playGround.destroy();
  };

  const handleGameDestroyRef = useRef(handleGameDestroy);

  const handleVisibilityChangeRef = useRef(handleVisibilityChange);

  useLayoutEffect(() => {
    handleGameDestroyRef.current = handleGameDestroy;
  }, [handleGameDestroy]);

  useLayoutEffect(() => {
    handleVisibilityChangeRef.current = handleVisibilityChange;
  }, [handleVisibilityChange]);

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
            isOpen={isOpenFinishFailureModal}
            parentSelector={() => containerRef.current}
          >
            <Button onClick={handleRestartClick}>
              Начать заново
            </Button>
          </Modal>
        )}
        {containerRef.current && (
          <Modal
            isOpen={isOpenFinishSuccessModal}
            parentSelector={() => containerRef.current}
          >
            <p>Вы прошли! Вы собрали баллы: {point} </p>
            <Button onClick={handleRestartClick}>
              Пройти заново
            </Button>
            <Link to={routes.leaderboard.path}>
              <Button>
                Посмотреть рейтинг
              </Button>
            </Link>
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
