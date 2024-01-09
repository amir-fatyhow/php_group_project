import React from "react";
import { useContext, useEffect } from "react";
import { Html } from "@react-three/drei";
import { ServerContext } from "../../../App";
import useCanvas from "./useCanvas";
import Point from "./Point";
import Gamer from "./elements/Gamer";

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
    клиент двигает перса
    перс прыгает
    добавить платформы
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
    const height = 600;

    function startGame() {
        canvas = Canvas({
            id: "canvas",
            width: 800,
            height: height,
            WIN
        });

        gamer = new Gamer(119, 152, new Point(0, height));
    }

    async function keyDown(event) {
        console.log(event.key);

        const key = event.key;
        switch (key) {
            case 'd': {
                gamer.move('x', 10);
                const answer = server.setPersonPosition(userToken, gamer.center.x + 10, gamer.center.y);
                return;
            };
            case 'a': {
                gamer.move('x', -10);
                const answer = server.setPersonPosition(userToken, gamer.center.x - 10, gamer.center.y);
                return;
            }
            case 'w': {
                gamer.move('y', -200);
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
    }

    function render() {
        if (canvas) {
            canvas.clear("#C7CFFF");
            let backgroundImg = document.createElement('img');
            backgroundImg.src = "https://morefitness.pro/wp-content/uploads/2023/03/velvet-almaty.jpg";
            canvas.image(backgroundImg, 0, 0);
            canvas.clear("#abc8");

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
                    placeholder="move your character"
                    onKeyDown={(event) => keyDown(event)}
                    maxLength={0}
                />
            </Html>
        </>
    );
};
