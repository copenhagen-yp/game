import { IWall } from './types';

export class Wall implements IWall {
  private context: CanvasRenderingContext2D;

  public readonly width: number;
  public readonly height: number;

  public x: number;
  public y: number;

  private image: HTMLImageElement;

  constructor (context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;

    this.width = width;
    this.height = height;

    this.x = 0;
    this.y = 0;

    this.image = new Image();
  }

  init (img: string, toX: number, toY: number) {
    this.x = toX;
    this.y = toY;

    this.image.src = img;
  }

  draw () {
    this.context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
