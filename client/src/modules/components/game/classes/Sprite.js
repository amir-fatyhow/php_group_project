export class Sprite {
    constructor({position, framerate = 1, frameBuffer = 3}) {
        this.position = position;
        this.width = 0;
        this.height = 0;
        this.framerate = framerate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
    }

    imgCreate(src, alt, title) {
        let img = document.createElement('img');
        img.src = './assets/background.png';
        this.width = img.width / this.framerate;
        this.height = img.height;
        if ( alt != null ) img.alt = alt;
        if ( title != null ) img.title = title;
        return img;
    }

    draw(context) {
        let image = this.imgCreate();
        const cropbox = {
            position: {
                x: this.currentFrame * (image.width / this.framerate),
                y: 0
            },
            width: image.width / this.framerate,
            height: image.height
        }
        context.drawImage(image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update(context) {
        this.draw(context);
        this.updateFrames();
    }

    updateFrames() {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.framerate - 1)
                this.currentFrame ++;
            else
                this.currentFrame = 0;
        }
    }
}