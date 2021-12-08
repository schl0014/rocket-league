import Player from './Player.js';
import PowerUp from './PowerUp.js';
import Rocket from './Rocket.js';
import ScoringItem from './ScoringItem.js';

export default class Game {
  private rockets: Rocket[];

  private player: Player;

  private canvas: HTMLCanvasElement;

  private score: number;

  private ctx: CanvasRenderingContext2D;

  private powerup:PowerUp;

  /**
   * Construct the Game
   *
   * @param canvasId - id of the canvas
   */
  public constructor(canvasId: HTMLElement) {
    // Construct all of the canvas
    this.canvas = <HTMLCanvasElement>canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.rockets = [];

    // add some rockets
    for (let index = 0; index < 10; index++) {
      if (index % 2 === 0) {
        this.rockets.push(new Rocket(ScoringItem.loadNewImage('./assets/rocket-horizontal.png'), 0,
          ScoringItem.randomInteger(0, this.canvas.height - 200), 'leftToRight', 1, this.canvas));
        console.log('leftToRight');
      } else {
        this.rockets.push(new Rocket(ScoringItem.loadNewImage('/assets/rocket-vertical.png'), ScoringItem.randomInteger(0, this.canvas.width - 200),
          0, 'high to low', 1, this.canvas));
      }
    }

    console.log(this.rockets);
    this.player = new Player(this.canvas, 'Niek', 15);
    this.powerup = new PowerUp(ScoringItem.loadNewImage('./assets/face_on_plus_health.png'), 0,
      ScoringItem.randomInteger(0, this.canvas.height - 200), 'leftToRightHeal', 4, this.canvas);
    console.log(this.powerup);
    // this.player = this.createPlayer('Me');
    console.log(this.player);

    this.score = 0;
    this.loop();
  }

  /**
   * Method for the Game Loop
   */
  public loop = (): void => {
    this.score += 1;
    this.draw();
    this.powerup.draw(this.ctx);
    this.powerup.move();
    this.powerup.outOfCanvas();

    for (let i = 0; i < this.rockets.length; i++) {
      this.rockets[i].move(this.rockets);
      this.rockets[i].outOfCanvas();
    }
    this.player.collidesWithRocket(this.rockets);
    this.player.collidesWithPowerup(this.powerup);

    this.player.move();

    requestAnimationFrame(this.loop);
  };

  /**
   * Draws all the necessary elements to the canvas
   */
  public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    // when there are elements in the rocket array
    if (this.rockets.length !== 0) {
      // clear the canvas

      // draw each rocket
      for (let i = 0; i < this.rockets.length; i++) {
        this.rockets[i].draw(this.ctx);
      }

      // this.rockets.forEach((rocket) => {
      //   this.ctx.drawImage(rocket.image, rocket.xPos, rocket.yPos);
      // });

      //  write the current score
      this.writeTextToCanvas(
        `Score is: ${this.score}`,
        this.canvas.width / 10,
        this.canvas.height / 10,
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
  public writeTextToCanvas(
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
