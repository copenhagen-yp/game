import { IEnemy } from './types';

export class Enemy implements IEnemy {
  private context: any;
  private canvas: any;
  private canvasBoundingRect: any;
  public readonly width: number;
  public readonly height: number;
  public x: number;
  public y: number;
  public radius: number;

  constructor (context: any) {
    this.context = context;
    this.canvas = context.canvas;
    this.canvasBoundingRect = this.canvas.getBoundingClientRect();

    this.width = 30;
    this.height = 30;

    this.x = 0;
    this.y = 0;
    this.radius = 0;
  }

  init () {
    this.x = 0;
    this.y = 0;
    this.radius = 3;  
  }

  draw () {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.save();
    this.context.restore();
  }

  setPosition (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  normalizePosition (x: number, y: number) {
    if (x < 0) {
      x = this.canvas.x;
    } else if (x > this.canvas.width - this.width) {
      x = this.canvas.width - this.width;
    }

    if (y < 0) {
      y = this.canvas.y;
    } else if (this.y > this.canvas.height - this.height) {
      y = this.canvas.height - this.height;
    }

    return { x, y };
  }

  update (otherSprite?: any) {
    const didCollide = this.didCollide(otherSprite);

    if (didCollide) {
      this.move(otherSprite);
    }
  }

  didCollide (otherSprite?: any) {
    let XColl = false;
    let YColl = false;

    if (this && (this.x + this.width * this.radius >= otherSprite.x) 
        && (this.x - this.width * this.radius <= otherSprite.x + otherSprite.width)) {
      XColl = true;
    }

    if (this && (this.y + this.width * this.radius >= otherSprite.y ) 
        && (this.y - this.width * this.radius <= otherSprite.y + otherSprite.width)) {
      YColl = true;
    }

    if (XColl && YColl) {
      return true;
    }

    return false;
  }

  move (otherSprite?: any) {
  
    if (otherSprite) {
      let x = this.x;
      let y = this.x;

      if (x < otherSprite.x) {
        x += 3;
      } else if (x > otherSprite.x) {
        x -= 3;
      } else if (y < otherSprite.y) {
        y += 3;
      } else if (y > otherSprite.y) {
        y -= 3;
      }

      const position = this.normalizePosition(x, y);

      this.setPosition(position.x, position.y);
    }

    // Click Handler
    // if ((this.directionX === DIRECTIONS_MAP.ASCENDING && this.x < this.endX)
    //   || (this.directionX === DIRECTIONS_MAP.DESCENDING && this.x > this.endX)) {
    //   this.x += this.stepX;
    // }

    // if ((this.directionY === DIRECTIONS_MAP.ASCENDING && this.y < this.endY)
    //   || (this.directionY === DIRECTIONS_MAP.DESCENDING && this.y > this.endY)) {
    //   this.y += this.stepY;
    // }
  }

}