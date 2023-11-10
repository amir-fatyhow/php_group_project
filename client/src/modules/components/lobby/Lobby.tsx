import { Html, useFont } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import {Suspense, useEffect} from "react";
import {atom} from "jotai";

export const Lobby = ({ changePlace, logOut, addChat, setCamera } :
                          { changePlace : (param : string) => void , logOut : () => void, addChat : () => void,
                              setCamera : () => void } ) => {
    const goldenRatio = Math.min(1, window.innerWidth / 1600);

    useEffect(() => {
        setCamera();
    }, [])

    return (
        <Html
            position={[0, 0.17, 0.11]}
            transform
            center
            scale={0.04}
        >
        <div
            className={`${"w-[390px] h-[514px]"}  max-w-full  overflow-y-auto p-5  place-items-center pointer-events-none select-none`}
        >
            <div className="w-full overflow-y-auto flex flex-col space-y-2">
                <h1 className="text-center text-black text-2xl font-bold">
                    WELCOME TO<br /> THE SUPER GYM
                </h1>
                <div
                    onClick={() => changePlace("Gym")}
                    className="p-4 flex gap-3 items-center bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-lg">
                        GAME
                    </p>
                    <div
                        className={"w-4 h-4 rounded-full bg-green-500"}
                    ></div>
                </div>
                <div
                    onClick={() => addChat()}
                    className="p-4 flex gap-3 items-center bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-lg">
                        CHAT
                    </p>
                    <div
                        className={"w-4 h-4 rounded-full bg-blue-500"}
                    ></div>
                </div>
                <div
                    onClick={() => changePlace("Persons")}
                    className="p-4 flex gap-3 items-center bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-lg">
                        PERS
                    </p>
                    <div
                        className={"w-4 h-4 rounded-full bg-yellow-500"}
                    ></div>
                </div>
                <div
                    onClick={() => logOut()}
                    className="p-4 flex gap-3 items-center bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-lg">
                        EXIT
                    </p>
                    <div
                        className={"w-4 h-4 rounded-full bg-red-500"}
                    ></div>
                </div>
            </div>
        </div>
        </Html>
    );
};

useFont.preload("/fonts/Inter_Bold.json");

export const mapAtom = atom(getItemsInGym(1));

interface RootObject {
    id: number;
    items: Item[];
    size: number[];
    gridDivision: number;
}

interface Item {
    name: string;
    size: number[];
    gridPosition: number[];
}

function getItemsInGym(roomId: number) {
    const gym: RootObject[] = [
        {
            "id": 1,
            "items": [
                {
                    "name": "treadmill",
                    "size": [3, 2],
                    "gridPosition": [10, 9]
                },
                {
                    "name": "paper",
                    "size": [2, 2],
                    "gridPosition": [9, 9]
                },
                {
                    "name": "soda",
                    "size": [2, 2],
                    "gridPosition": [7, 7]
                },
                {
                    "name": "bathtub",
                    "size": [2, 2],
                    "gridPosition": [1, 9]
                }
                ,
                {
                    "name": "unicorn",
                    "size": [2, 2],
                    "gridPosition": [5, 10]
                }
            ],
            "size": [7, 7],
            "gridDivision": 2
        }
    ]
    let room  = gym.find((room) => room.id === roomId);
    if (room) {
        return {
            gridDivision: room.gridDivision,
            size: room.size,
            items: room.items
        }
    }
    return {
        gridDivision: 2,
        size: [7, 7],
        items: [
        {
            "name": "treadmill",
            "size": [3, 2],
            "rotation": 0,
            "gridPosition": [10, 9]
        }
    ]
    };
}

