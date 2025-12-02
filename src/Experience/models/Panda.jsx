import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { texture, uv, Fn } from "three/tsl";

extend(THREE);

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/Panda.glb");

  const { meshColorNode } = useMemo(() => {
    const imageTexture = materials["Ship Image"].map;

    const textureNode = Fn(() => {
      return texture(imageTexture, uv());
    });

    const meshColorNode = textureNode();

    return {
      meshColorNode,
    };
  }, [materials]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[-9.795, -8.43, -10.075]}
      >
        <meshBasicNodeMaterial colorNode={meshColorNode} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Panda.glb");
