import { MainCharacter } from '../main-character';
import { Enemy, IEnemy } from '../enemy';
import { Foods, IFoods } from '../foods';

const INTERVAL_MOTION = 1 / 60;
const BACKGROUND_SCENE = new Image();

BACKGROUND_SCENE.src = '/images/bg_grass.jpg';

const ARR_IMG_FOODS: string[] = ['/images/mushroom.png', '/images/raspberries.png'];

export class PlayGround {
  private canvas: any | null;
  private context: any | null;

  private mainCharacter: any | null;

  private enemy: IEnemy[] | null;
  private countEnemy: number;

  private foods: IFoods[] | null;
  private countFoods: number;

  private requestAnimationId: any | undefined;
  private lastTime: number;
  private timeDelta: number;

  constructor(canvas: any, context: any) {
    this.canvas = canvas;
    this.context = context;

    this.lastTime = 0;
    this.timeDelta = 0;
    

    this.foods = null;
    this.countFoods = 5;

    this.enemy = null;
    this.countEnemy = 2;

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
    this.initEnemy();
    this.initFoods();

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

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  initFoods () {
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
        }
      }
    }
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
      this.enemy?.forEach(item => item?.update(this.mainCharacter));
      this.didCollide();
    }

    this.lastTime = now;

    this.clearCanvas();
    this.context.drawImage(BACKGROUND_SCENE, 0, 0, this.canvas.width, this.canvas.height);
    this.mainCharacter.draw();
    this.enemy?.forEach(item => item?.draw());
    this.foods?.forEach(item => item?.draw());
    this.requestAnimationId = requestAnimationFrame(this.render);
  }
}
