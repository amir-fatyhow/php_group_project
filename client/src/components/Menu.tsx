import { useEffect, useState } from "react";
import { RoomLoader, itemsAtom } from "./RoomLoader";
import { AvatarCreateButton } from "./AvatarCreateButton";
import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAtom } from "jotai";
import {Lobby} from "./Lobby";
import {Gym} from "./Gym";

const Menu = () => {
    const { progress } = useProgress();
    const [loaded, setLoaded] = useState(false);
    const [items] = useAtom(itemsAtom);
    const [currentRoom, setCurrentRoom] = useState("Lobby")

    function changeRoom(room: string) {
        setCurrentRoom(room);
    }

    useEffect(() => {
        if (progress === 100 && items) {
            setLoaded(true);
        }
    }, [progress, items]);

    return (
        <>
            <RoomLoader />
            <Canvas
                shadows
                camera={{
                    position: [0, 8, 2],
                    fov: 30,
                }}
            >

                {
                    currentRoom === "Lobby" ? <Lobby changeRoom={changeRoom} loaded={loaded}/> :
                    currentRoom === "Gym" ? <Gym loaded={loaded} /> : <></>
                }
            </Canvas>
            {currentRoom === "Lobby" && <AvatarCreateButton/>}
        </>
    );
}

export default Menu;