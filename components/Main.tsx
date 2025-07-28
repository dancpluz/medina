'use client'

import React from 'react';
import Carousel from './Carousel';
import Model from './Model';
import { useThree } from '@react-three/fiber';

export default function Main() {
  const { viewport } = useThree();

  return (
    <group scale={viewport.width / 3} >
      <Model />
      <Carousel />
    </group>
  )
}
