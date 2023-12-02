import { Html } from "@react-three/drei";
import React, {useContext, useEffect} from "react";
import { Avatar } from "./Avatar";
import { atom } from "jotai";
import { NERD, SPORTYMAN, WOMAN } from "../constants";
import {ServerContext} from "../../../App";

const nerdUrl = atom(NERD);
const sportyManUrl = atom(SPORTYMAN);
const womanUrl = atom(WOMAN);

const nerd = {
    'positionZ': -2.1,
    'positionX': -1.3 * Math.min(1, window.innerWidth / 1600),
    'positionY' : -1,
    'animation1': "M_Standing_Expressions_001",
    'animation2': "M_Standing_Idle_001",
}

const sportyMan = {
    'positionZ': -2.1,
    'positionX': 0,
    'positionY' : -1,
    'animation1': "M_Dances_001",
    'animation2': "M_Standing_Idle_001",
}

const woman = {
    'positionZ': -2.1,
    'positionX': 1.3 * Math.min(1, window.innerWidth / 1600),
    'positionY' : -1,
    'animation1': "M_Dances_006",
    'animation2': "M_Standing_Idle_001",
}

export function Persons({ changePlace, setCamera, userToken } :
                            { changePlace : (param : string) => void , setCamera : () => void, userToken: string}) {
    const server = useContext(ServerContext);

    useEffect(() => {
        setCamera();
    }, [])

    async function setPerson(typeId: number) {
        const answer = await server.choosePerson(userToken, typeId);
        changePlace("Lobby");
    }

    return (
        <>
            <Html
                position={[-0.62, 0.48, 0]}
                transform
                center
                scale={0.04}
            >
                <div
                    onClick={() => setPerson(1)}
                    className="p-4 flex gap-3 items-center bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-lg">
                        NERD
                    </p>
                    <div
                        className={"w-4 h-4 rounded-full bg-red-500"}
                    ></div>
                </div>
            </Html>
            <Avatar
                props={ nerd }
                url={ nerdUrl }
            />
            <Html
                position={[0, 0.48, 0]}
                transform
                center
                scale={0.04}
            >
                <div
                    onClick={() => setPerson(2)}
                    className="p-4 flex gap-3 items-center bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-lg">
                        SPORTYMAN
                    </p>
                    <div
                        className={"w-4 h-4 rounded-full bg-red-500"}
                    ></div>
                </div>
            </Html>
            <Avatar
                props={ sportyMan }
                url={ sportyManUrl }
            />
            <Html
                position={[0.61, 0.48, 0]}
                transform
                center
                scale={0.04}
            >
                <div
                    onClick={() => setPerson(3)}
                    className="p-4 flex gap-3 items-center bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-lg">
                        WOMAN
                    </p>
                    <div
                        className={"w-4 h-4 rounded-full bg-red-500"}
                    ></div>
                </div>
            </Html>
            <Avatar
                props={ woman }
                url={ womanUrl }
            />
        </>
    );
}
