'use client'

import React from 'react';
import CarouselModel from './CarouselModel';
import HeartModel from './HeartModel';
import { useThree } from '@react-three/fiber';
//import PillButton from './PillButton';

export default function Main() {
  const { viewport } = useThree();
  const fit = Math.min(viewport.width, viewport.height)
  const padding = 0.8

  return (
    <group scale={fit * padding} position={[0, 0, -3]}>
      <HeartModel />
      <CarouselModel />
      {/* <PillButton position={[0, -0.08, 1.12]} /> */}
    </group>
  )
}
