import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Lobby } from "./Lobby";
import { Gym } from "./Gym";
import { useProgress } from "@react-three/drei";

const Menu = ({ logOut }: { logOut: () => void }) => {
    const { progress } = useProgress();
    const [loaded, setLoaded] = useState(false);
    const [currentRoom, setCurrentRoom] = useState("Lobby");

    function changePlace(room: string) {
        setCurrentRoom(room);
    }

    useEffect(() => {
        if (progress === 100) {
            setLoaded(true);
        }
    }, [progress]);

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
                    currentRoom === "Lobby" ? <Lobby changePlace={changePlace} logOut={logOut} /> :
                        currentRoom === "Gym" ? <Gym changePlace={changePlace} /> : <></>
                }
            </Canvas>
        </>
    );
}

export default Menu;