import KeyboardListener from './KeyboardListener.js';
import GameItem from './GameItem.js';
import ScoringItem from './ScoringItem.js';

export default class Player extends GameItem {
  private radius: number;

  private keyBoardListener: KeyboardListener;

  /**
   * Initialize the player
   *
   * @param canvasWidth width of the canvas
   * @param canvasHeight height of the canvas
   */
  public constructor(canvasWidth: number, canvasHeight: number) {
    super('Player');
    this.setXPosition(canvasWidth / 2);
    this.setYPosition(canvasHeight / 2);
    this.setSpeed(4);
    this.radius = 15;

    this.keyBoardListener = new KeyboardListener();
  }

  /**
   * Method to draw the player on the canvas
   *
   * @param ctx the rendering context of the canvas
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(
      this.getXPosition(),
      this.getYPosition(),
      this.radius,
      0,
      Math.PI * 2,
      false,
    );
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }

  /**
   * Method to move the player on the canvas
   */
  public move(): void {
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
      this.setXPosition(this.getXPosition() - this.getSpeed());
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
      this.setXPosition(this.getXPosition() + this.getSpeed());
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
      this.setYPosition(this.getYPosition() - this.getSpeed());
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
      this.setYPosition(this.getYPosition() + this.getSpeed());
    }
  }

  /**
   * Method to find out if player collides with a scoring item
   *
   * @param scoringItems array of scoringItems
   */
  public collidesWithScoringItem(scoringItems: ScoringItem[]): void {
    scoringItems.forEach((scoringItem, index) => {
      let testX: number;
      let testY: number;
      if (this.getXPosition() < scoringItem.getXPosition()) {
        testX = scoringItem.getXPosition();
      } else if (
        this.getXPosition() > scoringItem.getXPosition() + scoringItem.getImage().width
      ) {
        testX = scoringItem.getXPosition() + scoringItem.getImage().width;
      }

      if (this.getYPosition() < scoringItem.getYPosition()) {
        testY = scoringItem.getYPosition();
      } else if (
        this.getYPosition() > scoringItem.getYPosition() + scoringItem.getImage().height
      ) {
        testY = scoringItem.getYPosition() + scoringItem.getImage().height;
      }

      const distX = this.getXPosition() - testX;
      const distY = this.getYPosition() - testY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance <= this.radius) {
        console.log('Collides with Player');
        // TODO: make sure the player does not shrink to unvisible portions :-)
        this.radius += scoringItem.getPoints();
        if (
          scoringItem.getPoints() < 0 && this.radius > scoringItem.getPoints() + 3
        ) {
          scoringItems.splice(index, 1);
        }
      }
    });
  }
}
