import React from "react";
import { useContext, useEffect } from "react";
import { Html } from "@react-three/drei";
import { ServerContext } from "../../../App";
import useCanvas from "./useCanvas";
import Point from "./Point";
import Gamer from "./elements/Gamer";
import Plate from "./elements/Plate";

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
    добавить тренажёры
    перс тренит за тренажёром
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
    const height = 600, width = 800;
    const plates = [];

    function startGame() {
        canvas = Canvas({
            id: "canvas",
            width: width,
            height: height,
            WIN
        });

        gamer = new Gamer(119, 152, new Point(0, height));

        plates.splice(0, plates.length);
        plates.push(new Plate(30, 230, height - 140, height - 160));
        plates.push(new Plate(180, 350, height - 280, height - 300));
        plates.push(new Plate(320, 580, height - 450, height - 470));
        plates.push(new Plate(610, 780, height - 450, height - 470));
        plates.push(new Plate(500, 620, height - 210, height - 230));
        plates.push(new Plate(600, 770, height - 110, height - 130));

        const interval = setInterval(() => {
            if (!gamer.isStanding) {
                gamer.move('y', 6);
                const answer = server.setPersonPosition(userToken, gamer.center.x, gamer.center.y + 6);
            }
            let isOnPlate = false;
            plates.forEach(plate => {
                let g = gamer.center;
                if (g.x > plate.left && g.x < plate.right && g.y < plate.bottom && g.y > plate.top || g.y >= height) {
                    gamer.isStanding = true;
                    isOnPlate = true;
                }
            })
            if (!isOnPlate) {
                gamer.isStanding = false;
            }

            getScene();
        }, 30);
    }

    async function keyDown(event) {
        const key = event.key;
        switch (key) {
            case 'd': {
                console.log(gamer.center.x, width)
                if (gamer.center.x <= width) {
                    gamer.move('x', 10);
                    const answer = server.setPersonPosition(userToken, gamer.center.x + 10, gamer.center.y);
                }
                return;
            };
            case 'a': {
                if (gamer.center.x >= 0) {
                    gamer.move('x', -10);
                    const answer = server.setPersonPosition(userToken, gamer.center.x - 10, gamer.center.y);
                }
                return;
            }
            case 'w': {
                if (gamer.isStanding) {
                    gamer.move('y', -200);
                    const answer = server.setPersonPosition(userToken, gamer.center.x, gamer.center.y - 200);
                    gamer.isStanding = false;
                }
                return;
            }
            default: {
                return;
            }
        }
    }

    async function increaseScore() {
        const answer = await server.increaseScore(userToken, 10);
    }

    function exitGame() {
        canvas = null;
        changePlace("Lobby");
    }

    function printGamer() {
        let image = document.createElement('img');
        image.src = "https://i.pinimg.com/736x/0b/f2/9d/0bf29d758dd4ac4b3d296f65de699952.jpg";
        canvas.image(image, gamer.printPoint.x, gamer.printPoint.y);

        canvas.text(gamer.points, gamer.printPoint.x, gamer.printPoint.y - 20);
    }

    function printPlates() {
        plates.forEach(plate => {
            canvas.rectangle(plate.left, plate.bottom, plate.right, plate.top);
        })
    }

    async function getScene() {
        const md5 = require('md5');
        const gamersHash = md5(Math.random() + 'gamersHash');
        const itemsHash = md5(Math.random() + 'itemsHash');
        const answer = await server.getScene(userToken, gamersHash, itemsHash);
    }

    function render() {
        if (canvas) {
            canvas.clear("#C7CFFF");
            let backgroundImg = document.createElement('img');
            backgroundImg.src = "https://morefitness.pro/wp-content/uploads/2023/03/velvet-almaty.jpg";
            canvas.image(backgroundImg, 0, 0);
            canvas.clear("#abcb");

            printPlates();
            printGamer();

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
                    placeholder="[a,w,d]"
                    onKeyDown={(event) => keyDown(event)}
                    maxLength={0}
                />
            </Html>
        </>
    );
};
