import Player from './Player.js';
import Rocket from './Rocket.js';
export default class Game {
    rockets;
    player;
    canvas;
    score;
    ctx;
    frameCounter;
    constructor(canvasId) {
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.rockets = [];
        for (let index = 0; index < 10; index++) {
            if (index % 2 === 0) {
                console.log('leftToRight');
                this.rockets.push(new Rocket('leftToRight', this.canvas.width, this.canvas.height));
            }
            else {
                console.log('topToBottom');
                this.rockets.push(new Rocket('topToBottom', this.canvas.width, this.canvas.height));
            }
        }
        console.log(this.rockets);
        this.player = new Player(this.canvas.width, this.canvas.height);
        console.log(this.player);
        this.score = 0;
        this.frameCounter = 0;
        this.loop();
    }
    loop = () => {
        this.score += 1;
        this.frameCounter += 1;
        this.move();
        this.scoringItemOutOfCanvas();
        this.player.collidesWithRockets(this.rockets);
        this.draw();
        requestAnimationFrame(this.loop);
    };
    move() {
        this.rockets.forEach((rocket) => {
            rocket.move();
        });
        this.player.move();
    }
    scoringItemOutOfCanvas() {
        this.rockets.forEach((rocket) => {
            rocket.outOfCanvas(this.canvas.width, this.canvas.height);
        });
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        if (this.rockets.length !== 0) {
            this.rockets.forEach((rocket) => {
                rocket.draw(this.ctx);
            });
            this.writeTextToCanvas(`Score is: ${this.score}`, 40, this.canvas.width / 2, 40);
        }
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Game.js.map