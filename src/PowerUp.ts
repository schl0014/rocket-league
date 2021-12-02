import ScoringItem from './ScoringItem.js';

export default class PowerUp extends ScoringItem {
  /**
   * Initialize the PowerUp
   *
   * @param canvasWidth width of the canvas
   * @param canvasHeight height of the canvas
   */
  public constructor(canvasWidth: number, canvasHeight: number) {
    super('Power up!', -6);
    this.setImage(ScoringItem.loadNewImage('./assets/face_on_plus_health.png'));
    this.setXPosition(ScoringItem.randomInteger(0, canvasWidth - 200));
    this.setYPosition(ScoringItem.randomInteger(0, canvasHeight - 200));
  }

  /**
   * Method to move the PowerUp
   */
  public move(): void {
    this.setXPosition(ScoringItem.randomInteger(this.getYPosition(), 400));
  }

  /**
   * Checks if PowerUp is out of canvas
   *
   * @param canvasWidth widht of the canvas
   * @param canvasHeight height of the canvas
   */
  public outOfCanvas(canvasWidth: number, canvasHeight: number): void {
    if (this.getXPosition() + this.getImage().width >= canvasWidth) {
      this.setXPosition(ScoringItem.randomInteger(0, canvasWidth - 200));
      this.setYPosition(ScoringItem.randomInteger(0, canvasHeight - 200));
    }
  }
}
