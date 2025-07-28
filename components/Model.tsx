
import * as THREE from 'three'
import React, { JSX, useRef, useState } from 'react'
import { useGLTF, Text, MeshTransmissionMaterial, useCursor } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame, useThree } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
// import { useControls } from 'leva'

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
  const { nodes } = useGLTF('/heart.glb') as unknown as GLTFResult;
  const velocity = useRef(0);
  const [hovered, setHovered] = useState(false)
  const [grabbing, setGrabbing] = useState(false)
  useCursor(hovered, 'pointer', 'auto')
  useCursor(grabbing, 'grabbing', 'pointer')

  const [pulsing, setPulsing] = useState(false)
  const pulseRef = useRef(0)
  const PULSE_DURATION = 0.5 // seconds

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.z += 0.01;
      // momentum
      mesh.current.rotation.z += velocity.current
      // friction
      velocity.current *= 0.95
    }
    if (pulsing) {
      pulseRef.current += delta
      const t = pulseRef.current / PULSE_DURATION
      if (t >= 1) {
        setPulsing(false)
        pulseRef.current = 0
        mesh.current.scale.set(1, 1, 1)
      } else {
        // scale curve: ease out then return
        const scale = 1 + Math.sin(Math.PI * t) * 0.1
        mesh.current.scale.set(scale, scale, scale)
      }
    }
  })

  // const materialProps = useControls({
  //   thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
  //   roughness: { value: 0, min: 0, max: 1, step: 0.1 },
  //   transmission: { value: 1, min: 0, max: 1, step: 0.1 },
  //   ior: { value: 1.1, min: 0, max: 3, step: 0.1 },
  //   chromaticAberration: { value: 0.30, min: 0, max: 1 },
  //   backside: { value: true },
  //   color: { value: '#ff5454' },
  // })

  const materialProps = {
    thickness: 0.2,
    roughness: 0,
    transmission: 1,
    ior: 1.1,
    chromaticAberration: 0.30,
    backside: true,
    color: '#ff5454',
    envMapIntensity: 1,
  }

  const bind = useDrag(
    ({ movement: [mx], active }) => {
      setGrabbing(active)
      setPulsing(true)
      if (active) {
        velocity.current = mx / 6000 // tune sensitivity
      }
    },
    {
      pointer: { touch: true },
      filterTaps: true,
      axis: 'x',
    }
  )

  return (
    <group {...props} >
      <Text fontSize={0.4} textAlign='center' position={[0, 0.8, -0.5]} font='/fonts/DSNarXC.ttf' color="black">
        Eu te amo
      </Text>
      <Text fontSize={1.9} textAlign='center' position={[0, 0, -1]} font='/fonts/DSNarXC.ttf' color="black">
        Medina
      </Text>
      <mesh
        ref={mesh}
        {...nodes.Heart}
        onClick={(e) => { e.stopPropagation(); if (!pulsing) setPulsing(true) }}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => (setHovered(false))}
        {...bind()}
      >
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  )
}