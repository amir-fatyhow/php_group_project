import { useGLTF } from "@react-three/drei";
import React from "react";
import * as THREE from 'three'
import {GLTF} from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        ChamferBox003: THREE.Mesh,
        ChamferCyl001: THREE.Mesh,
        ChamferBox001_1: THREE.Mesh,
        ChamferBox001_1_1: THREE.Mesh,
        ChamferBox001_1_2: THREE.Mesh,
        ChamferBox002_1: THREE.Mesh,
        ChamferBox002_1_1: THREE.Mesh,
        ChamferBox004_1: THREE.Mesh,
        ChamferBox004_1_1: THREE.Mesh,
        ChamferBox005_1: THREE.Mesh,
        ChamferBox005_1_1: THREE.Mesh,
        ChamferBox006_1: THREE.Mesh,
        ChamferBox006_1_1: THREE.Mesh,
    }
    materials: {
        ['04___Default'] : THREE.MeshStandardMaterial,
        ['03___Default'] : THREE.MeshStandardMaterial,
        ['02___Default'] : THREE.MeshStandardMaterial,
        ['01___Default'] : THREE.MeshStandardMaterial,
    }
}

export function Tablet() {
  const { nodes, materials } = useGLTF("/models/Tablet.glb") as GLTFResult;
  return (
    <group scale={0.03} rotation-x={Math.PI / 2} dispose={null}>
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
