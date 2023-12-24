import React from "react";
import { useContext, useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { ServerContext } from "../../../App";
import Game from "./Game";

export const Gym = ({ changePlace, setCamera, userToken }) => {
    //const [inventar, setInvetar] = useState([]);
    const server = useContext(ServerContext);

    useEffect(() => {
        setCamera();
        
    }, [])

    async function increaseScore() {
        const answer = await server.increaseScore(userToken, 10);
    }

    let game = new Game();
    game.render();

    function exitGame(){
        game.exit();
        changePlace("Lobby");
    }

    return (
        <Html
            position={[3.5, 0, 6.11]}
            transform
            center
            scale={0.2}
        >
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
        </Html>
    );
};
