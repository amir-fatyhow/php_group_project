import { Html } from "@react-three/drei";
import React from "react";
import Nerd from "./persons/Nerd";
import SportyMan from "./persons/SportyMan";
import Woman from "./persons/Woman";

export function Persons({ ...props }) {
    return (
        <>
            <Nerd   onClick={ () => console.log(("Nerd"))}
                    position-z={-2.1}
                    position-x={-1.3 * Math.min(1, window.innerWidth / 1600)}
                    position-y={-1}
            />
            <SportyMan position-z={-2.1}
                       position-x={0}
                       position-y={-1}
            />
            <Woman position-z={-2.1}
                   position-x={1.3 * Math.min(1, window.innerWidth / 1600)}
                   position-y={-1}
            />
            <Html
                position={[0.9, 0.38, 0]}
                transform
                center
                scale={0.04}
            >
                <div
                    onClick={() => props.changePlace("Lobby")}
                    className="p-4 flex gap-3 items-center rounded-lg bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-lg">
                        EXIT
                    </p>
                    <div
                        className={"w-4 h-4 rounded-full bg-red-500"}
                    ></div>
                </div>
            </Html>
        </>
    );
}
