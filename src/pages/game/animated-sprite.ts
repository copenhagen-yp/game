export class AnimatedSprite {
  private readonly numberOfFrames: number;
  private readonly ticksPerFrame: number;

  public x: number;
  public y: number;

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
  private movementDirectionCode: {[index: string]: number};

  private image: HTMLImageElement;

  constructor (img: string, toX: number,
    toY: number,
    spriteCorp: {[index: string]: number},
    movementDirectionCode: {[index: string]: number}, numberOfFrames: number) {

    this.x = toX;
    this.y = toY;

    this.numberOfFrames = numberOfFrames;
    this.ticksPerFrame = 8;
    this.frameIndexX = 0;
    this.frameIndexY = 0;
    this.tickCount = 0;
    this.cropPointX = spriteCorp.POINT_X;
    this.cropPointY = spriteCorp.POINT_Y;
    this.cropWidth = spriteCorp.WIDTH;
    this.cropHeight = spriteCorp.HEIGHT;
    this.previousPositionX = toX;
    this.previousPositionY = toY;
    this.previousDirectionCode = 0;
    this.movementDirectionCode = movementDirectionCode;
    this.image = new Image();
    this.image.src = img;
  }

  handleAnimation () {
    const isMoving = this.previousPositionX !== this.x || this.previousPositionY !== this.y;

    this.updateFrameIndexX(isMoving);
    this.updateFrameIndexY(isMoving);

    this.previousPositionX = this.x;
    this.previousPositionY = this.y;
  }

  calculateMovementAngle () {
    return Math.atan2(this.y - this.previousPositionY, this.x - this.previousPositionX) * 180 / Math.PI;
  }

  updateFrameIndexX (isMoving: boolean) {
    this.tickCount++;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndexX < this.numberOfFrames - 1 && isMoving) {
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

  getFrameByAngle (angle: number) {

    if (angle >= -135 && angle <= -45) {
      this.previousDirectionCode = this.movementDirectionCode?.UP;

      return this.movementDirectionCode?.UP;
    }

    if (angle <= 135 && angle >= 45) {
      this.previousDirectionCode = this.movementDirectionCode?.DOWN;

      return this.movementDirectionCode?.DOWN;
    }

    if (angle > -45 && angle < 45) {
      this.previousDirectionCode = this.movementDirectionCode?.RIGHT;

      return this.movementDirectionCode?.RIGHT;
    }

    if (angle > 135 || angle < -135) {
      this.previousDirectionCode = this.movementDirectionCode?.LEFT;

      return this.movementDirectionCode?.LEFT;
    }

    return this.previousDirectionCode;
  }

  drawSprite (context: CanvasRenderingContext2D, toX: number, toY: number, width: number, height: number) {

    this.x = toX;
    this.y = toY;

    this.handleAnimation();

    context.drawImage(
      this.image,
      this.cropPointX * this.frameIndexX,
      this.cropPointY * this.frameIndexY,
      this.cropWidth,
      this.cropHeight,
      toX,
      toY,
      width,
      height,
    );
  }
}
