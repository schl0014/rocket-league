import GameItem from './GameItem.js';
import KeyboardListener from './KeyboardListener.js';
import PowerUp from './PowerUp.js';
import Rocket from './Rocket.js';

export default class Player extends GameItem {
  private radius:number;

  private keyBoardListener:KeyboardListener;

  /**
   * initilize the player
   *
   * @param canvas the window of the screen
   * @param canvas.width the width of the screen
   * @param canvas.height the height of the screen
   * @param name name of the player
   * @param radius the radius of the ball
   */
  constructor(canvas: HTMLCanvasElement, name:string, radius:number) {
    super(canvas.width / 2, canvas.height / 2, 4, name);
    this.keyBoardListener = new KeyboardListener();
    this.radius = radius;
  }

  /**
   * move the player
   */
  public move():void {
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
      this.xPosition -= this.speed;
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
      this.xPosition += this.speed;
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
      this.yPosition -= this.speed;
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
      this.yPosition += this.speed;
    }
  }

  /**
   * Method to draw the player
   *
   * @param ctx the ctx
   */
  public draw(ctx:CanvasRenderingContext2D): void {
    // console.log(this.player);
    ctx.beginPath();
    ctx.arc(
      this.xPosition,
      this.yPosition,
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
   * checks if the player collides with the rockets
   *
   * @param rockets all the rockets of the game
   */
  public collidesWithRocket(rockets:Rocket[]): void {
    rockets.forEach((rocket) => {
      let testX: number;
      let testY: number;
      if (this.xPosition < rocket.getXPos()) {
        testX = rocket.getXPos();
      } else if (this.xPosition > rocket.getXPos() + rocket.getimage().width) {
        testX = rocket.getXPos() + rocket.getimage().width;
      }

      if (this.yPosition < rocket.getYPos()) {
        testY = rocket.getYPos();
      } else if (this.yPosition > rocket.getYPos() + rocket.getimage().height) {
        testY = rocket.getYPos() + rocket.getimage().height;
      }

      const distX = this.xPosition - testX;
      const distY = this.yPosition - testY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance <= this.radius) {
        // console.log('Collides with Player');
        this.radius += 3;
      }
    });
  }

  /**
   * checks if the player collides with the powerup
   *
   * @param powerup the powerupp object
   */
  public collidesWithPowerup(powerup:PowerUp): void {
    let testX: number;
    let testY: number;
    if (this.xPosition < powerup.getXPos()) {
      testX = powerup.getXPos();
    } else if (this.xPosition > powerup.getXPos() + powerup.getimage().width) {
      testX = powerup.getXPos() + powerup.getimage().width;
    }

    if (this.yPosition < powerup.getYPos()) {
      testY = powerup.getYPos();
    } else if (this.yPosition > powerup.getYPos() + powerup.getimage().height) {
      testY = powerup.getYPos() + powerup.getimage().height;
    }

    const distX = this.xPosition - testX;
    const distY = this.yPosition - testY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance <= this.radius) {
      console.log('Collides with Player');
      this.radius -= 3;
    }
  }
}
