import React, {useEffect, useRef, useState} from 'react';
import Chat from "../chat/Chat";
import {Player} from "./classes/Player";
import {Sprite} from "./classes/Sprite";

const canvasHeight = 576;
const canvasWidth = 1024;
const player = new Player({x: 0, y: 0}, {width: canvasWidth, height: canvasHeight});
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
    },
    imageSrc: "background.png"
})

const Gym = ( {changePlace, userToken} ) => {
    const canvas = useRef(null);

    function animate(context) {
        window.requestAnimationFrame(() => animate(context));
        context.fillStyle = 'black'
        //background.update(context);

        context.fillRect(0, 0, canvasWidth, canvasHeight);
        player.update(context);

        player.velocity.x = 0;
        if (keys.right.pressed)
            player.velocity.x = 5;
        else if (keys.left.pressed)
            player.velocity.x = -5;
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
                player.velocity.y -= 20;
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
            <img src={require('./background.png')} alt="her" width={200} height={200}/>
            <div className='pt-16 pl-2'>
                <canvas ref={canvas} width={1024} height={576}></canvas>
            </div>
            <Chat userToken={userToken}/>
        </div>
    );
};

export default Gym;