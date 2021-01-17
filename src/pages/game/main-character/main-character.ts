const KEY_CODES = {
  up: 38,
  down: 40,
  left: 37,
  right: 39
}

const STEP = 5;

const DIRECTIONS_MAP = {
  ASCENDING : 1,
  DESCENDING: -1,
};

const MOVEMENT_DIRECTION_CODE = {
  DOWN: 0,
  UP: 1,
  LEFT: 2,
  RIGHT: 3
}

const CHARACTER_IMAGE = new Image();

CHARACTER_IMAGE.src = '/images/boy.png';

const SPRITE_CROP = {
  WIDTH: 234,
  HEIGHT: 283,
  POINT_X: 241,
  POINT_Y: 285,
}

export class MainCharacter {
  private x: number;
  private y: number;

  private endX: number;
  private endY: number;

  private stepX: number;
  private stepY: number;

  private directionX: number;
  private directionY: number;

  private speedPerFrame: number;

  private context: any;
  private canvas: any;
  private canvasBoundingRect: any;

  private width: number;
  private height: number;

  private rightKeyPressed: boolean;
  private leftKeyPressed: boolean;
  private upKeyPressed: boolean;
  private downKeyPressed: boolean;

  private readonly characterImage: HTMLImageElement;
  private readonly characterNumberOfFrames: number;
  private readonly ticksPerFrame: number;
  private frameIndexX: number;
  private frameIndexY: number;
  private tickCount: number;
  private readonly cropPointX: number;
  private readonly cropPointY: number;
  private readonly cropWidth: number;
  private readonly cropHeight: number;
  private previousPositionX: number;
  private previousPositionY: number;
  private previousDirectionCode: number;

  constructor (context: any) {
    this.context = context;
    this.canvas = context.canvas;
    this.canvasBoundingRect = this.canvas.getBoundingClientRect();

    this.width = 45;
    this.height = this.width * 1.212;

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

    this.characterImage = CHARACTER_IMAGE;
    this.characterNumberOfFrames = 4;
    this.ticksPerFrame = 8;
    this.frameIndexX = 0;
    this.frameIndexY = 0;
    this.tickCount = 0;
    this.cropPointX = SPRITE_CROP.POINT_X;
    this.cropPointY = SPRITE_CROP.POINT_Y;
    this.cropWidth = SPRITE_CROP.WIDTH;
    this.cropHeight = SPRITE_CROP.HEIGHT;
    this.previousPositionX = this.x;
    this.previousPositionY = this.y;
    this.previousDirectionCode = MOVEMENT_DIRECTION_CODE.DOWN;
  }

  init () {
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

  draw () {
    this.handleAnimation();

    this.context.drawImage(
      this.characterImage,
      this.cropPointX * this.frameIndexX,
      this.cropPointY * this.frameIndexY,
      this.cropWidth,
      this.cropHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    )
  }

  setPosition (x: number, y: number) {
    this.previousPositionX = this.x = x;
    this.previousPositionY = this.y = y;

    this.setEndPosition(x, y);
  }

  handleAnimation () {
    const isMoving = this.previousPositionX !== this.x || this.previousPositionY !== this.y;

    this.updateFrameIndexX(isMoving);
    this.updateFrameIndexY(isMoving);

    this.previousPositionX = this.x;
    this.previousPositionY = this.y;
  }

  updateFrameIndexX (isMoving: boolean) {
    this.tickCount++;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (
        this.frameIndexX < this.characterNumberOfFrames - 1 && isMoving
      ) {
        this.frameIndexX++;
      } else {
        this.frameIndexX = 0;
      }
    }
  }

  updateFrameIndexY (isMoving: boolean) {
    if (!isMoving) {
      this.frameIndexY = this.previousDirectionCode;

      return;
    }

    const angle = this.calculateMovementAngle();

    this.frameIndexY = this.getFrameByAngle(angle);
  }

  calculateMovementAngle () {
    return Math.atan2(this.y - this.previousPositionY, this.x - this.previousPositionX) * 180 / Math.PI;
  }

  getFrameByAngle (angle: number) {
    
    if (angle >= -135 && angle <= -45) {
      this.previousDirectionCode = MOVEMENT_DIRECTION_CODE.UP;

      return MOVEMENT_DIRECTION_CODE.UP;
    }

    if (angle <= 135 && angle >= 45) {
      this.previousDirectionCode = MOVEMENT_DIRECTION_CODE.DOWN;

      return MOVEMENT_DIRECTION_CODE.DOWN;
    }

    if (angle > -45 && angle < 45) {
      this.previousDirectionCode = MOVEMENT_DIRECTION_CODE.RIGHT;

      return MOVEMENT_DIRECTION_CODE.RIGHT;
    }

    if (angle > 135 || angle < -135) {
      this.previousDirectionCode = MOVEMENT_DIRECTION_CODE.LEFT;

      return MOVEMENT_DIRECTION_CODE.LEFT;
    }

    return this.previousDirectionCode;
  }

  setEndPosition (x: number, y: number) {
    this.endX = x;
    this.endY = y;
  }

  determineSteps () {
    const direction = this.getDirection();

    this.directionX = direction.x;
    this.directionY = direction.y;

    const speeds = this.getSpeedsRerFrame();

    this.stepX = this.directionX * speeds.x;
    this.stepY = this.directionY * speeds.y;
  }

  getDirection () {
    const directionX = (this.endX - this.x) < 0
      ? DIRECTIONS_MAP.DESCENDING
      : DIRECTIONS_MAP.ASCENDING;

    const directionY = (this.endY - this.y) < 0
      ? DIRECTIONS_MAP.DESCENDING
      : DIRECTIONS_MAP.ASCENDING;

    return {
      x: directionX,
      y: directionY
    };
  }

  getSpeedsRerFrame () {
    const distanceX = Math.abs(this.endX - this.x);
    const distanceY = Math.abs(this.endY - this.y);

    const maxDistance = Math.max(distanceX, distanceY);
    const minDistance = Math.min(distanceX, distanceY);

    const minSpeed = (minDistance * this.speedPerFrame) / maxDistance;

    const speedX = minDistance === distanceX ? minSpeed : this.speedPerFrame;
    const speedY = minDistance === distanceY ? minSpeed : this.speedPerFrame;

    return {
      x: speedX,
      y: speedY
    }
  }

  stopMove () {
    this.endX = this.x;
    this.endY = this.y;
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

  move () {
    // Key press handler
    if (this.rightKeyPressed || this.leftKeyPressed || this.upKeyPressed || this.downKeyPressed) {
      let x = this.endX;
      let y = this.endY;

      if (this.rightKeyPressed) {
        x += STEP;
      } else if (this.leftKeyPressed) {
        x -= STEP;
      }

      if (this.upKeyPressed) {
        y -= STEP;
      } else if (this.downKeyPressed) {
        y += STEP;
      }

      const position = this.normalizePosition(x, y);

      this.setEndPosition(position.x, position.y);

      this.determineSteps();
    }

    // Click Handler
    if ((this.directionX === DIRECTIONS_MAP.ASCENDING && this.x < this.endX)
      || (this.directionX === DIRECTIONS_MAP.DESCENDING && this.x > this.endX)) {
      this.x += this.stepX;
    }

    if ((this.directionY === DIRECTIONS_MAP.ASCENDING && this.y < this.endY)
      || (this.directionY === DIRECTIONS_MAP.DESCENDING && this.y > this.endY)) {
      this.y += this.stepY;
    }
  }

  clickHandler = (event: any) => {
    const x = event.clientX - this.canvasBoundingRect.left - this.width / 2;
    const y = event.clientY - this.canvasBoundingRect.top - this.height / 2;

    const position = this.normalizePosition(x, y);

    this.setEndPosition(position.x, position.y);
    this.determineSteps();
  }

  keyDownHandler = (event: any) => {
    if (event.keyCode === KEY_CODES.right) {
      this.rightKeyPressed = true;
    } else if (event.keyCode === KEY_CODES.left) {
      this.leftKeyPressed = true;
    } else if (event.keyCode === KEY_CODES.up) {
      this.upKeyPressed = true;
    } else if (event.keyCode === KEY_CODES.down) {
      this.downKeyPressed = true;
    }
  }

  keyUpHandler = (event: any) => {
    if (event.keyCode === KEY_CODES.right) {
      this.rightKeyPressed = false;
    } else if (event.keyCode === KEY_CODES.left) {
      this.leftKeyPressed = false;
    } else if (event.keyCode === KEY_CODES.up) {
      this.upKeyPressed = false
    } else if (event.keyCode === KEY_CODES.down) {
      this.downKeyPressed = false
    }
  }

  destroy () {
    window.removeEventListener('keydown', this.keyDownHandler, false);
    window.removeEventListener('keyup', this.keyUpHandler, false);
  }
}
