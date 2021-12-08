import ScoringItem from './ScoringItem.js';

export default class PowerUp extends ScoringItem {
  private canvas:HTMLCanvasElement;

  /**
   * inilize the powerup class
   *
   * @param imageSrc the image source of the powerup
   * @param xPos the xposition of the power up
   * @param yPos y position of the powerup
   * @param name the name of the powerup
   * @param speed the speed of the powerup
   * @param canvas the canvas of the game
   */
  constructor(imageSrc:HTMLImageElement, xPos:number, yPos:number,
    name:string, speed :number, canvas:HTMLCanvasElement) {
    super(xPos, yPos, speed, name, imageSrc);
    this.canvas = canvas;
  }

  /**
   *
   */
  public move():void {
    this.xPosition += ScoringItem.randomInteger(0, this.speed);
    this.yPosition += ScoringItem.randomInteger(0, this.speed);
  }

  /**
   * Method to determine of a rocket leaves the window
   *
   */
  public outOfCanvas(): void {
    if (this.xPosition + this.image.width >= this.canvas.width) {
      this.xPosition = 0;
      this.yPosition = ScoringItem.randomInteger(0, this.canvas.height);
    } else if (this.yPosition + this.image.height >= this.canvas.height) {
      this.yPosition = 0;
      this.xPosition = ScoringItem.randomInteger(0, this.canvas.width);
    }
  }
}
