import { Sprite } from "./game/classes/Sprite";
import { floorCollisions, platformCollisions } from "./game/classes/data/collisions";
import { CollisionBlock } from "./game/classes/CollisionBlock";
import { Player } from "./game/classes/Player";


export const canvasHeight = 576;
export const canvasWidth = 1024;
export const backgroundImageHeight = 432;

export const scaledCanvas = {
    width: canvasWidth / 3,
    height: canvasHeight / 3
}

export const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    use: {
        pressed: false
    },
    sState: {
        pressed: false
    },
    traid: {
        pressed: false
    },
    fState: {
        pressed: false
    },
}
export const background = new Sprite({
    position: {
        x: 0,
        y: 0
    }
})

export const floorCollision2D: number[][] = []
export const collisionBlocks: CollisionBlock[] = [];
export const makeCollision = () => {
    for (let i = 0; i < floorCollisions.length; i += 36) {
        floorCollision2D.push(floorCollisions.slice(i, i + 36))
    }

    floorCollision2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 202) {
                collisionBlocks.push(new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16
                    }
                }))
            }
        })
    })
}


export const platformCollision2D: number[][] = []
export const platformCollisionBlocks: CollisionBlock[] = [];
export const makePlatformCollision = () => {
    for (let i = 0; i < platformCollisions.length; i += 36) {
        platformCollision2D.push(platformCollisions.slice(i, i + 36))
    }

    platformCollision2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 202) {
                platformCollisionBlocks.push(new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16
                    },
                    height: 4
                }))
            }
        })
    })
}

export const skins = [
    'slav',
    'sportyman',
    'anon',
]

let persons: Player[] = [];

for (let i = 0; i < skins.length; i++) {
    persons.push(
        new Player({
            position: { x: 100, y: 300 },
            canvas: { width: canvasWidth, height: canvasHeight },
            collisionBlocks,
            platformCollisionBlocks,
            frameRate: 8,
            frameBuffer: 4,
            scale: 0.5,
            src: './assets/' + skins[i] + '/Idle.png',
            animations: {
                Idle: {
                    framerate: 8,
                    srcFrame: './assets/' + skins[i] + '/Idle.png',
                    framebuffer: 4
                },
                Run: {
                    framerate: 8,
                    srcFrame: './assets/' + skins[i] + '/Run.png',
                    framebuffer: 5
                },
                Jump: {
                    framerate: 2,
                    srcFrame: './assets/' + skins[i] + '/Jump.png',
                    framebuffer: 3
                },
                Fall: {
                    framerate: 2,
                    srcFrame: './assets/' + skins[i] + '/Fall.png',
                    framebuffer: 3
                },
                FallLeft: {
                    framerate: 2,
                    srcFrame: './assets/' + skins[i] + '/FallLeft.png',
                    framebuffer: 3
                },
                RunLeft: {
                    framerate: 8,
                    srcFrame: './assets/' + skins[i] + '/RunLeft.png',
                    framebuffer: 5
                },
                IdleLeft: {
                    framerate: 8,
                    srcFrame: './assets/' + skins[i] + '/IdleLeft.png',
                    framebuffer: 3
                },
                JumpLeft: {
                    framerate: 2,
                    srcFrame: './assets/' + skins[i] + '/JumpLeft.png',
                    framebuffer: 3
                },
            },
        })
    )
};

export { persons };

export const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height
    }
}