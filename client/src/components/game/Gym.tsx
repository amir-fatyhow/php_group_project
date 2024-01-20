import { Html } from "@react-three/drei"

import { CameraSettings } from "./CameraSettings";

/**
 * RoomId = 1
 **/

export const Gym = ({ changeRoom }: { changeRoom: (room: string) => void }) => {
  return (
    <>
      <group>
        <Html
          position={[0.3, 1.17, 0.11]}
          transform
          center
          scale={0.35}
        >
          <div
            className={`${"w-[200px] h-[100px]"}  max-w-full  overflow-y-auto p-5  place-items-center pointer-events-none select-none`}
          >
            <div
              onClick={() => changeRoom('Lobby')}
              className="p-4 flex gap-3 items-center rounded-lg bg-slate-800 bg-opacity-50 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
            >
              <p className="text-uppercase font-bold text-lg">
                back
              </p>
            </div>
          </div>
        </Html>
      </group>
      <CameraSettings room="Gym" />
      <mesh
        onClick={() => console.log("clicked")}
        rotation-x={-Math.PI / 2}
        position-y={-0.002}
        position-x={7 / 2}
        position-z={7 / 2}
      >
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </>
  );
};
