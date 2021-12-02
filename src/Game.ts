import Player from './Player.js';
import Rocket from './Rocket.js';
import ScoringItem from './ScoringItem.js';
import PowerUp from './PowerUp.js';

export default class Game {
  private scoringItems: ScoringItem[];

  private player: Player;

  private canvas: HTMLCanvasElement;

  private score: number;

  private ctx: CanvasRenderingContext2D;

  private frameCounter: number;

  /**
   * Initialize the Game class
   *
   * @param canvasId id of the canvas
   */
  public constructor(canvasId: HTMLCanvasElement) {
    // Construct all of the canvas
    this.canvas = canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');
    this.scoringItems = [];

    // add some rockets
    for (let index = 0; index < 10; index++) {
      if (index % 2 === 0) {
        console.log('leftToRight');
        this.scoringItems.push(
          new Rocket('leftToRight', this.canvas.width, this.canvas.height),
        );
      } else {
        console.log('topToBottom');
        this.scoringItems.push(
          new Rocket('topToBottom', this.canvas.width, this.canvas.height),
        );
      }
    }

    console.log(this.scoringItems);

    this.player = new Player(this.canvas.width, this.canvas.height);
    console.log(this.player);

    this.score = 0;
    this.frameCounter = 0;
    this.loop();
  }

  /**
   * Method for the Game Loop
   */
  private loop = (): void => {
    this.score += 1;
    this.frameCounter += 1;
    this.move();
    this.scoringItemOutOfCanvas();
    this.player.collidesWithScoringItem(this.scoringItems);

    // Every 500 frames add a power up
    if (this.frameCounter % 500 === 0) {
      this.scoringItems.push(new PowerUp(this.canvas.width, this.canvas.height));
    }

    this.draw();

    requestAnimationFrame(this.loop);
  };

  /**
   * Method to move the scoring items
   */
  private move(): void {
    this.scoringItems.forEach((scoringItem) => {
      if (scoringItem instanceof PowerUp && this.frameCounter % 300 === 0) {
        scoringItem.move();
      } else {
        scoringItem.move();
      }
    });
    this.player.move();
  }

  /**
   * Method to determine of a scoring items leaves the window
   */
  private scoringItemOutOfCanvas(): void {
    this.scoringItems.forEach((scoringItem) => {
      scoringItem.outOfCanvas(this.canvas.width, this.canvas.height);
    });
  }

  /**
   * Draws all the necessary elements to the canvas
   */
  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    // when there are elements in the scoring items array
    if (this.scoringItems.length !== 0) {
      // draw each scoring item
      this.scoringItems.forEach((scoringItem) => {
        scoringItem.draw(this.ctx);
      });

      // write the current score
      this.writeTextToCanvas(
        `Score is: ${this.score}`,
        this.canvas.width / 2,
        40,
      );
    }
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param fontSize - Font size in pixels
   * @param color - The color of the text
   * @param alignment - Where to align the text
   */
  private writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize: number = 20,
    color: string = 'red',
    alignment: CanvasTextAlign = 'center',
  ): void {
    const ctx = this.canvas.getContext('2d');
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
  }
}
