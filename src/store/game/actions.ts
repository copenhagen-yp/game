import { GAME_ACTIONS } from './constants';

export const pause = () => ({
  type: GAME_ACTIONS.PAUSE,
});

export const resume = () => ({
  type: GAME_ACTIONS.RESUME,
});

export const finish = () => ({
  type: GAME_ACTIONS.FINISH,
})

export const restart = () => ({
  type: GAME_ACTIONS.RESTART,
})
