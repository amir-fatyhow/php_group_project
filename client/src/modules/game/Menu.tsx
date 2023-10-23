import {useEffect, useState} from "react";
import { Canvas } from "@react-three/fiber";
import { Lobby } from "./Lobby";
import { CameraSettings } from "./CameraSettings";
import { useProgress } from "@react-three/drei";
import Chat from "./chat/Chat";

const Menu = ({ logOut }: {logOut: () => void}) => {
    const { progress } = useProgress();
    const [loaded, setLoaded] = useState(false);
    const [chat, setChat] = useState(false)

    function addChat() {
        setChat(true);
    }

    function removeChat() {
        setChat(false);
    }

    useEffect(() => {
        if (progress === 100) {
            setLoaded(true);
        }
    }, [progress]);
    return (
        <>
            {chat ? <Chat exit={removeChat}/> : <Canvas
                shadows
                camera={{
                    position: [0, 8, 2],
                    fov: 30,
                }}
            >
                <CameraSettings loaded={loaded} place={"Lobby"} logOut={logOut} addChat={addChat}/>
            </Canvas>}
        </>
    );
}

export default Menu;