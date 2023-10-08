import { useGLTF } from "@react-three/drei";
import React from "react";

export function Skyscraper(props) {
  const { nodes, materials } = useGLTF("/models/Skyscraper.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.skyscraperE_1.geometry}
        material={materials.trim}
        castShadow
      />
      <mesh
        geometry={nodes.skyscraperE_1_1.geometry}
        material={materials.window}
        castShadow
      />
      <mesh
        geometry={nodes.skyscraperE_1_2.geometry}
        material={materials.border}
        castShadow
      />
      <mesh
        geometry={nodes.skyscraperE_1_3.geometry}
        material={materials._defaultMat}
        castShadow
      />
      <mesh
        geometry={nodes.skyscraperE_1_4.geometry}
        material={materials.roof}
        castShadow
      />
      <mesh
        geometry={nodes.skyscraperE_1_5.geometry}
        material={materials.door}
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/models/Skyscraper.glb");
