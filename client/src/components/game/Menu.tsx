import { useState} from "react";
import { AvatarCreateButton } from "./AvatarCreateButton";
import { Canvas } from "@react-three/fiber";
import { Lobby } from "./Lobby";
import { Gym } from "./Gym";

const Menu = () => {
    const [currentRoom, setCurrentRoom] = useState("Lobby")

    function changeRoom(room: string) {
        setCurrentRoom(room);
    }

    return (
        <>
            <Canvas
                shadows
                camera={{
                    position: [0, 8, 2],
                    fov: 30,
                }}
            >
                {
                    currentRoom === "Lobby" ? <Lobby changeRoom={changeRoom} /> :
                    currentRoom === "Gym" ? <Gym /> : <></>
                }
            </Canvas>
            {currentRoom === "Lobby" && <AvatarCreateButton/>}
        </>
    );
}

export default Menu;