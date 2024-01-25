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
    persons
} from "../constants";
import { ServerContext } from "../../../App";
import { TGamer, TBestGamers } from '../../server/types';
import { Player } from './classes/Player';

const Gym = ({ changePlace, userToken }: { changePlace: (param: string) => void, userToken: string }) => {

    const player = persons[JSON.parse(localStorage.getItem("skin") || '0')];
    
    const css = 'mt-2 inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2';
    const canvas = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const server = useContext(ServerContext);
    let currentUsingExerciser = useRef(0);
    const [exersicer, setExerciser] = useState<number[]>([])
    let currentItemsHash = useRef('itemsHash');
    let currentGamerHash = useRef('gamerHash');
    let gamers = useRef<Player[]>([]);
    const [bestPlayers, setBestGamers] = useState<TBestGamers[]>([]);

    async function changeStatusItemToUse(token: string, value: number[], isUsed: number) {
        let status = await server.getItemStatus(token, value[2]);
        if (!status) {
            await server.changeItemsHash(token);
            await server.changedStatusItem(token, value[2], isUsed);
        }
    }

    async function weTraining(token: string, value: number[], isUsed: number) {
        let status = await server.getItemStatus(token, value[2]);
        if (status) {
            await server.training(userToken, value[0]);
            console.log(value[1], 'gym')
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
        if (answer) {
            gamers.current = [];
            for (let gamer of answer) {
                let p = createGamer(gamer.x, gamer.y, gamer.skin);
                gamers.current.push(p);
            }
        }
    }

    function createGamer(x: number, y: number, skin: string) {
        return new Player({
            position: { x, y },
            canvas: { width: canvasWidth, height: canvasHeight },
            collisionBlocks: [],
            platformCollisionBlocks: [],
            frameRate: 8,
            frameBuffer: 4,
            scale: 0.5,
            src: './assets/' + skin + '/Idle.png',
            animations: {}
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

            gamers.current.forEach(p => {
                p.drawOnlinePerson(context);
            })

            player.checkForHorizontalCanvasCollision();
            player.update(context);


            let value = player.training();
            if (value) {
                currentUsingExerciser.current = value[2];
                changeStatusItemToUse(userToken, value, 1);
                if (keys.use.pressed && !keys.sState.pressed) {
                    console.log('asd');
                    keys.sState.pressed = true;
                    weTraining(userToken, value, 1);
                }
            } else if (currentUsingExerciser.current) {
                changeStatusItemToUnuse(userToken, currentUsingExerciser.current, 0);
                currentUsingExerciser.current = 0;
            }

            if (keys.traid.pressed && !keys.fState.pressed) {
                console.log('asdfff');
                keys.fState.pressed = true;
                //weTraining(userToken, value, 1);
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
            case 'w':
                if (player.isStand()) {
                    player.velocity.y = -4;
                }
                break;
            case 'a':
                keys.left.pressed = true;
                break;
            case 'd':
                keys.right.pressed = true;
                break;
            case 's':
                keys.use.pressed = true;
                break;
            case 'f':
                keys.traid.pressed = true;
                break;
        }
    }

    function handleKeyUp(e: KeyboardEvent) {
        switch (e.key) {
            case 'a':
                keys.left.pressed = false;
                break;
            case 'd':
                keys.right.pressed = false;
                break;
            case 's':
                keys.use.pressed = false;
                keys.sState.pressed = false;
                break;
            case 'f':
                keys.traid.pressed = false;
                keys.fState.pressed = false;
                break;
        }
    }

    useEffect(() => {
        getGamers(userToken);
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
            animate(context);
        }, 20);

        return () => clearInterval(timer);
    });

    useEffect(() => {
        const timer = setInterval(() => {
            getItemsHash(userToken);
            //server.decreaseTiredness(userToken);
        }, 1000);

        return () => clearInterval(timer);
    });

    useEffect(() => {
        const timer = setInterval(() => {
            getItemsHash(userToken);
            server.setPersonPosition(userToken, player.position.x, player.position.y);
            getGamers(userToken);
        }, 1000);

        return () => clearInterval(timer);
    })


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