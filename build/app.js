import KeyboardListener from './KeyboardListener.js';
class Game {
    rockets;
    player;
    canvas;
    score;
    ctx;
    keyBoardListener;
    constructor(canvasId) {
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.rockets = [];
        this.keyBoardListener = new KeyboardListener();
        for (let index = 0; index < 10; index++) {
            if (index % 2 === 0) {
                this.rockets.push(this.rocketFactory('Rocket', 'leftToRight'));
                console.log('leftToRight');
            }
            else {
                this.rockets.push(this.rocketFactory('Rocket', 'topToBottom'));
            }
        }
        console.log(this.rockets);
        this.player = this.createPlayer('Me');
        console.log(this.player);
        this.score = 0;
        this.loop();
    }
    loop = () => {
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
    rocketFactory(name, type) {
        let xPosition = this.randomNumber(0, this.canvas.width - 200);
        let yPosition = this.randomNumber(0, this.canvas.height - 200);
        let image;
        if (type === 'leftToRight') {
            xPosition = 0;
            image = this.loadNewImage('./assets/rocket-horizontal.png');
        }
        else {
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
    createPlayer(name) {
        return {
            name: name,
            xPos: this.canvas.width / 2,
            yPos: this.canvas.height / 2,
            radius: 15,
            speed: 4,
        };
    }
    playerCollidesWithRocket() {
        this.rockets.forEach((rocket) => {
            let testX;
            let testY;
            if (this.player.xPos < rocket.xPos) {
                testX = rocket.xPos;
            }
            else if (this.player.xPos > rocket.xPos + rocket.image.width) {
                testX = rocket.xPos + rocket.image.width;
            }
            if (this.player.yPos < rocket.yPos) {
                testY = rocket.yPos;
            }
            else if (this.player.yPos > rocket.yPos + rocket.image.height) {
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
    move() {
        this.rockets.forEach((rocket) => {
            if (rocket.type === 'leftToRight') {
                rocket.xPos += rocket.speed;
            }
            else {
                rocket.yPos += rocket.speed;
            }
        });
    }
    rocketOutOfCanvas() {
        this.rockets.forEach((rocket) => {
            if (rocket.type === 'leftToRight') {
                if (rocket.xPos + rocket.image.width >= this.canvas.width) {
                    rocket.xPos = 0;
                    rocket.yPos = this.randomNumber(0, this.canvas.height);
                }
            }
            else if (rocket.yPos + rocket.image.height >= this.canvas.height) {
                rocket.yPos = 0;
                rocket.xPos = this.randomNumber(0, this.canvas.height);
            }
        });
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlayer();
        if (this.rockets.length !== 0) {
            this.rockets.forEach((rocket) => {
                this.ctx.drawImage(rocket.image, rocket.xPos, rocket.yPos);
            });
            this.writeTextToCanvas(this.ctx, `Score is: ${this.score}`, 40, this.canvas.width / 2, 40);
        }
    }
    drawPlayer() {
        this.ctx.beginPath();
        this.ctx.arc(this.player.xPos, this.player.yPos, this.player.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'red';
        this.ctx.stroke();
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
window.addEventListener('load', () => new Game(document.getElementById('canvas')));
//# sourceMappingURL=app.js.map