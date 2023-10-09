import { useEffect, useState } from "react";
import { CameraSettings } from "./CameraSettings";
import { RoomLoader, itemsAtom } from "./RoomLoader";
import { AvatarCreateButton } from "./AvatarCreateButton";
import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAtom } from "jotai";
import {Lobby} from "./Lobby";

const Menu = () => {
    const { progress } = useProgress();
    const [loaded, setLoaded] = useState(false);
    const [items] = useAtom(itemsAtom);

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
                <CameraSettings loaded={loaded} />
                <Lobby />
            </Canvas>
            <AvatarCreateButton />
        </>
    );
}

export default Menu;