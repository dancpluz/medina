'use client'

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Model from './Model';
import * as THREE from 'three';

function CameraParallax() {
  useFrame((state, delta) => {
    const { pointer, camera } = state
    const factor = 0.05
    // interpolate camera rotation based on pointer
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      pointer.y * factor,
      0.1
    )
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      -pointer.x * factor,
      0.1
    )
  })
  return null
}

export default function Scene() {
  return (
    <Canvas>
      <color attach="background" args={['white']} />
      {/* <OrbitControls /> */}
      <CameraParallax />
      <directionalLight intensity={3} position={[0, 3, 2]} />
      <Environment preset="sunset" />
      <Model />
    </Canvas>
  )
}
