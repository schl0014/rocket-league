import GameItem from './GameItem.js';
import KeyboardListener from './KeyboardListener.js';
export default class Player extends GameItem {
    radius;
    keyBoardListener;
    constructor(canvas, name, radius) {
        super(canvas.width / 2, canvas.height / 2, 4, name);
        this.keyBoardListener = new KeyboardListener();
        this.radius = radius;
    }
    move() {
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
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.xPosition, this.yPosition, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }
    collidesWithRocket(rockets) {
        rockets.forEach((rocket) => {
            let testX;
            let testY;
            if (this.xPosition < rocket.getXPos()) {
                testX = rocket.getXPos();
            }
            else if (this.xPosition > rocket.getXPos() + rocket.getimage().width) {
                testX = rocket.getXPos() + rocket.getimage().width;
            }
            if (this.yPosition < rocket.getYPos()) {
                testY = rocket.getYPos();
            }
            else if (this.yPosition > rocket.getYPos() + rocket.getimage().height) {
                testY = rocket.getYPos() + rocket.getimage().height;
            }
            const distX = this.xPosition - testX;
            const distY = this.yPosition - testY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            if (distance <= this.radius) {
                this.radius += 3;
            }
        });
    }
    collidesWithPowerup(powerup) {
        let testX;
        let testY;
        if (this.xPosition < powerup.getXPos()) {
            testX = powerup.getXPos();
        }
        else if (this.xPosition > powerup.getXPos() + powerup.getimage().width) {
            testX = powerup.getXPos() + powerup.getimage().width;
        }
        if (this.yPosition < powerup.getYPos()) {
            testY = powerup.getYPos();
        }
        else if (this.yPosition > powerup.getYPos() + powerup.getimage().height) {
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
//# sourceMappingURL=Player.js.map