import { AnimatedSprite } from '../animated-sprite';
import { IMovableCharacter } from '../../game';
import { IWall } from '../wall';

import { checkCollision } from '../helpers';

const KEY_CODES = {
  up: 38,
  down: 40,
  left: 37,
  right: 39,
};

const STEP = 5;

const DIRECTIONS_MAP = {
  ASCENDING: 1,
  DESCENDING: -1,
};

const MOVEMENT_DIRECTION_CODE = {
  DOWN: 0,
  UP: 1,
  LEFT: 2,
  RIGHT: 3,
};

const CHARACTER_IMAGE = '/images/boy.png';

const SPRITE_CROP = {
  WIDTH: 234,
  HEIGHT: 283,
  POINT_X: 241,
  POINT_Y: 285,
};

export class MainCharacter extends AnimatedSprite implements IMovableCharacter {
  public x: number;
  public y: number;

  private endX: number;
  private endY: number;

  private stepX: number;
  private stepY: number;

  private directionX: number;
  private directionY: number;

  private speedPerFrame: number;

  private context: CanvasRenderingContext2D;
  private canvas: any;

  public width: number;
  public height: number;

  private rightKeyPressed: boolean;
  private leftKeyPressed: boolean;
  private upKeyPressed: boolean;
  private downKeyPressed: boolean;
  private walls: IWall[];

  constructor(context: CanvasRenderingContext2D,  width: number, height: number) {
    super(CHARACTER_IMAGE, 0, 0, SPRITE_CROP, MOVEMENT_DIRECTION_CODE, 4);

    this.context = context;
    this.canvas = context.canvas;

    this.width = width;
    this.height = height;

    this.x = 0;
    this.y = 0;

    this.endX = 0;
    this.endY = 0;

    this.stepX = 0;
    this.stepY = 0;

    this.directionX = 1;
    this.directionY = 1;

    this.speedPerFrame = 4.5;

    this.rightKeyPressed = false;
    this.leftKeyPressed = false;
    this.upKeyPressed = false;
    this.downKeyPressed = false;

    this.walls = [];
  }

  init() {
    this.x = 0;
    this.y = 0;

    this.endX = 0;
    this.endY = 0;

    this.stepX = 0;
    this.stepY = 0;

    this.directionX = 1;
    this.directionY = 1;

    this.speedPerFrame = 4.5;

    this.rightKeyPressed = false;
    this.leftKeyPressed = false;
    this.upKeyPressed = false;
    this.downKeyPressed = false;

    window.addEventListener('keydown', this.keyDownHandler, false);
    window.addEventListener('keyup', this.keyUpHandler, false);
  }

  draw() {
    super.drawSprite(this.context, this.x, this.y, this.width, this.height);
  }

  setWalls(walls: IWall[]) {
    this.walls = walls;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.setEndPosition(x, y);
  }

  setEndPosition(x: number, y: number) {
    this.endX = x;
    this.endY = y;
  }

  determineSteps() {
    const direction = this.getDirection();

    this.directionX = direction.x;
    this.directionY = direction.y;

    const speeds = this.getSpeedsRerFrame();

    this.stepX = this.directionX * speeds.x;
    this.stepY = this.directionY * speeds.y;
  }

  getDirection() {
    const directionX = (this.endX - this.x) < 0
      ? DIRECTIONS_MAP.DESCENDING
      : DIRECTIONS_MAP.ASCENDING;

    const directionY = (this.endY - this.y) < 0
      ? DIRECTIONS_MAP.DESCENDING
      : DIRECTIONS_MAP.ASCENDING;

    return {
      x: directionX,
      y: directionY,
    };
  }

  getSpeedsRerFrame() {
    const distanceX = Math.abs(this.endX - this.x);
    const distanceY = Math.abs(this.endY - this.y);

    const maxDistance = Math.max(distanceX, distanceY);
    const minDistance = Math.min(distanceX, distanceY);

    const minSpeed = (minDistance * this.speedPerFrame) / maxDistance;

    const speedX = minDistance === distanceX ? minSpeed : this.speedPerFrame;
    const speedY = minDistance === distanceY ? minSpeed : this.speedPerFrame;

    return {
      x: speedX,
      y: speedY,
    };
  }

  stopMove() {
    this.endX = this.x;
    this.endY = this.y;
  }

  normalizePosition(x: number, y: number) {
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

  move() {
    if (this.rightKeyPressed || this.leftKeyPressed || this.upKeyPressed || this.downKeyPressed) {
      let x = this.x;
      let y = this.y;

      if (this.rightKeyPressed) {
        x += STEP;
      } else if (this.leftKeyPressed) {
        x -= STEP;
      } else if (this.upKeyPressed) {
        y -= STEP;
      } else if (this.downKeyPressed) {
        y += STEP;
      }

      const position = this.normalizePosition(x, y);

      this.setEndPosition(position.x, position.y);

      this.determineSteps();
    }

    if ((this.directionX === DIRECTIONS_MAP.ASCENDING && this.x < this.endX)
      || (this.directionX === DIRECTIONS_MAP.DESCENDING && this.x > this.endX)) {
      this.x += this.stepX;
    }

    if ((this.directionY === DIRECTIONS_MAP.ASCENDING && this.y < this.endY)
      || (this.directionY === DIRECTIONS_MAP.DESCENDING && this.y > this.endY)) {
      this.y += this.stepY;
    }

    this.fixCollisionWithWalls();
  }

  fixCollisionWithWalls = () => {
    this.walls.forEach((wall: IWall) => {
      const isCollision = checkCollision(this, wall);

      if (isCollision) {
        if (this.leftKeyPressed) {
          const x = wall.x + wall.width;

          this.endX = x;
          this.x = x;
        }

        if (this.rightKeyPressed) {
          const x = wall.x - this.width;

          this.endX = x;
          this.x = x;
        }

        if (this.upKeyPressed) {
          const y = wall.y + wall.height;

          this.endY = y;
          this.y = y;
        }

        if (this.downKeyPressed) {
          const y = wall.y - this.height;

          this.endY = y;
          this.y = y;
        }
      }
    });
  }

  clickHandler = (mousePositionX: number, mousePositionY: number) => {
    // ToDo: need change
    const x = mousePositionX - this.width / 2;
    const y = mousePositionY - this.height / 2;

    const position = this.normalizePosition(x, y);

    this.setEndPosition(position.x, position.y);
    this.determineSteps();
  };

  keyDownHandler = (event: any) => {
    this.rightKeyPressed = false;
    this.leftKeyPressed = false;
    this.upKeyPressed = false;
    this.downKeyPressed = false;

    if (event.keyCode === KEY_CODES.right) {
      this.rightKeyPressed = true;
    } else if (event.keyCode === KEY_CODES.left) {
      this.leftKeyPressed = true;
    } else if (event.keyCode === KEY_CODES.up) {
      this.upKeyPressed = true;
    } else if (event.keyCode === KEY_CODES.down) {
      this.downKeyPressed = true;
    }
  };

  keyUpHandler = (event: any) => {
    if (event.keyCode === KEY_CODES.right) {
      this.rightKeyPressed = false;
    } else if (event.keyCode === KEY_CODES.left) {
      this.leftKeyPressed = false;
    } else if (event.keyCode === KEY_CODES.up) {
      this.upKeyPressed = false;
    } else if (event.keyCode === KEY_CODES.down) {
      this.downKeyPressed = false;
    }
  };

  destroy() {
    window.removeEventListener('keydown', this.keyDownHandler, false);
    window.removeEventListener('keyup', this.keyUpHandler, false);
  }
}
