import {atom, useAtom} from "jotai/index";
import React, {useEffect, useRef, useState} from 'react';
import {useAnimations, useGLTF} from "@react-three/drei";

const avatarUrlAtom = atom(
    localStorage.getItem("avatarURL") ||
    "https://models.readyplayer.me/6548a28c8ef6ede9493ce30d.glb?meshlod=1&quality=medium"
);

const SportyMan = ({...props}) => {
    const [avatarUrl] = useAtom(avatarUrlAtom);
    const avatar = useRef();
    const group = useRef(null);
    const { scene } = useGLTF(avatarUrl);

    const { animations: waveAnimation } = useGLTF(
        "/animations/M_Dances_006.glb"
    );
    const { animations: idleAnimation } = useGLTF(
        "/animations/M_Standing_Idle_001.glb"
    );

    const { actions } = useAnimations(
        [waveAnimation[0], idleAnimation[0]],
        avatar
    );
    const [animation, setAnimation] = useState("M_Standing_Idle_001");
    const [init, setInit] = useState(avatarUrl);

    useEffect((): () => void => {
        actions[animation]!
            .reset()
            .fadeIn(init === avatarUrl ? 0.32 : 0)
            .play();
        setInit(avatarUrl);
        return () => actions[animation]?.fadeOut(0.32);
    }, [animation, avatarUrl]);

    const delayWave = (delay: number) => {
        setTimeout(() => {
            setAnimation("M_Dances_006");
        }, delay);
    };

    useEffect(() => {
        delayWave(12);
    }, []);
    return (
        <group ref={group}
               {...props}
               dispose={null}>
            <primitive object={scene} ref={avatar} />
        </group>
    );
};

export default SportyMan;