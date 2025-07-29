import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane, Image as Image2D, Text, useCursor } from '@react-three/drei'
import { easing } from 'maath'

interface CardProps { url: string; text: string; targetRotation?: number };

const cards: CardProps[] = [
  { url: '/images/image1.jpg', text: 'Linda' },
  { url: '/images/image2.jpg', text: 'Inteligente' },
  { url: '/images/image3.jpg', text: 'Doidinha' },
  { url: '/images/image4.jpg', text: 'Amorosa' },
  { url: '/images/image5.jpg', text: 'Estilosa' },
  { url: '/images/image6.jpg', text: 'Cheirosa' },
  { url: '/images/image7.jpg', text: 'Divertida' },
]

const count = cards.length

cards.forEach((card, i) => {
  card.targetRotation = (i * (2 * Math.PI)) / count
})

function deltaShortest(target: number, current: number): number {
  let a = target - current;
  a = ((a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
  return a;
}

export default function Carousel({ radius = 0.7 }: { radius?: number }) {
  const [selectedCard, setSelectedCard] = useState<CardProps | null>(null)
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    const currentRotation = groupRef.current.rotation
    if (selectedCard !== null && selectedCard.targetRotation !== undefined) {
      const d = deltaShortest(selectedCard.targetRotation, currentRotation.y);
      easing.damp(groupRef.current.rotation, 'y', currentRotation.y + d, 0.1, delta);
    } else {
      currentRotation.y += 0.0008
    }
  })

  return (
    <>
      {/* click outside to reset */}
      <Plane
        onClick={(e) => (e.stopPropagation(), setSelectedCard(null))}
        args={[10, 10]}
        position={[0, 0, -2]}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>
      <group ref={groupRef}>
        {cards.map((card, i) => {
          const angle = i * (2 * Math.PI) / count
          return (
            <group
              key={i}
              position={[
                -Math.sin(angle) * radius,
                0,
                Math.cos(angle) * radius,
              ]}
              rotation={[0, -angle, 0]}
              scale={0.8}
              onClick={(e) => (e.stopPropagation(), setSelectedCard(card))}
            >
              <Card url={card.url} text={card.text} selected={card === selectedCard} />
            </group>
          )
        })}
      </group>
    </>
  )
}

interface CardComponentProps {
  url: string
  text: string
  selected: boolean
}

export function Card({ url, selected, text }: CardComponentProps) {
  const imageRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered, 'pointer', 'auto')

  useFrame((state, delta) => {
    easing.damp3(imageRef.current.scale, selected || hovered ? 0.6 : 0.5, 0.1, delta)
    easing.damp(imageRef.current.material, 'radius', selected || hovered ? 0.16 : 0.08, 0.2, delta)
    easing.damp(imageRef.current.material, 'zoom', selected || hovered ? 1 : 1.4, 0.2, delta)
    easing.damp(imageRef.current.material, 'opacity', selected || hovered ? 1 : 0.7, 0.2, delta)
    easing.damp(textRef.current.material, 'opacity', selected ? 0.75 : 0, 0.2, delta)
    const t = state.clock.getElapsedTime();
    textRef.current.position.y = Math.sin(t * 1.5) * 0.02;
  })

  return (
    <>
      <Image2D
        ref={imageRef}
        url={url}
        radius={0.05}
        transparent
        side={THREE.DoubleSide}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => (e.stopPropagation(), setHovered(false))}
      />
      <Text
        ref={textRef}
        font='/fonts/Degular-Black.otf'
        fontSize={0.1}
        letterSpacing={-0.04}
        color='white'
        material-opacity={0}
        //strokeColor='black'
        //strokeOpacity={1}
        //strokeWidth={0.002}
        position={[0, 0, 0.001]}
        anchorX='center'
        anchorY='middle'
      >
        {text.toUpperCase()}
      </Text>
    </>
  )
}
