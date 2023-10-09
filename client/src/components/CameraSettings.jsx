import { CameraControls } from "@react-three/drei";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { roomIDAtom } from "./RoomLoader";

export const CameraSettings = ({ loaded }) => {
  const controls = useRef(null);
  const [roomID] = useAtom(roomIDAtom);

  useEffect(() => {
    if (!roomID) {
      controls.current.setTarget(0, 8, 0);
      controls.current.setPosition(0, 0, 2, true);
      controls.current.setTarget(0, 0, 0, true);
    }
  }, [roomID, loaded]);

  return (
    <>
      <ambientLight intensity={0.7} />
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
    </>
  );
};
