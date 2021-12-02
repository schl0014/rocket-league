import ScoringItem from './ScoringItem.js';

export default class Rocket extends ScoringItem {
  private type: string;

  // private image: HTMLImageElement;

  /**
   * Initialize the Rocket
   *
   * @param type type of the Rocket
   * @param canvasWidth width of the canvas
   * @param canvasHeight heighst of the canvas
   */
  public constructor(type: string, canvasWidth: number, canvasHeight: number) {
    super('Rocket', 3);

    let xPosition = ScoringItem.randomInteger(0, canvasWidth - 200);
    let yPosition = ScoringItem.randomInteger(0, canvasHeight - 200);

    if (type === 'leftToRight') {
      xPosition = 0;
      this.setImage(Rocket.loadNewImage('./assets/rocket-horizontal.png'));
    } else {
      yPosition = 0;
      this.setImage(Rocket.loadNewImage('./assets/rocket-vertical.png'));
    }

    this.setXPosition(xPosition);
    this.setYPosition(yPosition);

    this.type = type;
    this.setSpeed(ScoringItem.randomInteger(5, 15));
  }

  /**
   * Method to move the Rocket
   */
  public move(): void {
    if (this.type === 'leftToRight') {
      this.setXPosition(this.getXPosition() + this.getSpeed());
    } else {
      this.setYPosition(this.getYPosition() + this.getSpeed());
    }
  }

  /**
   * Checks if Rocket is out of canvas
   *
   * @param canvasWidth widht of the canvas
   * @param canvasHeight height of the canvas
   */
  public outOfCanvas(canvasWidth: number, canvasHeight: number): void {
    if (this.type === 'leftToRight') {
      if (this.getXPosition() + this.getImage().width >= canvasWidth) {
        this.setXPosition(0);
        this.setYPosition(ScoringItem.randomInteger(0, canvasHeight));
      }
    } else if (this.getYPosition() + this.getImage().height >= canvasHeight) {
      this.setYPosition(0);
      this.setXPosition(ScoringItem.randomInteger(0, canvasWidth));
    }
  }
}
