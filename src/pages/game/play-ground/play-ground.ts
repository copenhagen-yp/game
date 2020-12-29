import { MainCharacter } from '../main-character';

export class PlayGround {
  private canvas: any | null;
  private context: any | null;

  private mainCharacter: any | null;
  private requestAnimationId: any | undefined;

  constructor(canvas: any, context: any) {
    this.canvas = canvas;
    this.context = context;

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
    this.clearCanvas();

    this.mainCharacter.move();
    this.mainCharacter.draw();

    this.requestAnimationId = requestAnimationFrame(this.render);
  }
}
