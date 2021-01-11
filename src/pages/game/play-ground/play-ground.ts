import { MainCharacter } from '../main-character';

const INTERVAL_MOTION = 1 / 60;

export class PlayGround {
  private canvas: any | null;
  private context: any | null;

  private mainCharacter: any | null;
  private requestAnimationId: any | undefined;
  private lastTime: number;
  private timeDelta: number;

  constructor(canvas: any, context: any) {
    this.canvas = canvas;
    this.context = context;

    this.lastTime = 0;
    this.timeDelta = 0;

    this.mainCharacter = null;
    this.requestAnimationId = undefined;
  }

  start() {
    this.requestAnimationId = undefined;
    this.init();
  }

  init() {
    this.initCanvas();
    this.initMainCharacter();

    this.lastTime = performance.now();
    this.requestAnimationId = requestAnimationFrame(this.render);
  }

  initCanvas () {
    this.canvas.x = 0;
    this.canvas.y = 0;
  }

  destroy() {
    cancelAnimationFrame(this.requestAnimationId);

    this.mainCharacter.destroy();
  }

  initMainCharacter() {
    this.mainCharacter = new MainCharacter(this.context);
    this.mainCharacter.init();

    const startX = this.canvas.width / 2 - this.mainCharacter.width / 2;
    const startY = this.canvas.height / 2 - this.mainCharacter.height / 2;

    this.mainCharacter.setPosition(startX, startY);
    this.mainCharacter.draw();
  }

  clearCanvas() {
    if(this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  handleClickCanvas(event: any) {
    this.mainCharacter.clickHandler(event);
  }

  render = () => {
    const now = performance.now();

    this.timeDelta += (now - this.lastTime) / 1000;

    while (this.timeDelta > INTERVAL_MOTION) {
      this.timeDelta -= INTERVAL_MOTION;
      this.mainCharacter.move();
    }

    this.lastTime = now;

    this.clearCanvas();
    this.mainCharacter.draw();
    this.requestAnimationId = requestAnimationFrame(this.render);
  }
}
