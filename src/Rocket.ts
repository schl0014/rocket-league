import GameItem from './GameItem.js';

export default class Rocket extends GameItem {
  private type: string;

  private image: HTMLImageElement;

  /**
   * Initialize the Rocket
   *
   * @param type type of the Rocket
   * @param canvasWidth width of the canvas
   * @param canvasHeight heighst of the canvas
   */
  public constructor(type: string, canvasWidth: number, canvasHeight: number) {
    super('Rocket');

    let xPosition = GameItem.randomInteger(0, canvasWidth - 200);
    let yPosition = GameItem.randomInteger(0, canvasHeight - 200);

    if (type === 'leftToRight') {
      xPosition = 0;
      this.image = Rocket.loadNewImage('./assets/rocket-horizontal.png');
    } else {
      yPosition = 0;
      this.image = Rocket.loadNewImage('./assets/rocket-vertical.png');
    }

    this.setXPosition(xPosition);
    this.setYPosition(yPosition);

    this.type = type;
    this.setSpeed(GameItem.randomInteger(5, 15));
  }

  /**
   * Get the image of the rocket
   *
   * @returns the image of the rocket
   */
  public getImage(): HTMLImageElement {
    return this.image;
  }

  /**
   * Method to draw the Rocket on the canvas
   *
   * @param ctx rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.getXPosition(), this.getYPosition());
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
      if (this.getXPosition() + this.image.width >= canvasWidth) {
        this.setXPosition(0);
        this.setYPosition(GameItem.randomInteger(0, canvasHeight));
      }
    } else if (this.getYPosition() + this.image.height >= canvasHeight) {
      this.setYPosition(0);
      this.setXPosition(GameItem.randomInteger(0, canvasWidth));
    }
  }

  /**
   * Loads an image in such a way that the screen doesn't constantly flicker
   *
   *
   * NOTE: this is a 'static' method. This means that this method must be called like
   * `Game.loadNewImage()` instead of `this.loadNewImage()`.
   *
   * @param source The address or URL of the a media resource that is to be loaded
   * @returns an HTMLImageElement with the source as its src attribute
   */
  protected static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}
