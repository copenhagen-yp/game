const KEY_CODES = {
  up: 38,
  down: 40,
  left: 37,
  right: 39
}

const STEP = 6;

const DIRECTIONS_MAP = {
  ASCENDING : 1,
  DESCENDING: -1,
};

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

  constructor (context: any) {
    this.context = context;
    this.canvas = context.canvas;
    this.canvasBoundingRect = this.canvas.getBoundingClientRect();

    this.width = 50;
    this.height = 50;

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
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.save();
    this.context.restore();
  }

  setPosition (x: number, y: number) {
    this.x = x;
    this.y = y;

    this.setEndPosition(x, y);
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