import React, {useEffect, useRef, useState} from 'react';
import Chat from "../chat/Chat";
import {Player} from "./classes/Player";
import {Sprite} from "./classes/Sprite";
import {floorCollisions, platformCollisions} from "./data/collisions";
import {CollisionBlock} from "./classes/CollisionBlock";

const canvasHeight = 576; // todo export const
const canvasWidth = 1024; // todo export const

const scaledCanvas = {
    width: canvasWidth / 3,
    height: canvasHeight / 3
}

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    }
})

const floorCollision2D = []
const collisionBlocks = [];

function makeCollision() {
    for (let i = 0; i < floorCollisions.length; i+= 36) {
        floorCollision2D.push(floorCollisions.slice(i, i + 36))
    }

    floorCollision2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 202) {
                collisionBlocks.push(new CollisionBlock({position: {
                    x: x * 16,
                    y: y * 16
                    }}))
            }
        })
    })
}


const platformCollision2D = []
const platformCollisionBlocks = [];
function makePlatformCollision() {
    for (let i = 0; i < platformCollisions.length; i+= 36) {
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

const player = new Player({
    position:{ x: 100, y: 300},
    canvas:{width: canvasWidth, height:canvasHeight},
    collisionBlocks,
    platformCollisionBlocks ,
    frameRate: 8,
    frameBuffer: 4,
    scale: 0.5,
    src: './assets/warrior/Idle.png'
});

const backgroundImageHeight = 432;

const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height
    }
}

const Gym = ( {changePlace, userToken} ) => {
    const canvas = useRef(null);

    useEffect(() => {
        makeCollision();
        makePlatformCollision();
    }, [])

    function animate(context) {
        window.requestAnimationFrame(() => animate(context));
        context.fillStyle = 'white'
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        context.save();
        context.scale(3, 3)
        context.translate(camera.position.x, camera.position.y)
        background.update(context);

        /*collisionBlocks.forEach(collisionBlock => {
            collisionBlock.update(context)
        })*/
        /*platformCollisionBlocks.forEach(platformCollisionBlock => {
            platformCollisionBlock.update(context)
        })*/

        player.checkForHorizontalCanvasCollision();
        player.update(context);

        player.velocity.x = 0;
        if (keys.right.pressed) {
            player.velocity.x = 3;
            player.shouldPanCameraToTheLeft({camera});
        }
        else if (keys.left.pressed) {
            player.velocity.x = -3;
            player.shouldPanCameraToTheRight({camera});
        }

        if (player.velocity.y < 0) {
            player.shouldPanCameraToTheDown({camera})
        } else if (player.velocity.y > 0) {
            player.shouldPanCameraToTheUp({camera})
        }

        context.restore();
    }

    function handleKeyDown(e) {
        //console.log(e);
        switch (e.key) {
            case 'ArrowRight':
                keys.right.pressed = true;
                break;
            case 'ArrowLeft':
                keys.left.pressed = true;
                break;
            case 'ArrowUp':
                player.velocity.y = -4;
                break;
        }
    }

    function handleKeyUp(e) {
        switch (e.key) {
            case 'ArrowRight':
                keys.right.pressed = false;
                break;
            case 'ArrowLeft':
                keys.left.pressed = false;
                break;
        }
    }

    useEffect(() => {
        let context = canvas.current.getContext('2d');
        animate(context);

        window.addEventListener('keydown', (e) => handleKeyDown(e))
        window.addEventListener('keyup', (e) => handleKeyUp(e));
        return () => {
            window.removeEventListener('keydown', (e) => handleKeyDown(e));
            window.removeEventListener('keyup', (e) => handleKeyUp(e));
        };
    }, [])


    return (
        <div>
            <div className='pt-16 pl-2'>
                <canvas ref={canvas} width={canvasWidth} height={canvasHeight}></canvas>
            </div>
            <Chat userToken={userToken}/>
        </div>
    );
};

export default Gym;