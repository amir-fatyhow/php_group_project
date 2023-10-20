import { Html, useFont } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { Suspense } from "react";
import { LobbyAvatar } from "./LobbyAvatar";
import {atom} from "jotai";

export const Lobby = ({ changePlace, logOut } ) => {
    const goldenRatio = Math.min(1, window.innerWidth / 1600);

    return (
        <group position-y={-1.5}>
            <motion.group
                scale={0.22}
                position-x={-0.25 * goldenRatio}
                position-z={0.5}
                initial={{
                    y: 1.5,
                    rotateY: Math.PI / 8,
                }}
                animate={{
                    y:  1.5,
                }}
                transition={{
                    duration: 1,
                    delay: 0.5,
                }}
            >
                <Html
                    position={[0, 0.17, 0.11]}
                    transform
                    center
                    scale={0.121}
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
                                className="p-4 flex gap-3 items-center rounded-lg bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                            >
                                <p className="text-uppercase font-bold text-lg">
                                    START GAME
                                </p>
                                <div
                                    className={"w-4 h-4 rounded-full bg-green-500"}
                                ></div>
                            </div>
                            <div
                                onClick={() => logOut()}
                                className="p-4 flex gap-3 items-center rounded-lg bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
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
            </motion.group>
            <Suspense>
                <LobbyAvatar
                    position-z={-1}
                    position-x={0.5 * Math.min(1, window.innerWidth / 1600)}
                    position-y={0}
                    rotation-y={-Math.PI / 8}
                />
            </Suspense>
        </group>
    );
};

useFont.preload("/fonts/Inter_Bold.json");

export const mapAtom = atom(getItemsInGym(1));

function getItemsInGym(roomId) {
    const gym = [
        {
            "id": 1,
            "items": [
                {
                    "name": "treadmill",
                    "size": [3, 2],
                    "rotation": 0,
                    "gridPosition": [10, 9]
                }
            ],
            "size": [7, 7],
            "gridDivision": 2
        }
    ]
    let room = gym.find((room) => room.id === roomId);
    return {
        gridDivision: room.gridDivision,
        size: room.size,
        items: room.items,
    }
}

