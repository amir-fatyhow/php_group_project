import * as THREE from "three";

export const useGrid = () => {
  const vector3ToGrid = (vector3) => {
    return [
      Math.floor(vector3.x * 2),
      Math.floor(vector3.z * 2),
    ];
  };

  const gridToVector3 = (gridPosition, width = 1, height = 1) => {
    return new THREE.Vector3(
      width / 2 / 2 + gridPosition[0] / 2,
      0,
      height /2 / 2 + gridPosition[1] / 2
    );
  };

  return {
    vector3ToGrid,
    gridToVector3,
  };
};
