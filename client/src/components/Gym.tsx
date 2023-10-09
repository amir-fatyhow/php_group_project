import {CameraSettings} from "./CameraSettings";

export const Gym = ({ loaded } : {loaded: boolean}) => {
    return (
    <>
        <CameraSettings loaded={loaded} room="Gym"/>
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
