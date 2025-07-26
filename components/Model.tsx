
import * as THREE from 'three'
import React, { JSX, useRef } from 'react'
import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

type GLTFResult = GLTF & {
  nodes: {
    Heart: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshPhysicalMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const mesh = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF('/heart.glb') as GLTFResult;
  const { viewport } = useThree();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.z += 0.01;
    }
  })

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
    color: { value: '#fff' },
    envMapIntensity: { value: 1, min: 0, max: 10, step: 0.1 }
  })

  return (
    <group scale={viewport.width / 3} {...props} >
      <Text fontSize={0.4} textAlign='center' position={[0, 0.8, -0.5]} font='/fonts/DSNarXC.ttf' color="black">
        Eu te amo
      </Text>
      <Text fontSize={1.9} textAlign='center' position={[0, 0, -1]} font='/fonts/DSNarXC.ttf' color="black">
        Medina
      </Text>
      <mesh {...nodes.Heart} ref={mesh}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  )
}