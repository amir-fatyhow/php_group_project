import React from "react";
import { useContext, useEffect } from "react";
import { Html } from "@react-three/drei";
import { ServerContext } from "../../../App";
import useCanvas from "./useCanvas";
import Point from "./Point";
import Gamer from "./elements/Gamer";
import Plate from "./elements/Plate";
import Item from "./elements/Item";
import gymgirl from './assets/gymgirl.png';
import gymBackground from './assets/gym.png';
import item1 from './assets/item1.png';
import item2 from './assets/item2.png';
import item3 from './assets/item3.png';
import item4 from './assets/item4.png';
import item5 from './assets/item5.png';
import item6 from './assets/item6.png';

export const Gym = ({ changePlace, userToken }) => {
    const server = useContext(ServerContext);

    window.requestAnimFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 100 / 6);
            }
        );
    })();

    //TODO
    /*
    список очков у всех игроков
    printGamer -> s
    создавать нового gamer при перезапуске игры / не давать возможность перезагрузки
    */

    const WIN = {
        LEFT: -10,
        BOTTOM: 0,
        WIDTH: 20,
        HEIGHT: 20,
    };
    const Canvas = useCanvas(render);
    let canvas = null;
    let gamer = null;
    const height = 650, width = 800;

    const plates = [];
    const items = [];
    const itemImages = [];

    itemImages.push(item1);
    itemImages.push(item2);
    itemImages.push(item3);
    itemImages.push(item4);
    itemImages.push(item5);
    itemImages.push(item6);

    plates.push(new Plate(30, 230, height - 140, height - 160));
    plates.push(new Plate(180, 350, height - 280, height - 300));
    plates.push(new Plate(320, 580, height - 450, height - 470));
    plates.push(new Plate(610, 780, height - 450, height - 470));
    plates.push(new Plate(500, 620, height - 210, height - 230));
    plates.push(new Plate(600, 770, height - 110, height - 130));

    plates.forEach((plate, i) => {
        let left = ((plate.right - plate.left) / 2 + plate.left - 80);
        let right = left + 160;
        let bottom = plate.bottom;
        let top = bottom - 160;
        items.push(new Item(itemImages[i], left, right, bottom, top));
    })

    items[0].score = 2;
    items[1].score = 5;
    items[2].score = 8;
    items[3].score = 10;
    items[4].score = 3;
    items[5].score = 1;

    items[0].health = -7;
    items[1].health = -6;
    items[2].health = -2;
    items[3].health = -1;
    items[4].health = -9;
    items[5].health = -10;

    gamer = new Gamer(119, 152, new Point(0, height));
    const gamers = [];

    async function startGame() {
        canvas = Canvas({
            id: "canvas",
            width: width,
            height: height,
            WIN
        });

        const interval = setInterval(() => {
            items.forEach(item => {
                item.isFree = true;
            })
            if (gamer.isAlive) {
                if (!gamer.isStanding) {
                    gamer.move('y', 6);
                    //const answer = server.setPersonPosition(userToken, gamer.center.x, gamer.center.y + 6);
                }
                let isOnPlate = false;
                let g = gamer.center;
                plates.forEach(plate => {
                    if (g.x >= plate.left && g.x <= plate.right && g.y <= plate.bottom && g.y >= plate.top || g.y >= height) {
                        gamer.isStanding = true;
                        isOnPlate = true;
                    }
                })
                if (!isOnPlate) {
                    gamer.isStanding = false;
                }

                items.forEach(item => {
                    if (gamer.isStanding && g.x >= item.left && g.x <= item.right && g.y <= item.bottom && g.y >= item.top) {
                        item.isFree = false;
                    }
                })

                if (gamer.health < 100) {
                    gamer.health += 0.03;
                }

                if (gamer.health <= 0) {
                    gamer.isAlive = false;
                }
            }

            /*let scene = getScene();
            gamers.splice(0, gamers.length);
            scene.gamers.forEach(gamer => {
                gamers.push(gamer);
            })*/
        }, 30);
    }

    async function changePoints(item) {
        console.log(gamer.score, item.score);
        gamer.score += item.score;
        gamer.health += item.health;
        //const answer1 = server.changeScore(userToken, gamer.score);
        //const answer2 = server.changeHealth(userToken, gamer.health);
    }

    async function keyDown(event) {
        if (gamer.isAlive) {
            const key = event.key;
            switch (key) {
                case 'd': {
                    if (gamer.center.x <= width) {
                        gamer.move('x', 10);
                        //const answer = server.setPersonPosition(userToken, gamer.center.x + 10, gamer.center.y);
                    }
                    return;
                };
                case 'a': {
                    if (gamer.center.x >= 0) {
                        gamer.move('x', -10);
                        //const answer = server.setPersonPosition(userToken, gamer.center.x - 10, gamer.center.y);
                    }
                    return;
                }
                case 'w': {
                    if (gamer.isStanding) {
                        gamer.move('y', -200);
                        //const answer = server.setPersonPosition(userToken, gamer.center.x, gamer.center.y - 200);
                        gamer.isStanding = false;
                    }
                    return;
                }
                case 't': {
                    items.forEach(item => {
                        if (!item.isFree) {
                            changePoints(item);
                        }
                    })
                }
                default: {
                    return;
                }
            }
        }
    }

    function exitGame() {
        canvas = null;
        changePlace("Lobby");
    }

    function printGamer() {
        let image = document.createElement('img');
        image.src = gymgirl;
        canvas.image(image, gamer.printPoint.x, gamer.printPoint.y);

        canvas.text('score: ' + gamer.score, 10, 30);
        canvas.text('health: ' + gamer.health.toFixed(0), 10, 60, '#aca');
    }

    function printPlates() {
        plates.forEach(plate => {
            canvas.rectangle(plate.left, plate.bottom, plate.right, plate.top, '#1239');
        })
    }

    function printItems() {
        items.forEach(item => {
            if (!item.isFree) {
                canvas.rectangle(item.left, item.top, item.right, item.bottom, '#0c66');
            }
            canvas.image(item.image, item.left, item.top);
        })
    }

    async function getScene() {
        const md5 = require('md5');
        const gamersHash = md5(Math.random() + 'gamersHash');
        const itemsHash = md5(Math.random() + 'itemsHash');
        const answer = await server.getScene(userToken, gamersHash, itemsHash);
        return answer;
    }

    function render() {
        if (canvas) {
            canvas.clear("#C7CFFF");
            let backgroundImg = document.createElement('img');
            backgroundImg.src = gymBackground;
            canvas.image(backgroundImg, 0, 0);
            canvas.clear("#abcb");

            printPlates();
            printItems();

            if (gamer.isAlive) {
                printGamer();
            }
            else {
                canvas.clear('#b88b');
                canvas.bigText('GAME OVER', width / 2, height / 2);
            }

            canvas.render();
        }
    }

    return (
        <>
            <Html
                center
            >
                <div id="content" style={{ display: 'block' }}></div>
                <div
                    onClick={() => exitGame()}
                    className="p-4 flex gap-3 items-center bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-lg">
                        EXIT
                    </p>
                    <div
                        className={"w-4 h-4 rounded-full bg-red-500"}
                    ></div>
                </div>

                <div
                    onClick={() => startGame()}
                    className="p-4 flex gap-3 items-center bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-lg" >
                        START GAME
                    </p>
                    <div
                        className={"w-4 h-4 rounded-full bg-red-500"}
                    ></div>
                </div>
                <canvas id="canvas"></canvas>
                <input
                    placeholder="[a,w,d,t]"
                    onKeyDown={(event) => keyDown(event)}
                    maxLength={0}
                />
            </Html>
        </>
    );
};
