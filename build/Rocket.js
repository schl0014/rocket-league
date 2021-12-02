import GameItem from './GameItem.js';
export default class Rocket extends GameItem {
    type;
    image;
    constructor(type, canvasWidth, canvasHeight) {
        super('Rocket');
        let xPosition = GameItem.randomInteger(0, canvasWidth - 200);
        let yPosition = GameItem.randomInteger(0, canvasHeight - 200);
        if (type === 'leftToRight') {
            xPosition = 0;
            this.image = Rocket.loadNewImage('./assets/rocket-horizontal.png');
        }
        else {
            yPosition = 0;
            this.image = Rocket.loadNewImage('./assets/rocket-vertical.png');
        }
        this.setXPosition(xPosition);
        this.setYPosition(yPosition);
        this.type = type;
        this.setSpeed(GameItem.randomInteger(5, 15));
    }
    getImage() {
        return this.image;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.getXPosition(), this.getYPosition());
    }
    move() {
        if (this.type === 'leftToRight') {
            this.setXPosition(this.getXPosition() + this.getSpeed());
        }
        else {
            this.setYPosition(this.getYPosition() + this.getSpeed());
        }
    }
    outOfCanvas(canvasWidth, canvasHeight) {
        if (this.type === 'leftToRight') {
            if (this.getXPosition() + this.image.width >= canvasWidth) {
                this.setXPosition(0);
                this.setYPosition(GameItem.randomInteger(0, canvasHeight));
            }
        }
        else if (this.getYPosition() + this.image.height >= canvasHeight) {
            this.setYPosition(0);
            this.setXPosition(GameItem.randomInteger(0, canvasWidth));
        }
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
//# sourceMappingURL=Rocket.js.map