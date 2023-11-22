import { useGLTF } from "@react-three/drei";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGrid } from "../../hooks/useGrid";
import { mapAtom } from "./Lobby";

interface TItem {
  "name": string,
  "size": [number, number],
  "gridPosition": [number, number]
}


export const Item = ({ item } : { item : TItem }) => {
  const { name, gridPosition, size } = item;
  const { gridToVector3 } = useGrid();
  const [map] = useAtom(mapAtom);
  const { scene } = useGLTF(`/models/items/${name}.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const width = size[0];
  const height = size[1];
  const [hover, setHover] = useState(false);

  return (
    <group
      position={gridToVector3(
        gridPosition,
        width,
        height
      )}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <primitive object={clone} rotation-y={((0) * Math.PI) / 2} />
    </group>
  );
};
