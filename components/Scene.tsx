'use client'

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Model from './Model';

export default function Scene() {
  return (
    <Canvas camera={{ fov: 50 }} style={{ backgroundColor: 'white' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={3} position={[10, 10, 5]} />
      <Environment preset="city" />
      <OrbitControls />
      <Model />
    </Canvas>
  )
}
