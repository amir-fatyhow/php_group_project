import React, {useContext, useEffect, useRef} from 'react';
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
import {ServerContext} from "../../../App";




const Gym = ( {changePlace, userToken} : { changePlace : (param : string) => void, userToken: string}) => {
    const canvas = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const server = useContext(ServerContext);
    function animate(context: CanvasRenderingContext2D | null) {
        if (context) {
            window.requestAnimationFrame(() => animate(context));
            context.fillStyle = 'white'
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            context.save();
            context.scale(3, 3)
            context.translate(camera.position.x, camera.position.y)
            background.update(context);

            player.checkForHorizontalCanvasCollision();
            player.update(context);

            let value = player.training();
            if (value) {
                server.training(userToken, value[0]);
                server.increaseTiredness(userToken, value[1]);
            }

            player.velocity.x = 0;
            if (keys.right.pressed) {
                player.switchSprite('Run');
                player.velocity.x = 2;
                player.lastDirection = 'right'
                player.shouldPanCameraToTheLeft({camera});
            }
            else if (keys.left.pressed) {
                player.switchSprite('RunLeft');
                player.velocity.x = -2;
                player.lastDirection = 'left'
                player.shouldPanCameraToTheRight({camera});
            }
            else if (player.velocity.y === 0) {
                if (player.lastDirection === 'right')
                    player.switchSprite('Idle');
                else
                    player.switchSprite('IdleLeft')
            }

            if (player.velocity.y < 0) {
                if (player.lastDirection === 'right')
                    player.switchSprite('Jump');
                else
                    player.switchSprite('JumpLeft')
                player.shouldPanCameraToTheDown({camera})
            } else if (player.velocity.y > 0) {
                if (player.lastDirection === 'right')
                    player.switchSprite('Fall')
                else
                    player.switchSprite('FallLeft')
                player.shouldPanCameraToTheUp({camera})
            }

            context.restore();
        }
    }

    function handleKeyDown(e: KeyboardEvent) {
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

    function handleKeyUp(e: KeyboardEvent) {
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
        let context = canvas.current ? canvas.current.getContext('2d') :null;
        animate(context);

        window.addEventListener('keydown', (e) => handleKeyDown(e))
        window.addEventListener('keyup', (e) => handleKeyUp(e));
        return () => {
            window.removeEventListener('keydown', (e) => handleKeyDown(e));
            window.removeEventListener('keyup', (e) => handleKeyUp(e));
        };
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
           server.decreaseTiredness(userToken);
        }, 1000);

        return () => clearInterval(timer);
    });

    return (
        <div>
            <div className='pt-16 pl-2 flex-col'>
                <div>
                    <span>&larr; &uarr; &rarr; управление игроком</span>
                </div>
                <canvas ref={canvas} width={canvasWidth} height={canvasHeight}></canvas>
                <Rate userToken={userToken}/>
            </div>
            <Chat userToken={userToken}/>
        </div>
    );
};

export default Gym;