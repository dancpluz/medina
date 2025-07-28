'use client'

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { easing } from 'maath';
import Main from './Main';

function CameraParallax() {
  useFrame((state, delta) => {
    const { pointer, camera } = state
    const factor = 0.05
    easing.dampE(
      camera.rotation,
      [pointer.y * factor, -pointer.x * factor, 0],
      0.25,
      delta
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
      <Environment preset="city" />
      <Main />
    </Canvas>
  )
}
