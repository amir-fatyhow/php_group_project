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
    persons,
    skins
} from "../constants";
import { ServerContext } from "../../../App";
import { TGamer, TBestGamers } from '../../server/types';
import { Player } from './classes/Player';
import { TItem } from '../../server/types';

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
    let items = useRef<TItem[]>([]);
    let userVelocity = useRef<any>(2);
    let isUserFreeze = useRef<boolean>(true);
    const [bestPlayers, setBestGamers] = useState<TBestGamers[]>([]);

    async function changeStatusItemToUse(token: string, value: number[], isUsed: number) {
        let status = await server.getItemStatus(token, value[2]);
        if (!status) {
            await server.changeItemsHash(token);
            await server.changedStatusItem(token, value[2], isUsed);
        }
    }

    async function weTraining(token: string, value: number[]) {
        let status = await server.getItemStatus(token, value[2]);
        if (status) {
            await server.training(token, value[0]);
            await server.increaseTiredness(token, value[1]);
        }
    }

    async function traid(token: string) {
        server.decreaseTiredness(token);
        server.decreaseScore(token, -1);
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
                if (-34 <= gamer.x && gamer.x <= 526 && 347 >= gamer.y && gamer.y >= -64) {
                    let p = createGamer(gamer.x, gamer.y, gamer.person_id);
                    gamers.current.push(p);
                }
            }
        }
    }

    function createGamer(x: number, y: number, person_id: number) {
        return new Player({
            position: { x, y },
            canvas: { width: canvasWidth, height: canvasHeight },
            collisionBlocks: [],
            platformCollisionBlocks: [],
            frameRate: 8,
            frameBuffer: 4,
            scale: 0.5,
            src: './assets/' + skins[person_id - 1] + '/Idle.png',
            animations: {}
        });
    }

    async function getItems() {
        let answer = await server.getItems();
        if (answer) {
            items.current = [];
            for (let item of answer) {
                items.current.push(item);
            }
        }
    }

    async function getUserVelocity(token: string) {
        let answer = await server.getUserVelocity(token);
        //console.log(answer);
        userVelocity.current = answer;
    }

    async function isFreeze(token: string) {
        let answer = await server.isUserFreeze(token);
        if (answer != null)
            if (answer.freeze == 0)
                isUserFreeze.current = true;
            else
                isUserFreeze.current = false;
    }

    function animate(context: CanvasRenderingContext2D | null) {
        if (context) {
            context.fillStyle = 'green'
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            context.save();
            context.scale(3, 3)
            context.translate(camera.position.x, camera.position.y)
            background.update(context);

            /*
            gamers.current.forEach(p => {
                p.drawOnlinePerson(context);
            })
            */

            getItems();
            items.current.forEach(i => {
                context.fillRect(i.x, i.y, i.length, i.width);
            })

            player.checkForHorizontalCanvasCollision();
            player.update(context);

            isFreeze(userToken);
            let value = player.training(items);
            if (value) {
                currentUsingExerciser.current = value[2];
                changeStatusItemToUse(userToken, value, 1);
                if (keys.use.pressed && !keys.sState.pressed) {
                    keys.sState.pressed = true;
                    weTraining(userToken, value);
                }
            } else if (currentUsingExerciser.current) {
                changeStatusItemToUnuse(userToken, currentUsingExerciser.current, 0);
                currentUsingExerciser.current = 0;
            }

            if (keys.traid.pressed && !keys.fState.pressed) {
                keys.fState.pressed = true;
                traid(userToken);
            }

            player.velocity.x = 0;
            if (keys.right.pressed) {
                player.switchSprite('Run');
                getUserVelocity(userToken);
                player.velocity.x = userVelocity.current - 0;
                player.lastDirection = 'right'
                player.shouldPanCameraToTheLeft({ camera });
            }
            else if (keys.left.pressed) {
                player.switchSprite('RunLeft');
                getUserVelocity(userToken);
                player.velocity.x = -userVelocity.current;
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
        isFreeze(userToken);
        if (isUserFreeze.current)
            switch (e.key) {
                case 'w':
                    if (player.isStand()) {
                        player.velocity.y = -4;
                        server.increaseTiredness(userToken, 10);
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

                case 'ц':
                    if (player.isStand()) {
                        player.velocity.y = -4;
                    }
                    break;
                case 'ф':
                    keys.left.pressed = true;
                    break;
                case 'в':
                    keys.right.pressed = true;
                    break;
                case 'ы':
                    keys.use.pressed = true;
                    break;
                case 'а':
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
            case 'ф':
                keys.left.pressed = false;
                break;
            case 'в':
                keys.right.pressed = false;
                break;
            case 'ы':
                keys.use.pressed = false;
                keys.sState.pressed = false;
                break;
            case 'а':
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