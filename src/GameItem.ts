import Game from './Game.js';

export default abstract class GameItem {
  protected name:string;

  protected xPosition:number;

  protected yPosition:number;

  protected speed:number;

  protected game:Game;

  /**
   * initilize the GameItem
   *
   * @param xPosition xposition of the object
   * @param yPosition y position of the object
   * @param speed speed of the object
   * @param name name of the object
   */
  constructor(xPosition:number, yPosition:number, speed:number, name:string) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.speed = speed;
    this.name = name;
  }
}
