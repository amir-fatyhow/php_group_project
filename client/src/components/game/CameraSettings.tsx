import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const CameraSettings = ({ room } : { room: string }) => {
  const controls = useRef<CameraControls>(null);

  useEffect(() => {
      if (controls.current) {
          if (room === "Lobby") {
              controls.current.setTarget(0, 8, 0);
              controls.current.setPosition(0, 0, 2, true);
              controls.current.setTarget(0, 0, 0, true);
          }
          if (room === "Gym") {
              controls.current.setPosition(-10, 10, 5);
              controls.current.setTarget(5, 0, 3);
          }
      }
  });

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
