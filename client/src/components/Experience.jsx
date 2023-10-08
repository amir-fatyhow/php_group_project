import { CameraControls, Environment, Sky } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { Lobby } from "./Lobby";
import { roomIDAtom, userAtom } from "./Manager";
export const Experience = ({ loaded }) => {
  const controls = useRef();
  const [roomID] = useAtom(roomIDAtom);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    // INITIAL POSITION
    if (!loaded) {
      controls.current.setPosition(0, 8, 2);
      controls.current.setTarget(0, 8, 0);
      return;
    }
    // LOBBY
    if (!roomID) {
      controls.current.setPosition(0, 8, 2);
      controls.current.setTarget(0, 8, 0);
      controls.current.setPosition(0, 0, 2, true);
      controls.current.setTarget(0, 0, 0, true);
    }

  }, [ roomID, loaded]);

  useFrame(({ scene }) => {
    if (!user) {
      return;
    }

    const character = scene.getObjectByName(`character-${user}`);
    if (!character) {
      return;
    }
    controls.current.setTarget(
      character.position.x,
      0,
      character.position.z,
      true
    );
    controls.current.setPosition(
      character.position.x + 8,
      character.position.y + 8,
      character.position.z + 8,
      true
    );
  });

  return (
    <>
      <ambientLight intensity={0.7} />{/*0.1*/}
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
        touches={{
          one: 0,
          two: 0,
          three: 0,
        }}
      />
      {loaded && <Lobby />}
    </>
  );
};
