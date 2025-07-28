'use client'

import React from 'react';
import Carousel from './Carousel';
import Model from './Model';
import { useThree } from '@react-three/fiber';

export default function Main() {
  const { viewport } = useThree();
  const fit = Math.min(viewport.width, viewport.height)
  const padding = 0.8

  return (
    <group scale={fit * padding} position={[0, 0, -3]}>
      <Model />
      <Carousel />
    </group>
  )
}
