export class Player {
    constructor(position, canvas) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1
        }
        this.gravity = 0.5;
        this.height = 100;
        this.canvasHeight = canvas.height;
    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, 100, this.height);
    }

    update(context) {
        this.draw(context)

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y < this.canvasHeight)
            this.velocity.y += this.gravity;
        else
            this.velocity.y = 0;
    }
}