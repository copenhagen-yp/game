import { GAME_STATUSES } from '../../../store/game/constants';

const BUTTON_TEXT = {
  PLAY: 'Играть',
  PAUSE: 'Пауза',
};

export class PauseButton {
  private readonly x: number;
  private readonly y: number;
  private readonly width: number;
  private readonly height: number;
  private readonly lineWidth: number;
  private context: CanvasRenderingContext2D;
  private readonly textWidthPause: number;
  private readonly textWidthPlay: number;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.width = 80;
    this.height = 40;
    this.lineWidth = 3;
    this.x = this.context.canvas.width - this.width - this.lineWidth;
    this.y = this.lineWidth;

    this.context.lineWidth = this.lineWidth;
    this.context.font = '20px Arial';
    this.context.strokeStyle = 'white';
    this.context.fillStyle = 'white';

    this.textWidthPause = this.context.measureText(BUTTON_TEXT.PAUSE).width;
    this.textWidthPlay = this.context.measureText(BUTTON_TEXT.PLAY).width;
  }

  draw (state: string) {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);

    switch(state) {
      case GAME_STATUSES.RESUME:
        this.context.fillText(BUTTON_TEXT.PAUSE,this.x + this.width / 2 - this.textWidthPause / 2,this.y + this.height / 2 + 5);
        this.context.stroke();
        break;

      case GAME_STATUSES.PAUSE:
        this.context.fillText(BUTTON_TEXT.PLAY,this.x + this.width / 2 - this.textWidthPlay / 2,this.y + this.height / 2 + 5);
        this.context.stroke();
        break;

      default:
        break;
    }
  }
}
