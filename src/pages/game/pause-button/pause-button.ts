const BUTTON_TEXT = {
  PLAY: 'Играть',
  PAUSE: 'Пауза',
}

export class PauseButton {
  private readonly x: number;
  private readonly y: number;
  private readonly width: number;
  private readonly height: number;
  private readonly lineWidth: number;
  private state: 'resume' | 'pause';
  private context: any;
  private readonly textWidthPause: number;
  private readonly textWidthPlay: number;

  constructor(context: any) {
    this.context = context;
    this.width = 80;
    this.height = 40;
    this.lineWidth = 3;
    this.x = this.context.canvas.clientWidth - this.width - this.lineWidth;
    this.y = this.lineWidth;
    this.state = 'resume';

    this.context.lineWidth = this.lineWidth;
    this.context.font = '20px Arial';
    this.context.strokeStyle = 'white';
    this.context.fillStyle = 'white';

    this.textWidthPause = this.context.measureText(BUTTON_TEXT.PAUSE).width;
    this.textWidthPlay = this.context.measureText(BUTTON_TEXT.PLAY).width;
  }

  draw () {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.stroke();

    switch(this.state) {
      case 'resume':
        this.context.fillText(BUTTON_TEXT.PAUSE,this.x + this.width / 2 - this.textWidthPause / 2,this.y + this.height / 2 + 5);

        break;
      default:
        this.context.fillText(BUTTON_TEXT.PLAY,this.x + this.width / 2 - this.textWidthPlay / 2,this.y + this.height / 2 + 5);
    }
  }
}
