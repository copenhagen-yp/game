import { userActions } from '../../../store/user';
import { MainCharacter } from '../main-character';
import { Enemy, IEnemy } from '../enemy';
import { Foods, IFoods } from '../foods';
import { PauseButton } from '../pause-button';
import { GAME_STATUSES } from '../../../store/game/constants';

const INTERVAL_MOTION = 1 / 60;
const BACKGROUND_SCENE = new Image();

// Модификаторы для размера главного персонажа
// Устраняют неидеальность спрайта
// при расчёте коллизии с врагом
const WIDTH_MODIFIER = 5;
const HEIGHT_MODIFIER = 10;

BACKGROUND_SCENE.src = '/images/bg_grass.jpg';

const ARR_IMG_FOODS: string[] = ['/images/mushroom.png', '/images/raspberries.png'];

export class PlayGround {
  private canvas: any | null;
  private context: any | null;
  private dispatch: any;

  private mainCharacter: any | null;

  private enemy: IEnemy[] | null;
  private countEnemy: number;

  private foods: IFoods[] | null;
  private countFoods: number;

  private requestAnimationId: any | undefined;
  private lastRenderTime: number;
  private timeDelta: number;
  private pauseButton: any;
  private canvasBoundingRect: any;
  private state: 'resume' | 'pause' | 'finish';
  private handleFinish: () => void;

  constructor(canvas: any, context: any, handleFinish: () => void, dispatch: any) {
    this.canvas = canvas;
    this.context = context;
    this.handleFinish = handleFinish;
    this.canvasBoundingRect = this.canvas.getBoundingClientRect();
    this.dispatch = dispatch;

    this.lastRenderTime = 0;
    this.timeDelta = 0;

    this.foods = null;
    this.countFoods = 5;

    this.enemy = null;
    this.countEnemy = 2;

    this.mainCharacter = null;
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

  didCollide() {
    if (this.foods) {
      for ( let index = 0; index < this.foods.length; index++) {

        const itemFood = this.foods[index];
  
        let XColl = false;
        let YColl = false;
    
        if ((itemFood.x + itemFood.width >= this.mainCharacter.x) 
            && (itemFood.x - itemFood.width <= this.mainCharacter.x + this.mainCharacter.width)) {
          XColl = true;
        }
    
        if ((itemFood.y + itemFood.width >= this.mainCharacter.y ) 
            && (itemFood.y - itemFood.width <= this.mainCharacter.y + this.mainCharacter.width)) {
          YColl = true;
        }
  
        if (XColl && YColl) {
          this.foods.splice(index, 1);
          this.dispatch(userActions.pointUser(1));
        }
      }
    }
  }

  clearCanvas() {
    if(this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  handleClickCanvas(event: MouseEvent, handlePauseClick: () => void) {
    const mousePositionX = event.clientX - this.canvasBoundingRect.left;
    const mousePositionY = event.clientY - this.canvasBoundingRect.top;

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

  checkCollisionWithEnemy () {
    return this.enemy?.some((enemy) => {
      let XColl = false;
      let YColl = false;

      if (
        (this.mainCharacter.x + this.mainCharacter.width - WIDTH_MODIFIER >= enemy.x) &&
        (this.mainCharacter.x <= enemy.x + enemy.width)
      ) {
        XColl = true;
      }

      if (
        (this.mainCharacter.y + this.mainCharacter.height - HEIGHT_MODIFIER >= enemy.y) &&
        (this.mainCharacter.y <= enemy.y + enemy.height)
      ) {
        YColl = true;
      }

      return XColl && YColl;
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
    if (this.checkCollisionWithEnemy()) {
      this.handleFinish();
    }

    const now = performance.now();

    this.timeDelta += (now - this.lastRenderTime) / 1000;

    while (this.timeDelta > INTERVAL_MOTION) {
      this.timeDelta -= INTERVAL_MOTION;
      this.mainCharacter.move();
      this.enemy?.forEach(item => item?.update(this.mainCharacter));
      this.didCollide();
    }

    this.lastRenderTime = now;
    this.requestAnimationId = requestAnimationFrame(this.loop);
    this.render();
  }

  render = () => {
    this.clearCanvas();
    this.context.drawImage(BACKGROUND_SCENE, 0, 0, this.canvas.width, this.canvas.height);
    this.mainCharacter.draw();
    this.enemy?.forEach(item => item?.draw());
    this.foods?.forEach(item => item?.draw());
    this.pauseButton.draw(this.state);
  }
}
