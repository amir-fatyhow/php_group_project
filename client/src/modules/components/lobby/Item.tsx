import { useGLTF } from "@react-three/drei";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGrid } from "../../hooks/useGrid";
import { mapAtom } from "./Lobby";

interface TItem {
  "name": string,
  "length": number,
  "width": number,
  "x": number,
  "y": number
}


export const Item = ({ item } : { item : TItem }) => {
  const { name, length, width, x, y } = item;
  const { gridToVector3 } = useGrid();
  const [map] = useAtom(mapAtom);
  const { scene } = useGLTF(`/models/items/${name}.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const [hover, setHover] = useState(false);
  const gridPosition = [x, y]
  return (
    <group
      position={gridToVector3(
        gridPosition,
        width,
        length
      )}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <primitive object={clone} rotation-y={((0) * Math.PI) / 2} />
    </group>
  );
};
