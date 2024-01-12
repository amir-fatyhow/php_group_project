import React, {useEffect, useRef} from 'react';
import Chat from "../chat/Chat";
import Rate from "./Rate";
import {
    background,
    camera,
    canvasHeight,
    canvasWidth,
    keys,
    makeCollision,
    makePlatformCollision,
    player
} from "../constants";



const Gym = ( {changePlace, userToken} ) => {
    const canvas = useRef(null);

    function animate(context) {
        window.requestAnimationFrame(() => animate(context));
        context.fillStyle = 'white'
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        context.save();
        context.scale(3, 3)
        context.translate(camera.position.x, camera.position.y)
        background.update(context);

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
        makeCollision();
        makePlatformCollision();

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
            <div className='pt-16 pl-2 flex-col'>
                <canvas ref={canvas} width={canvasWidth} height={canvasHeight}></canvas>
                <Rate />
            </div>
            <Chat userToken={userToken}/>
        </div>
    );
};

export default Gym;