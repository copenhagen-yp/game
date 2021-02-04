import { IExit } from './types';

export class Exit implements IExit {
  private context: any;

  public readonly width: number;
  public readonly height: number;

  public x: number;
  public y: number;

  private image: HTMLImageElement;

  constructor (context: any) {
    this.context = context;

    this.width = 50;
    this.height = 50;

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
