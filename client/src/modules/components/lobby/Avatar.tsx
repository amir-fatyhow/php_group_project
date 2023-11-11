import { useAnimations, useGLTF } from "@react-three/drei";
import { PrimitiveAtom, useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";


interface IAvatar {
  positionX: number,
  positionY: number,
  positionZ: number,
  rotationY?: number | null,
  animation1: string,
  animation2: string
}

export function Avatar({ props, url } : { props : IAvatar, url :  PrimitiveAtom<string> }) {
  const [avatarUrl] = useAtom(url);
  const avatar = useRef();
  const group = useRef(null);
  const { scene } = useGLTF(avatarUrl);

  const { animations: waveAnimation } = useGLTF(
      `/animations/${props.animation1}.glb`
  );
  const { animations: idleAnimation } = useGLTF(
      `/animations/${props.animation2}.glb`
  );

  const { actions } = useAnimations(
      [waveAnimation[0], idleAnimation[0]],
      avatar
  );
  const [animation, setAnimation] = useState(props.animation2);
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
      setAnimation(props.animation1);
    }, delay);
  };

  useEffect(() => {
    delayWave(12);
  }, []);

  return (
    <group
        ref={group}
        position-z={props.positionZ}
        position-x={props.positionX}
        position-y={props.positionY}
        dispose={null}>
      <primitive object={scene} ref={avatar} />
    </group>
  );
}
