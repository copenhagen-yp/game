import { LevelType } from '../types';

export type gameObjects = {
  x: number,
  y: number,
  width: number,
  height: number,
};

export type IPlayGround = {
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  handleFinishFailure: () => void,
  handleFinishSuccess: (countPoint: number) => void,
  handleSetPoint: (point: number) => void,
  levelInfo: LevelType,
};
