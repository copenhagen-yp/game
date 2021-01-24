import { IFoods } from './types';

export class Foods implements IFoods {
  private context: any;

  public readonly width: number;
  public readonly height: number;

  public x: number;
  public y: number;

  private image: HTMLImageElement;

  constructor (context: any) {
    this.context = context;

    this.width = 35;
    this.height = 35;

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