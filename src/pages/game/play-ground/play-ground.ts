import { MainCharacter } from '../main-character';
import { Enemy, IEnemy } from '../enemy';
import { PauseButton } from '../pause-button';

const INTERVAL_MOTION = 1 / 60;
const BACKGROUND_SCENE = new Image();

BACKGROUND_SCENE.src = '/images/bg_grass.jpg';
export class PlayGround {
  private canvas: any | null;
  private context: any | null;

  private mainCharacter: any | null;
  private enemy: IEnemy[] | null;
  private countEnemy: number;
  private requestAnimationId: any | undefined;
  private lastRenderTime: number;
  private timeDelta: number;
  private pauseButton: any;
  private canvasBoundingRect: any;
  private state: 'resume' | 'pause' | 'finish';
  private handleFinish: () => void;

  constructor(canvas: any, context: any, handleFinish: () => void) {
    this.canvas = canvas;
    this.context = context;
    this.handleFinish = handleFinish;
    this.canvasBoundingRect = this.canvas.getBoundingClientRect();

    this.lastRenderTime = 0;
    this.timeDelta = 0;
    this.countEnemy = 2;

    this.enemy = null;
    this.mainCharacter = null;
    this.requestAnimationId = undefined;
    this.state = 'resume';

    setTimeout(this.handleFinish, 5000);
  }

  start() {
    this.requestAnimationId = undefined;
    this.state = 'resume';
    this.init();
  }

  init() {
    this.initCanvas();
    this.initMainCharacter();
    this.initEnemy();
    this.pauseButton = new PauseButton(this.context);

    this.lastRenderTime = performance.now();
    this.requestAnimationId = requestAnimationFrame(this.loop);
  }

  initCanvas () {
    this.canvas.x = 0;
    this.canvas.y = 0;
  }

  destroy() {
    cancelAnimationFrame(this.requestAnimationId);

    this.mainCharacter.destroy();
  }

  initEnemy() {
    this.enemy = Array.from(Array(this.countEnemy), () => {
      const enemy = new Enemy(this.context);

      enemy?.init();

      const startX = 0 + Math.floor(Math.random() * this.canvas.width);
      const startY = 0 + Math.floor(Math.random() * this.canvas.height);

      enemy.setPosition(startX, startY);
      enemy.draw();

      return enemy;
    });
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

  handleClickCanvas(event: MouseEvent, handlePauseClick: () => void) {
    const mousePositionX = event.clientX - this.canvasBoundingRect.left;
    const mousePositionY = event.clientY - this.canvasBoundingRect.top;

    if (this.checkMouseOnButton(mousePositionX, mousePositionY, this.pauseButton)) {
      handlePauseClick();
    } else {
      this.mainCharacter.clickHandler(mousePositionX, mousePositionY);
    }
  }

  checkMouseOnButton (mousePositionX: number, mousePositionY: number, button: { x: number; width: any; y: number; height: any; }) {
    return mousePositionX >= button.x && mousePositionX <= button.x + button.width &&
      mousePositionY >= button.y && mousePositionY <= button.y + button.height;
  }

  pause = () => {
    this.state = 'pause';
    this.requestAnimationId = requestAnimationFrame(this.pause);
    this.render();

    this.lastRenderTime = performance.now();
  }

  resume = () => {
    this.state = 'resume';
    this.loop();
  }

  finish = () => {
    console.log('finish');
  }

  loop = () => {
    const now = performance.now();

    this.timeDelta += (now - this.lastRenderTime) / 1000;

    while (this.timeDelta > INTERVAL_MOTION) {
      this.timeDelta -= INTERVAL_MOTION;
      this.mainCharacter.move();
      this.enemy?.map(item => item?.update(this.mainCharacter));
    }

    this.lastRenderTime = now;
    this.requestAnimationId = requestAnimationFrame(this.loop);
    this.render();
  }

  render = () => {
    this.clearCanvas();
    this.context.drawImage(BACKGROUND_SCENE, 0, 0, this.canvas.width, this.canvas.height);
    this.mainCharacter.draw();
    this.enemy?.map(item => item?.draw());
    this.pauseButton.draw(this.state);
  }
}
