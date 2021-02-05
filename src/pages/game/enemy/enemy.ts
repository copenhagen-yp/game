import { IEnemy, Tpath } from './types';
import { AnimatedSprite } from '../animated-sprite';

const COUNT_POINT = 10;

const MOVEMENT_DIRECTION_CODE = {
  DOWN: 0,
  UP: 3,
  LEFT: 1,
  RIGHT: 2
};

const ENEMY_IMAGE = '/images/enemy.png';

const SPRITE_CROP = {
  WIDTH: 56,
  HEIGHT: 50,
  POINT_X: 56,
  POINT_Y: 55,
};

export class Enemy extends AnimatedSprite implements IEnemy {
  private context: CanvasRenderingContext2D;
  private canvas: any;

  public readonly width: number;
  public readonly height: number;

  private path: Tpath[];
  private followToPathPoint: number;

  public step: number;

  public x: number;
  public y: number;

  public radiusFindHero: number;

  constructor (context: CanvasRenderingContext2D) {
    super(ENEMY_IMAGE, 0, 0, SPRITE_CROP, MOVEMENT_DIRECTION_CODE, 3);

    this.context = context;
    this.canvas = context.canvas;

    this.width = 60;
    this.height = 60 * 1.12;

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

    const countX = Math.floor(this.canvas.width - this.width);
    const countY = Math.floor(this.canvas.height - this.height);

    for (let index = 0; index < COUNT_POINT; index++) {
      result.push({
        x: Math.floor(Math.random() * countX),
        y: Math.floor(Math.random() * countY),
      });
    }

    return result;
  }

  draw () {
    super.drawSprite(this.context, this.x, this.y, this.width, this.height);
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
        this.followToPathPoint = (this.followToPathPoint + 1) % this.path.length;

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
