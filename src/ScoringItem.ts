import GameItem from './GameItem.js';

export default abstract class ScoringItem extends GameItem {
  private points: number;

  private image: HTMLImageElement;

  /**
   * Initialize the ScoringItem class
   *
   * @param name name of the Game
   * @param points points
   */
  public constructor(name: string, points: number) {
    super(name);
    this.points = points;
  }

  /**
   * Get the points
   *
   * @returns points
   */
  public getPoints(): number {
    return this.points;
  }

  /**
   * Get image of the item
   *
   * @returns image of the item
   */
  public getImage(): HTMLImageElement {
    return this.image;
  }

  /**
   * Set the image of the item
   *
   * @param image image of the item
   */
  protected setImage(image: HTMLImageElement): void {
    this.image = image;
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
   * Abstract method to move item
   */
  public abstract move(): void;

  /**
   * Abstract method to determine if item is out of canvas
   *
   * @param canvasWidth width of the canvas
   * @param canvasHeight height of the canvas
   */
  public abstract outOfCanvas(canvasWidth: number, canvasHeight: number): void;

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

  /**
   * Generates a random integer number between min and max
   *
   * NOTE: this is a 'static' method. This means that this method must be called like
   * `Game.randomInteger()` instead of `this.randomInteger()`.
   *
   * @param min - minimal time
   * @param max - maximal time
   * @returns a random integer number between min and max
   */
  protected static randomInteger(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}
