import {useEffect, useState} from "react";
import { Experience } from "./Experience";
import {
    Manager,
    itemsAtom,
    roomIDAtom,
} from "./Manager";
import { UI } from "./UI";
import {ScrollControls, useProgress} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {useAtom} from "jotai";

const Menu = () => {
    const [roomID] = useAtom(roomIDAtom);

    const { progress } = useProgress();
    const [loaded, setLoaded] = useState(false);
    const [items] = useAtom(itemsAtom);

    useEffect(() => {
        if (progress === 100 && items) {
            setLoaded(true);
            console.log('true')
        }
    }, [progress, items]);

    return (
        <>
            <Manager />
            <Canvas
                shadows
                camera={{
                    position: [0, 8, 2],
                    fov: 30,
                }}
            >
                <ScrollControls pages={roomID ? 4 : 0}>
                    <Experience loaded={loaded} />
                </ScrollControls>
            </Canvas>
            {loaded && <UI />}
        </>
    );
}

export default Menu;