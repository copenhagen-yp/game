import { GameReducer } from './types';

export const getStatus = ({ game }: { game: GameReducer}) => {
  return game.status;
};
