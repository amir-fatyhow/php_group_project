export class Sprite {
    constructor({position, imageSrc}) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
    }
    draw(context) {
        if (!this.image) return;
        context.drawImage(this.image, this.position.x, this.position.y)
    }

    update(context) {
        this.draw(context);
    }
}