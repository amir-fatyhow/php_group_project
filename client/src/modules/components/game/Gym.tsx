import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { ServerContext } from "../../../App";
import { TGamer, TBestGamers } from '../../server/types';
import { Player } from './classes/Player';



const Gym = ({ changePlace, userToken }: { changePlace: (param: string) => void, userToken: string }) => {
    const css = 'mt-2 inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2';
    const canvas = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const server = useContext(ServerContext);
    let currentUsingExerciser = useRef(0);
    const [exersicer, setExerciser] = useState<number[]>([])
    let currentItemsHash = useRef('itemsHash');
    const [gamers, setGamers] = useState<TGamer[]>([]);
    const [bestPlayers, setBestGamers] = useState<TBestGamers[]>([]);

    async function changeStatusItemToUse(token: string, value: number[], isUsed: number) {
        let status = await server.getItemStatus(token, value[2]);
        if (!status) {
            await server.changeItemsHash(token);
            await server.changedStatusItem(token, value[2], isUsed);

            await server.training(userToken, value[0]);
            await server.increaseTiredness(userToken, value[1]);
        }
    }

    async function changeStatusItemToUnuse(token: string, value: number, isUsed: number) {
        await server.changeItemsHash(token);
        await server.changedStatusItem(token, value, isUsed)
    }

    async function getItemsHash(token: string) {
        let answer = await server.getItemsHash(token);
        let items = await server.getStatusAllItems(userToken);
        if (answer !== currentItemsHash.current) {
            if (items) {
                let arr = [];
                for (let it of items) {
                    arr.push(it.isUsed);
                }
                setExerciser(arr);
            }
        }

    }

    async function getGamers(token: string) {
        let answer = await server.getGamers(token);
        let arr = [];
        if (answer) {
            for (let gamer of answer) {
                arr.push(gamer);
            }
            setGamers(arr);
        }
    }

    function createGamer() {
        return new Player({
            position: { x: 100, y: 300 },
            canvas: { width: canvasWidth, height: canvasHeight },
            collisionBlocks: [],
            platformCollisionBlocks: [],
            frameRate: 8,
            frameBuffer: 4,
            scale: 0.5,
            src: './assets/warrior/Idle.png',
            animations: {
                Idle: {
                    framerate: 8,
                    srcFrame: './assets/warrior/Idle.png',
                    framebuffer: 4
                },
                Run: {
                    framerate: 8,
                    srcFrame: './assets/warrior/Run.png',
                    framebuffer: 5
                },
                Jump: {
                    framerate: 2,
                    srcFrame: './assets/warrior/Jump.png',
                    framebuffer: 3
                },
                Fall: {
                    framerate: 2,
                    srcFrame: './assets/warrior/Fall.png',
                    framebuffer: 3
                },
                FallLeft: {
                    framerate: 2,
                    srcFrame: './assets/warrior/FallLeft.png',
                    framebuffer: 3
                },
                RunLeft: {
                    framerate: 8,
                    srcFrame: './assets/warrior/RunLeft.png',
                    framebuffer: 5
                },
                IdleLeft: {
                    framerate: 8,
                    srcFrame: './assets/warrior/IdleLeft.png',
                    framebuffer: 3
                },
                JumpLeft: {
                    framerate: 2,
                    srcFrame: './assets/warrior/JumpLeft.png',
                    framebuffer: 3
                },
            }
        });
    }

    function animate(context: CanvasRenderingContext2D | null) {
        if (context) {
            context.fillStyle = 'white'
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            context.save();
            context.scale(3, 3)
            context.translate(camera.position.x, camera.position.y)
            background.update(context);

            gamers.forEach(gamer => {
                let p = createGamer();
                p.position.x = gamer.x;
                p.position.y = gamer.y;
                p.update();
            })

            player.checkForHorizontalCanvasCollision();
            player.update(context);

            let value = player.training();
            if (value) {
                currentUsingExerciser.current = value[2];
                changeStatusItemToUse(userToken, value, 1);
            } else if (currentUsingExerciser.current) {
                changeStatusItemToUnuse(userToken, currentUsingExerciser.current, 0);
                currentUsingExerciser.current = 0;
            }

            player.velocity.x = 0;
            if (keys.right.pressed) {
                player.switchSprite('Run');
                player.velocity.x = 2;
                player.lastDirection = 'right'
                player.shouldPanCameraToTheLeft({ camera });
            }
            else if (keys.left.pressed) {
                player.switchSprite('RunLeft');
                player.velocity.x = -2;
                player.lastDirection = 'left'
                player.shouldPanCameraToTheRight({ camera });
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
                player.shouldPanCameraToTheDown({ camera })
            } else if (player.velocity.y > 0) {
                if (player.lastDirection === 'right')
                    player.switchSprite('Fall')
                else
                    player.switchSprite('FallLeft')
                player.shouldPanCameraToTheUp({ camera })
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

        window.addEventListener('keydown', (e) => handleKeyDown(e))
        window.addEventListener('keyup', (e) => handleKeyUp(e));
        return () => {
            window.removeEventListener('keydown', (e) => handleKeyDown(e));
            window.removeEventListener('keyup', (e) => handleKeyUp(e));
        };
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            let context = canvas.current ? canvas.current.getContext('2d') : null;
            getGamers(userToken);
            animate(context);
        }, 20);

        return () => clearInterval(timer);
    });

    useEffect(() => {
        const timer = setInterval(() => {
            getItemsHash(userToken);
            server.decreaseTiredness(userToken);
        }, 1000);

        return () => clearInterval(timer);
    });

    return (
        <div>
            <div className='pt-16 pl-2 flex-col'>
                <div className='flex p-1'>
                    <button className='mr-2 text-sm font-semibold text-red-800'
                        onClick={() => changePlace('Menu')}
                    >
                        EXIT
                    </button>
                    <span className='mr-3'>&larr; &uarr; &rarr; управление игроком</span>
                </div>
                <canvas ref={canvas} width={canvasWidth} height={canvasHeight}></canvas>
                <div className="flex">
                    <Rate userToken={userToken} changePlace={changePlace} />
                    <div className="flex">
                        <span className={css}>barbell (upper left) is {exersicer[0] == 0 ? <>free</> : <>using</>}</span>
                        <span className={css}>elliptical (lower left) is {exersicer[1] == 0 ? <>free</> : <>using</>}</span>
                        <span className={css}>treadmill (upper right) is {exersicer[2] == 0 ? <>free</> : <>using</>}</span>
                        <span className={css}>treadmill (lower right) is {exersicer[3] == 0 ? <>free</> : <>using</>}</span>
                    </div>
                </div>
            </div>
            <Chat userToken={userToken} />
        </div>
    );
};

export default Gym;