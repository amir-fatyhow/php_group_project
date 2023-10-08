import { useGLTF } from "@react-three/drei";
import React from "react";

export function Tablet(props) {
  const { nodes, materials } = useGLTF("/models/Tablet.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.ChamferBox003.geometry}
        material={materials["04___Default"]}
      />
      <mesh
        geometry={nodes.ChamferCyl001.geometry}
        material={materials["03___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox001_1.geometry}
        material={materials["02___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox001_1_1.geometry}
        material={materials["01___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox001_1_2.geometry}
        material={materials["04___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox002_1.geometry}
        material={materials["01___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox002_1_1.geometry}
        material={materials["04___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox004_1.geometry}
        material={materials["01___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox004_1_1.geometry}
        material={materials["04___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox005_1.geometry}
        material={materials["01___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox005_1_1.geometry}
        material={materials["04___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox006_1.geometry}
        material={materials["03___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox006_1_1.geometry}
        material={materials["04___Default"]}
      />
    </group>
  );
}

useGLTF.preload("/models/Tablet.glb");
