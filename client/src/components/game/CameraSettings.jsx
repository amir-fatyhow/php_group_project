import { CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import {useEffect, useRef, useState} from "react";
import { Lobby } from "./Lobby";
import { Gym } from "./Gym";
import { mapAtom } from "./Lobby";


export const CameraSettings = ({ loaded, place, logOut }) => {
    const controls = useRef();
    const [map] = useAtom(mapAtom);
    const[currentPlace, setPlace] = useState(place)

    function changePlace(place) {
        setPlace(place);
    }

    useEffect(() => {
        // LOBBY
        if (currentPlace === "Lobby") {
            controls.current.setPosition(0, 8, 2);
            controls.current.setTarget(0, 8, 0);
            controls.current.setPosition(0, 0, 2, true);
            controls.current.setTarget(0, 0, 0, true);
            return;
        }
        // ROOM
        if (currentPlace === "Gym") {
            controls.current.setPosition(0, 8, 2);
            controls.current.setTarget(0, 8, 0);
            controls.current.setPosition(10, 10, 52, true);
            controls.current.setTarget(10, 10, 10, true);
        }
    }, [loaded]);

    useFrame(() => {
        if (currentPlace === "Lobby") {
            return;
        }
        controls.current.setTarget(
            4.75,
            0,
            4.75,
            true
        );
        controls.current.setPosition(
            4.75 + 8,
            8,
            4.75 + 8,
            true
        );
    });

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
            {currentPlace === "Gym" && map && <Gym />}
            {currentPlace === "Lobby" && <Lobby changePlace={changePlace} logOut={logOut}/>}
        </>
    );
};
