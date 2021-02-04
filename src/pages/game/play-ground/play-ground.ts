import { MainCharacter } from '../main-character';
import { Enemy, IEnemy } from '../enemy';
import { Foods, IFoods } from '../foods';
import { Exit, IExit } from '../exit';
import { PauseButton } from '../pause-button';
import { GAME_STATUSES } from '../../../store/game/constants';
import { gameObjects, IPlayGround } from './types';

const INTERVAL_MOTION = 1 / 60;
const BACKGROUND_SCENE = new Image();

const SAFE_ZONE_WIDTH = 150;
const SAFE_ZONE_HEIGHT = 150;

BACKGROUND_SCENE.src = '/images/bg_grass.jpg';

const ARR_IMG_FOODS: string[] = ['/images/mushroom.png', '/images/raspberries.png'];
const EXIT_IMAGE = '/images/exit.png';

export class PlayGround {
  private canvas: any | null;
  private context: any | null;

  private mainCharacter: any | null;
  private countPoint: number;

  private enemy: IEnemy[] | null;
  private countEnemy: number;

  private foods: IFoods[] | null;
  private countFoods: number;

  private exit: IExit | null;

  private requestAnimationId: any | undefined;
  private lastRenderTime: number;
  private timeDelta: number;
  private pauseButton: any;
  private state: 'resume' | 'pause' | 'finish';
  private handleFinishFailure: () => void;
  private handleFinishSuccess: (countPoint: number) => void;
  private handleSetPoint: (point: number) => void;

  constructor( { canvas, context, handleFinishFailure,
    handleFinishSuccess, handleSetPoint } : IPlayGround) {
    this.canvas = canvas;
    this.context = context;
    this.handleFinishFailure = handleFinishFailure;
    this.handleFinishSuccess = handleFinishSuccess;
    this.handleSetPoint = handleSetPoint;

    this.lastRenderTime = 0;
    this.timeDelta = 0;

    this.foods = null;
    this.countFoods = 5;

    this.enemy = null;
    this.countEnemy = 2;

    this.exit = null;

    this.mainCharacter = null;
    this.countPoint = 0;
    this.requestAnimationId = undefined;
    this.state = GAME_STATUSES.RESUME;
  }

  start() {
    this.requestAnimationId = undefined;
    this.state = GAME_STATUSES.RESUME;
    this.init();
  }

  init() {
    this.initCanvas();
    this.initMainCharacter();
    this.initEnemy();
    this.initFoods();
    this.initExit();
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

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  initFoods() {
    this.foods = Array.from(Array(this.countFoods), () => {
      const foods = new Foods(this.context);

      const startX = this.randomNumber(0, this.canvas.width - foods.width);
      const startY = this.randomNumber(0, this.canvas.height - foods.height);

      foods.init(ARR_IMG_FOODS[Math.floor(Math.random() * Math.floor(ARR_IMG_FOODS.length))], startX, startY);

      return foods;
    });
  }

  initExit() {
    this.exit = new Exit(this.context);

    const x = this.canvas.width - this.exit.width;
    const y = this.canvas.height - this.exit.height;

    this.exit.init(EXIT_IMAGE, x, y);
    this.exit.draw();
  }

  initEnemy() {
    const mainCharacterSafeZone = {
      x: this.mainCharacter.x + this.mainCharacter.width / 2 - SAFE_ZONE_WIDTH / 2,
      y: this.mainCharacter.y + this.mainCharacter.height / 2 - SAFE_ZONE_HEIGHT / 2,
      width: SAFE_ZONE_WIDTH,
      height: SAFE_ZONE_HEIGHT,
    };

    this.enemy = Array.from(Array(this.countEnemy), () => {
      let startX;
      let startY;
      const enemy = new Enemy(this.context);

      enemy?.init();

      do {
        startX = Math.floor(Math.random() * this.canvas.width);
        startY = Math.floor(Math.random() * this.canvas.height);

        enemy.setPosition(startX, startY);
      } while (this.checkCollision(mainCharacterSafeZone, enemy));

      enemy.draw();

      return enemy;
    });
  }

  initMainCharacter() {
    this.mainCharacter = new MainCharacter(this.context);
    this.mainCharacter.init();

    const startX = 0;
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
    const canvasBoundingRect = this.canvas.getBoundingClientRect();

    const mousePositionX = this.canvas.width * (event.clientX - canvasBoundingRect.left) / canvasBoundingRect.width;
    const mousePositionY = this.canvas.height * (event.clientY - canvasBoundingRect.top) / canvasBoundingRect.height;

    if (this.checkMouseOnButton(mousePositionX, mousePositionY)) {
      handlePauseClick();
    } else {
      this.mainCharacter.clickHandler(mousePositionX, mousePositionY);
    }
  }

  checkMouseOnButton (mousePositionX: number, mousePositionY: number) {
    return mousePositionX >= this.pauseButton.x && mousePositionX <= this.pauseButton.x + this.pauseButton.width &&
      mousePositionY >= this.pauseButton.y && mousePositionY <= this.pauseButton.y + this.pauseButton.height;
  }

  pause = () => {
    this.state = GAME_STATUSES.PAUSE;
    this.requestAnimationId = requestAnimationFrame(this.pause);
    this.render();

    this.lastRenderTime = performance.now();
  }

  checkCollision (firstObject: gameObjects, secondObject: gameObjects) {
    let collX = false;
    let collY = false;

    if (
      (firstObject.x + firstObject.width >= secondObject.x) &&
      (firstObject.x <= secondObject.x + secondObject.width)
    ) {
      collX = true;
    }

    if (
      (firstObject.y + firstObject.height >= secondObject.y) &&
      (firstObject.y <= secondObject.y + secondObject.height)
    ) {
      collY = true;
    }

    return collX && collY;
  }

  checkCollisionWithEnemy (enemies: IEnemy[] | null) {
    return enemies?.some((enemy) => {
      return this.checkCollision(enemy, this.mainCharacter);
    });
  }

  checkCollisionWithFood (foods: IFoods[] | null) {
    foods?.forEach((food, index) => {
      if (this.checkCollision(food, this.mainCharacter)) {
        foods.splice(index, 1);
        this.countPoint += 1;
        this.handleSetPoint(this.countPoint);
      }
    });
  }

  resume = () => {
    this.state = GAME_STATUSES.RESUME;
    this.loop();
  }

  finish = () => {
    this.state = GAME_STATUSES.FINISH;
    this.requestAnimationId = requestAnimationFrame(this.finish);
    this.render();
  }

  loop = () => {
    if (this.checkCollisionWithEnemy(this.enemy)) {
      this.handleFinishFailure();
    }

    if (this.exit && this.checkCollision(this.exit, this.mainCharacter)) {
      this.handleFinishSuccess(this.countPoint);

      return;
    }

    const now = performance.now();

    this.timeDelta += (now - this.lastRenderTime) / 1000;

    while (this.timeDelta > INTERVAL_MOTION) {
      this.timeDelta -= INTERVAL_MOTION;
      this.mainCharacter.move();
      this.enemy?.forEach(item => item?.update(this.mainCharacter));
      this.checkCollisionWithFood(this.foods);
    }

    this.lastRenderTime = now;
    this.requestAnimationId = requestAnimationFrame(this.loop);
    this.render();
  }

  render = () => {
    this.clearCanvas();
    this.context.drawImage(BACKGROUND_SCENE, 0, 0, this.canvas.width, this.canvas.height);
    this.context.fillText(`Счет: ${this.countPoint}`, 10, 20);
    this.mainCharacter.draw();
    this.enemy?.forEach(item => item?.draw());
    this.foods?.forEach(item => item?.draw());
    this.exit?.draw();
    this.pauseButton.draw(this.state);
  }
}
