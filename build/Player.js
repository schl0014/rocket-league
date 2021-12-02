import KeyboardListener from './KeyboardListener.js';
import GameItem from './GameItem.js';
export default class Player extends GameItem {
    radius;
    keyBoardListener;
    constructor(canvasWidth, canvasHeight) {
        super('Player');
        this.setXPosition(canvasWidth / 2);
        this.setYPosition(canvasHeight / 2);
        this.setSpeed(4);
        this.radius = 15;
        this.keyBoardListener = new KeyboardListener();
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.getXPosition(), this.getYPosition(), this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }
    move() {
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
    collidesWithRockets(rockets) {
        rockets.forEach((rocket) => {
            let testX;
            let testY;
            if (this.getXPosition() < rocket.getXPosition()) {
                testX = rocket.getXPosition();
            }
            else if (this.getXPosition() > rocket.getXPosition() + rocket.getImage().width) {
                testX = rocket.getXPosition() + rocket.getImage().width;
            }
            if (this.getYPosition() < rocket.getYPosition()) {
                testY = rocket.getYPosition();
            }
            else if (this.getYPosition() > rocket.getYPosition() + rocket.getImage().height) {
                testY = rocket.getYPosition() + rocket.getImage().height;
            }
            const distX = this.getXPosition() - testX;
            const distY = this.getYPosition() - testY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            if (distance <= this.radius) {
                console.log('Collides with Player');
                this.radius += 3;
            }
        });
    }
}
//# sourceMappingURL=Player.js.map