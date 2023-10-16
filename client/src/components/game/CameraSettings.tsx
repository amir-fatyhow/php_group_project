import { CameraControls } from "@react-three/drei";
import { useAtom } from "jotai";
import {useEffect, useRef, useState} from "react";
import { mapAtom } from "./Lobby";


export const CameraSettings = ({ loaded, place } : { loaded?: boolean, place: string }) => {
    const controls = useRef<CameraControls>(null);
    const [map] = useAtom(mapAtom);
    const[currentPlace, setPlace] = useState(place)

    useEffect(() => {
        if (controls.current) {
            // LOBBY
            if (currentPlace === "Lobby") {
                controls.current.setPosition(0, 8, 2);
                controls.current.setTarget(0, 8, 0);
                controls.current.setPosition(0, 0, 2, true);
                controls.current.setTarget(0, 0, 0, true);
                return;
            }
            // GYM
            if (currentPlace === "Gym") {
                controls.current.setTarget(4.75,0,4.75,true);
                controls.current.setPosition(4.5,5,4.75 + 10,true);
            }
        }
    }, [loaded, currentPlace]);

    return (
        <>
            <ambientLight intensity={0.7} />
            <directionalLight
                position={[40, 4, 80]}
                intensity={0.95}
                shadow-mapSize={[1024, 24]}
            >
                <orthographicCamera
                    attach={"shadow-camera"}
                    args={[-10, 10, 10, -10]}
                    far={22}
                />
            </directionalLight>
            <CameraControls
                ref={controls}
                mouseButtons={{
                    left: 0,
                    middle: 0,
                    right: 0,
                    wheel: 0,
                }}
                // disable all touch gestures
                touches={{
                    one: 0,
                    two: 0,
                    three: 0,
                }}
            />
            
        </>
    );
};

//{currentPlace === "Gym" && map && <Gym changePlace={changePlace}/>}
//{currentPlace === "Lobby" && <Lobby changePlace={changePlace} logOut={logOut}/>}