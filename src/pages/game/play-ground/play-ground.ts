import { MainCharacter } from '../main-character';
import { Enemy, IEnemy } from '../enemy';
import { Foods, IFoods } from '../foods';
import { Exit, IExit } from '../exit';
import { Wall, IWall } from '../wall';
import { PauseButton } from '../pause-button';
import { GAME_STATUSES } from '../../../store/game/constants';
import { IPlayGround } from './types';
import { LevelType, CellType } from '../types';

import { checkCollision } from '../helpers';
import { BASE_SIZE } from '../constans';


const INTERVAL_MOTION = 1 / 60;
const MAIN_CHARACTER_SPRITE_RATIO = 1.212;
const ENEMY_SPRITE_RATIO = 1.12;

const ARR_IMG_FOODS: string[] = ['/images/mushroom.png', '/images/raspberries.png'];
const EXIT_IMAGE = '/images/exit.png';
const WALL_IMAGE = '/images/wall.png';

export class PlayGround {
  private canvas: any | null;
  private context: CanvasRenderingContext2D;

  private mainCharacter: any | null;
  private countPoint: number;

  private enemies: IEnemy[];

  private foods: IFoods[];

  private exit: IExit | null;
  private walls: IWall[];

  private requestAnimationId: any | undefined;
  private lastRenderTime: number;
  private timeDelta: number;
  private pauseButton: any;
  private state: 'resume' | 'pause' | 'finish';
  private handleFinishFailure: () => void;
  private handleFinishSuccess: (countPoint: number) => void;
  private handleSetPoint: (point: number) => void;
  private image: HTMLImageElement;
  private imageReady = false;
  private levelInfo: LevelType;

  constructor( { canvas, context, handleFinishFailure,
    handleFinishSuccess, handleSetPoint, levelInfo } : IPlayGround) {
    this.canvas = canvas;
    this.context = context;
    this.handleFinishFailure = handleFinishFailure;
    this.handleFinishSuccess = handleFinishSuccess;
    this.handleSetPoint = handleSetPoint;
    this.levelInfo = levelInfo;

    this.lastRenderTime = 0;
    this.timeDelta = 0;

    this.foods = [];

    this.enemies = [];

    this.exit = null;
    this.walls = [];

    this.mainCharacter = null;
    this.countPoint = 0;
    this.requestAnimationId = undefined;
    this.state = GAME_STATUSES.RESUME;

    this.image = new Image();
    this.image.src = '/images/bg_grass.jpg';

    this.image.onload = () => {
      this.imageReady = true;
    };

  }

  start() {
    this.requestAnimationId = undefined;
    this.state = GAME_STATUSES.RESUME;
    this.init();
  }

  init() {
    this.countPoint = 0;
    this.initWalls();
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
    this.foods = this.levelInfo.FOODS.map((cell: CellType) => {
      const food = new Foods(this.context, BASE_SIZE - 15, BASE_SIZE - 15);

      const x = cell.x * BASE_SIZE + (BASE_SIZE - food.width) / 2;
      const y = cell.y * BASE_SIZE + (BASE_SIZE - food.height) / 2;

      food.init(ARR_IMG_FOODS[Math.floor(Math.random() * Math.floor(ARR_IMG_FOODS.length))], x, y);

      return food;
    });
  }

  initExit() {
    this.exit = new Exit(this.context, BASE_SIZE, BASE_SIZE);

    const x = this.levelInfo.EXIT.x * BASE_SIZE;
    const y = this.levelInfo.EXIT.y * BASE_SIZE;

    this.exit.init(EXIT_IMAGE, x, y);
    this.exit.draw();
  }

  initWalls() {
    this.levelInfo.WALLS.forEach((cell: CellType) => {
      const wall = new Wall(this.context, BASE_SIZE, BASE_SIZE);

      const x = cell.x * BASE_SIZE;
      const y = cell.y * BASE_SIZE;

      wall.init(WALL_IMAGE, x, y);
      wall.draw();

      this.walls.push(wall);
    });
  }

  initEnemy() {
    this.enemies = this.levelInfo.ENEMIES.map((cell: CellType) => {
      const enemy = new Enemy(this.context, BASE_SIZE, BASE_SIZE / ENEMY_SPRITE_RATIO);

      const x = cell.x * BASE_SIZE;
      const y = cell.y * BASE_SIZE;

      enemy.init();

      enemy.setPosition(x, y);

      enemy.draw();

      return enemy;
    });
  }

  initMainCharacter() {
    this.mainCharacter = new MainCharacter(this.context, BASE_SIZE, BASE_SIZE / MAIN_CHARACTER_SPRITE_RATIO);
    this.mainCharacter.init();

    const startX = this.levelInfo.MAIN_CHARACTER.x * BASE_SIZE;
    const startY = this.levelInfo.MAIN_CHARACTER.y * BASE_SIZE;

    this.mainCharacter.setPosition(startX, startY);
    this.mainCharacter.setWalls(this.walls);
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
    }
    // else {
    //   this.mainCharacter.clickHandler(mousePositionX, mousePositionY);
    // }
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

  checkCollisionWithEnemy (enemies: IEnemy[] | null) {
    return enemies?.some((enemy) => {
      return checkCollision(enemy, this.mainCharacter);
    });
  }

  checkCollisionWithFood (foods: IFoods[] | null) {
    foods?.forEach((food, index) => {
      if (checkCollision(food, this.mainCharacter)) {
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
    if (this.checkCollisionWithEnemy(this.enemies)) {
      this.handleFinishFailure();
    }

    if (this.exit && checkCollision(this.exit, this.mainCharacter)) {
      this.handleFinishSuccess(this.countPoint);

      return;
    }

    const now = performance.now();

    this.timeDelta += (now - this.lastRenderTime) / 1000;

    while (this.timeDelta > INTERVAL_MOTION) {
      this.timeDelta -= INTERVAL_MOTION;
      this.mainCharacter.move();
      this.enemies.forEach(item => item.update(this.mainCharacter));
      this.checkCollisionWithFood(this.foods);
    }

    this.lastRenderTime = now;
    this.requestAnimationId = requestAnimationFrame(this.loop);
    this.render();
  }

  render = () => {
    if (!this.imageReady) {
      return;
    }

    this.clearCanvas();
    this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    this.context.fillText(`Счет: ${this.countPoint}`, 10, 20);
    this.mainCharacter.draw();
    this.enemies.forEach(item => item.draw());
    this.foods.forEach(item => item.draw());
    this.exit?.draw();
    this.walls.forEach(item => item.draw());
    this.pauseButton.draw(this.state);
  }
}
