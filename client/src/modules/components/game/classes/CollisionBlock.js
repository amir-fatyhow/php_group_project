export class CollisionBlock {
    constructor({position, height = 16}) {
        this.position = position;
        this.width = 16;
        this.height = height;
    }

    imgCreate(src, alt, title) {
        let img = document.createElement('img');
        img.src = './assets/background.png';
        if ( alt != null ) img.alt = alt;
        if ( title != null ) img.title = title;
        return img;
    }

    draw(context) {
        context.fillStyle = 'rgba(255, 0, 0, 0.5)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
        //context.drawImage(this.imgCreate(), 0, 0)
    }

    update(context) {
        this.draw(context);
    }
}