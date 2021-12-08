import ScoringItem from './ScoringItem.js';

export default class Rocket extends ScoringItem {
  private canvas:HTMLCanvasElement;

  /**
   * initilize the Rocket
   *
   * @param imageSrc image source
   * @param xPos x position of the rocket
   * @param yPos y position of the rocket
   * @param name the name of the rocket
   * @param speed speed of the rocket
   * @param canvas canvas of the game
   */
  constructor(imageSrc:HTMLImageElement, xPos:number, yPos:number,
    name:string, speed :number, canvas:HTMLCanvasElement) {
    super(xPos, yPos, speed, name, imageSrc);
    this.canvas = canvas;
  }

  /**
   * Method to move the rockets
   *
   * @param rockets all the rockets
   */
  public move(rockets:Rocket[]): void {
    rockets.forEach((rocket:Rocket) => {
      // console.log(rocket.xPos);
      if (rocket.name === 'leftToRight') {
        // eslint-disable-next-line no-param-reassign
        rocket.xPosition += ScoringItem.randomInteger(0, this.speed);
      } else {
        // eslint-disable-next-line no-param-reassign
        rocket.yPosition += ScoringItem.randomInteger(0, this.speed);
      }
    });
  }

  /**
   * Method to determine of a rocket leaves the window
   *
   */
  public outOfCanvas(): void {
    if (this.name === 'leftToRight') {
      if (this.xPosition + this.image.width >= this.canvas.width) {
        this.xPosition = 0;
        this.yPosition = ScoringItem.randomInteger(0, this.canvas.height);
      }
    } else if (this.yPosition + this.image.height >= this.canvas.height) {
      this.yPosition = 0;
      this.xPosition = ScoringItem.randomInteger(0, this.canvas.width);
    }
  }
}
