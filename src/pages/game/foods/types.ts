export interface IFoods {
  width: number;
  height: number;

  x: number;
  y: number;

  init: (img: string, toX: number, toY: number) => void;
  draw: () => void
}