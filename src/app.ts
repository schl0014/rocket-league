import KeyboardListener from './KeyboardListener.js';

class Game {
  private rockets: any[];

  private player: any;

  private canvas: HTMLCanvasElement;

  private score: number;

  private ctx: CanvasRenderingContext2D;

  private keyBoardListener: KeyboardListener;

  /**
   * Construct the Game
   * @param {HTMLCanvasElement} canvasId - id of the canvas
   */
  public constructor(canvasId: HTMLElement) {
    // Construct all of the canvas
    this.canvas = <HTMLCanvasElement>canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.rockets = [];

    this.keyBoardListener = new KeyboardListener();

    // add some rockets
    for (let index = 0; index < 10; index++) {
      if (index % 2 === 0) {
        this.rockets.push(this.rocketFactory('Rocket', 'leftToRight'));
        console.log('leftToRight');
      } else {
        this.rockets.push(this.rocketFactory('Rocket', 'topToBottom'));
      }
    }

    console.log(this.rockets);

    this.player = this.createPlayer('Me');
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
    this.move();
    this.rocketOutOfCanvas();
    this.playerCollidesWithRocket();

    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
      this.player.xPos -= this.player.speed;
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
      this.player.xPos += this.player.speed;
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
      this.player.yPos -= this.player.speed;
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
      this.player.yPos += this.player.speed;
    }

    requestAnimationFrame(this.loop);
  };

  /**
   * Method to create a Rocket object
   * @param {string} name - name of the rocket
   * @param {string} type - type of the rocket
   * @returns Rocket - returns a rocket object
   *
   * The rocket object has the following attributes:
   * - name of the rocket object
   * - xPos: x position on the canvas
   * - yPos: y position on the canvas
   * - type: type of the rocket. The type will be used to determine left-to-right or 
   *         top-to-bottom movement
   * - speed: speed of the rocket
   * - image: an HTMLimageElement
   */
  public rocketFactory(name: string, type: string): any {
    let xPosition = this.randomNumber(0, this.canvas.width - 200);
    let yPosition = this.randomNumber(0, this.canvas.height - 200);
    let image: HTMLImageElement;

    if (type === 'leftToRight') {
      xPosition = 0;
      image = this.loadNewImage('./assets/rocket-horizontal.png');
    } else {
      yPosition = 0;
      image = this.loadNewImage('./assets/rocket-vertical.png');
    }

    return {
      name: name,
      xPos: xPosition,
      yPos: yPosition,
      type: type,
      speed: this.randomNumber(0, 15),
      image: image,
    };
  }

  /**
   * Method to create a player object
   * @param {string} name - name of the player
   * @returns {any} player - player object
   */
  public createPlayer(name: string): any {
    return {
      name: name,
      xPos: this.canvas.width / 2,
      yPos: this.canvas.height / 2,
      radius: 15,
      speed: 4,
    };
  }

  /**
   * Method to determine of the player is colliding with a rocket
   */
  public playerCollidesWithRocket(): void {
    this.rockets.forEach((rocket) => {
      let testX: number;
      let testY: number;
      if (this.player.xPos < rocket.xPos) {
        testX = rocket.xPos;
      } else if (this.player.xPos > rocket.xPos + rocket.image.width) {
        testX = rocket.xPos + rocket.image.width;
      }

      if (this.player.yPos < rocket.yPos) {
        testY = rocket.yPos;
      } else if (this.player.yPos > rocket.yPos + rocket.image.height) {
        testY = rocket.yPos + rocket.image.height;
      }

      const distX = this.player.xPos - testX;
      const distY = this.player.yPos - testY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance <= this.player.radius) {
        console.log('Collides with Player');
        this.player.radius += 3;
      }
    });
  }

  /**
   * Method to move the rockets
   */
  public move(): void {
    this.rockets.forEach((rocket) => {
      if (rocket.type === 'leftToRight') {
        rocket.xPos += rocket.speed;
      } else {
        rocket.yPos += rocket.speed;
      }
    });
  }

  /**
   * Method to determine of a rocket leaves the window
   */
  public rocketOutOfCanvas(): void {
    this.rockets.forEach((rocket) => {
      if (rocket.type === 'leftToRight') {
        if (rocket.xPos + rocket.image.width >= this.canvas.width) {
          rocket.xPos = 0;
          rocket.yPos = this.randomNumber(0, this.canvas.height);
        }
      } else if (rocket.yPos + rocket.image.height >= this.canvas.height) {
          rocket.yPos = 0;
          rocket.xPos = this.randomNumber(0, this.canvas.height);
      }
    });
  }

  /**
   * Loads an image so it doesn't flicker
   * @param {HTMLImageElement} source
   * @returns HTMLImageElement - returns an image
   */
  public loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * Draws all the necessary elements to the canvas
   */
  public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawPlayer();
    // when there are elements in the rocket array
    if (this.rockets.length !== 0) {
      // clear the canvas

      // draw each rocket
      this.rockets.forEach((rocket) => {
        this.ctx.drawImage(rocket.image, rocket.xPos, rocket.yPos);
      });

      //  write the current score
      this.writeTextToCanvas(
        this.ctx,
        `Score is: ${this.score}`,
        40,
        this.canvas.width / 2,
        40,
      );
    }
  }

  /**
   * Method to draw the player
   */
  public drawPlayer(): void {
    // console.log(this.player);
    this.ctx.beginPath();
    this.ctx.arc(
      this.player.xPos,
      this.player.yPos,
      this.player.radius,
      0,
      Math.PI * 2,
      false,
    );
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
  }

  /**
   * Writes text to the canvas
   * @param {CanvasRenderingContext2D} ctx - canvas rendering context
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
  public writeTextToCanvas(
    ctx: CanvasRenderingContext2D,
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = 'center',
    color: string = 'red',
  ) {
    ctx.font = `${fontSize}px Minecraft`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Renders a random number between min and max
   * @param {number} min - minimum number
   * @param {number} max - maximum number
   * @returns {number} random number
   */
  public randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load',
  () => new Game(document.getElementById('canvas')));
