import { useAnimations, useGLTF } from "@react-three/drei";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { avatarUrlAtom } from "./UI";

export function LobbyAvatar({ ...props }) {
  const [avatarUrl] = useAtom(avatarUrlAtom);
  const avatar = useRef();
  const group = useRef();
  const { scene } = useGLTF(avatarUrl);

  const { animations: waveAnimation } = useGLTF(
    "/animations/M_Standing_Expressions_001.glb"
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

  useEffect(() => {
    actions[animation]
      .reset()
      .fadeIn(init === avatarUrl ? 0.32 : 0)
      .play();
    setInit(avatarUrl);
    return () => actions[animation]?.fadeOut(0.32);
  }, [animation, avatarUrl]);

  const delayWave = (delay) => {
    setTimeout(() => {
      setAnimation("M_Standing_Expressions_001");
      setTimeout(() => {
        setAnimation("M_Standing_Idle_001");
        delayWave(3000);
      }, 6000);
    }, delay);
  };

  useEffect(() => {
    delayWave(12);
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} ref={avatar} />
    </group>
  );
}
