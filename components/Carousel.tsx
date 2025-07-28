'use client'

import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Image, type ImageProps, useScroll } from '@react-three/drei'
import { easing } from 'maath'

interface CardProps {
  url: string;
  text: string;
}

const images: CardProps[] = [
  { url: '/images/image1.png', text: 'Image 1' },
  { url: '/images/image1.png', text: 'Image 2' },
  { url: '/images/image1.png', text: 'Image 3' },
  { url: '/images/image1.png', text: 'Image 4' },
  { url: '/images/image1.png', text: 'Image 5' },
]

export default function Carousel({ radius = 0.7 }: { radius?: number }) {
  const groupRef: THREE.Group | null = useRef(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0002
    }

    //state.events.update?.()
    //state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={groupRef}>
      {images.map(({ url, text }, i) => {
        const count = images.length;
        return (
          <Card
            key={i}
            text={text}
            url={url}
            position={[
              -Math.sin((i / count) * Math.PI * 2) * radius,
            0,
            Math.cos((i / count) * Math.PI * 2) * radius,
          ]}
          rotation={[0, -(i / count) * Math.PI * 2, 0]}
        />
      )})}
    </group>
  )
}

export function Card({ url, text, ...props }: ImageProps & { url: string, text: string }) {
  const ref = useRef<THREE.Mesh>(null)

  const [hovered, hover] = useState(false)
  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 0.6 : 0.5, 0.1, delta)
    easing.damp(ref.current.material, 'radius', hovered ? 0.16 : 0.08, 0.2, delta)
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.4, 0.2, delta)
  })



  return (
    <group {...props}>
      <Image transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} alt={url} radius={0.05} url={url} ref={ref} />
      <Text fontSize={0.1} color="white" position={[0, 0, 0.001]}>
        {text}
      </Text>
    </group>
  )
}