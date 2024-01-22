import { canvasHeight } from "../../constants";

export class Player {
    constructor({
        position,
        canvas,
        collisionBlocks,
        frameRate = 1,
        frameBuffer = 3,
        scale = 0.5,
        src,
        platformCollisionBlocks,
        animations }) {
        this.position = position;
        this.scale = scale;
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 0;
        this.height = 0;
        this.gravity = 0.1;
        this.canvasHeight = canvas.height;
        this.canvasWidth = canvas.width;
        this.collisionBlocks = collisionBlocks;
        this.platformCollisionBlocks = platformCollisionBlocks;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 10,
            height: 10
        }
        this.src = src;
        this.loaded = false;
        this.image = this.imgCreate(this.src);
        this.cameraBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 200,
            height: 80
        }

        this.animations = animations;
        for (let key in this.animations) {
            const image = this.imgFrameCreate(this.animations[key].srcFrame)
            this.animations[key].image = image
        }
        this.lastDirection = 'right';
    }

    imgFrameCreate(src, alt, title) {
        let img = document.createElement('img');
        img.src = src;
        img.title = src;
        return img;
    }

    imgCreate(src, alt, title) {
        let img = document.createElement('img');
        img.src = src;
        img.title = src;
        img.onload = () => {
            this.width = (img.width / this.frameRate) * this.scale;
            this.height = img.height * this.scale;
            this.loaded = true;
        }
        return img;
    }

    draw(context) {
        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        }
        context.drawImage(this.image,
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
        this.updateFrames();
        this.updateHitbox();
        this.updateCameraBox()
        this.draw(context);
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollision();
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollision();
    }

    drawOnlinePerson(context) {
        this.draw(context);
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 26
            },
            width: 14,
            height: 27
        }
    }

    updateFrames() {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1)
                this.currentFrame++;
            else
                this.currentFrame = 0;
        }
    }

    checkForHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collBlock = this.collisionBlocks[i];
            if (this.collision({ object1: this.hitbox, object2: collBlock })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collBlock.position.x - offset - 0.01;
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collBlock.position.x + collBlock.width - offset + 0.01;
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    collision({ object1, object2 }) {
        return (
            object1.position.y + object1.height >= object2.position.y &&
            object1.position.y <= object2.position.y + object2.height &&
            object1.position.x <= object2.position.x + object2.width &&
            object1.position.x + object1.width >= object2.position.x
        )
    }

    platformCollision({ object1, object2 }) {
        return (
            object1.position.y + object1.height >= object2.position.y &&
            object1.position.y + object1.height <=
            object2.position.y + object2.height &&
            object1.position.x <= object2.position.x + object2.width &&
            object1.position.x + object1.width >= object2.position.x
        )
    }

    checkForVerticalCollision() {
        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const collBlock = this.platformCollisionBlocks[i];
            if (this.collision({ object1: this.hitbox, object2: collBlock })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collBlock.position.y - offset - 0.01;
                    break;
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collBlock.position.y + collBlock.height - offset + 0.01;
                    break;
                }
            }
        }

        // platforms for items
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collBlock = this.collisionBlocks[i];
            if (this.platformCollision({ object1: this.hitbox, object2: collBlock })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }

    updateCameraBox() {
        this.cameraBox = {
            position: {
                x: this.position.x - 50,
                y: this.position.y
            },
            width: 200,
            height: 80
        }
    }

    shouldPanCameraToTheLeft({ camera }) {
        const cameraBoxRightSide = this.cameraBox.position.x + this.cameraBox.width;
        if (cameraBoxRightSide >= 576) return
        if (cameraBoxRightSide >= this.canvasWidth / 3 + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
        }
    }

    shouldPanCameraToTheRight({ camera }) {
        if (this.cameraBox.position.x <= 0) return
        if (this.cameraBox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
        }
    }

    shouldPanCameraToTheDown({ camera }) {
        if (this.cameraBox.position.y + this.velocity.y <= 0) return
        if (this.cameraBox.position.y <= Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y
        }
    }

    shouldPanCameraToTheUp({ camera }) {
        if (this.cameraBox.position.y + this.cameraBox.height + this.velocity.y >= 432) return
        if (this.cameraBox.position.y + this.cameraBox.height >= Math.abs(camera.position.y) +
            this.canvasHeight / 3) {
            camera.position.y -= this.velocity.y
        }
    }

    checkForHorizontalCanvasCollision() {
        if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= canvasHeight ||
            this.hitbox.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0;
        }
    }

    switchSprite(key) {
        if (this.image.title === this.animations[key].srcFrame || !this.loaded) return

        this.currentFrame = 0;
        this.image = this.animations[key].image;
        this.frameBuffer = this.animations[key].framebuffer;
        this.frameRate = this.animations[key].framerate;
    }

    // [score, tiredness, itemId]
    training() {
        if (this.position.x > -36 && this.position.y > 9 && this.position.x < 4 && this.position.y < 12) // upper left "barbell"
            return [2, 400, 1];
        if (this.position.x > 56 && this.position.y > 250 && this.position.x < 100 && this.position.y < 252) // lower left "elliptical"
            return [1, 390, 2];
        if (this.position.x > 446 && this.position.y > 9 && this.position.x < 480 && this.position.y < 12) // upper right "treadmill id = 3"
            return [2, 500, 3];
        if (this.position.x > 396 && this.position.y > 282 && this.position.x < 438 && this.position.y < 284) // lower right "treadmill id = 4"
            return [1, 425, 4];
        return null;
    }


    printCurrentPosition() {
        if (this.position.x > -36 && this.position.y > 9 && this.position.x < 4 && this.position.y < 12) // upper left
            console.log('x = ' + this.position.x + ' y = ' + this.position.y);
        if (this.position.x > 56 && this.position.y > 250 && this.position.x < 100 && this.position.y < 252) // lower
            console.log('x = ' + this.position.x + ' y = ' + this.position.y);
        if (this.position.x > 446 && this.position.y > 9 && this.position.x < 480 && this.position.y < 12) // upper right
            console.log('x = ' + this.position.x + ' y = ' + this.position.y);
        if (this.position.x > 396 && this.position.y > 282 && this.position.x < 438 && this.position.y < 284) // upper right
            console.log('x = ' + this.position.x + ' y = ' + this.position.y)
    }
}