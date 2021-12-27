import GameItem from './GameItem.js';

export default abstract class ScoringItem extends GameItem {
  private points:number;

  protected image:HTMLImageElement;

  /**
   * initilize the scoringobject
   *
   * @param xPos x position of the scoringobject
   * @param yPos y position of the scoringobject
   * @param speed speed of the rocket
   * @param name the name of the scoringobject
   * @param image image source
   */
  constructor(xPos:number, yPos:number, speed:number, name:string, image:HTMLImageElement) {
    super(xPos, yPos, speed, name);
    this.image = image;
    // this.speed = speed;
  }

  /**
   *get the x position of the rocket
   *
   * @returns x position
   */
  public getXPos():number {
    return this.xPosition;
  }

  /**
   *get the y position of hte roket
   *
   * @returns the y position of the rocket
   */
  public getYPos():number {
    return this.yPosition;
  }

  /**
   * get the image of the rocket
   *
   * @returns the image of the rocket
   */
  public getimage():HTMLImageElement {
    return this.image;
  }

  /**
   * draw the rocket
   *
   * @param ctx ctx of the game
   */
  public draw(ctx:CanvasRenderingContext2D):void {
    ctx.drawImage(this.image, this.xPosition, this.yPosition);
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
  public static randomInteger(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
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
  public static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}
