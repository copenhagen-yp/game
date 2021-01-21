import { GAME_ACTIONS } from '../constants';

export const pauseGame = () => ({
  type: GAME_ACTIONS.PAUSE,
});

export const resumeGame = () => ({
  type: GAME_ACTIONS.RESUME,
});

export const finishGame = () => ({
  type: GAME_ACTIONS.FINISH,
})
