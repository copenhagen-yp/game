import { IEnemy, Tpath } from './types';

const _countPoint = 10;

export class Enemy implements IEnemy {
  private context: any;
  private canvas: any;
  private canvasBoundingRect: any;
  public readonly width: number;
  public readonly height: number;
  public x: number;
  public y: number;
  public radiusFindHero: number;
  private path: Tpath[];
  private followToPathPoint: number;
  public step: number;

  constructor (context: any) {
    this.context = context;
    this.canvas = context.canvas;
    this.canvasBoundingRect = this.canvas.getBoundingClientRect();

    this.width = 30;
    this.height = 30;

    this.x = 0;
    this.y = 0;
    this.radiusFindHero = 0;
    this.step = 0;

    this.path = [];
    this.followToPathPoint = 0;
  }

  init () {
    this.x = 0;
    this.y = 0;
    this.step = 1;
    this.radiusFindHero = 3;
    this.path = this.addPath();
  }

  addPath () {
    const result = [];

    const countX = Math.floor(this.canvas.width - this.width)
    const countY = Math.floor(this.canvas.height - this.height);

    for (let index = 0; index < _countPoint; index++) {
      result.push({ 
        x: Math.floor(Math.random() * countX), 
        y: Math.floor(Math.random() * countY) })
    }

    return result;

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
    const isFinding = this.finding(otherSprite);

    if (isFinding) {
      this.move(otherSprite.x, otherSprite.y);
    } else {

      const path = this.path[this.followToPathPoint];

      if (path.x === this.x && path.y === this.y) {
        this.followToPathPoint++;
        
        if (this.followToPathPoint > this.path.length - 1) {
          this.followToPathPoint = 0;
        }
      } else {
        this.move(path.x, path.y);
      }
    }
  }

  finding (otherSprite?: any) {
    let XColl = false;
    let YColl = false;

    if (this && (this.x + this.width * this.radiusFindHero >= otherSprite.x) 
        && (this.x - this.width * this.radiusFindHero <= otherSprite.x + otherSprite.width)) {
      XColl = true;
    }

    if (this && (this.y + this.width * this.radiusFindHero >= otherSprite.y ) 
        && (this.y - this.width * this.radiusFindHero <= otherSprite.y + otherSprite.width)) {
      YColl = true;
    }

    if (XColl && YColl) {
      return true;
    }

    return false;
  }

  move (toX: number, toY: number) {
      
    if (toX && toY) {
      let x = this.x;
      let y = this.y;

      const stepX = Math.min(Math.abs(toX - x), this.step);
      const stepY = Math.min(Math.abs(toY - y), this.step);

      if (x < toX) {
        x += stepX;
      } else if (x > toX) {
        x -= stepX;
      } else if (y < toY) {
        y += stepY;
      } else if (y > toY) {
        y -= stepY;
      }

      const position = this.normalizePosition(x, y);

      this.setPosition(position.x, position.y);
    }
  }

}