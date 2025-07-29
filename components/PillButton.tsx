import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text, useCursor } from '@react-three/drei';

export default function PillButtonMetal({
  label = 'BUTTON',
  position = [0, 0, 0] as [number, number, number],
  onClick,
}: {
  label?: string;
  position?: [number, number, number];
  onClick?: () => void;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const textRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useCursor(hovered, 'pointer', 'auto');

  useFrame((_, delta) => {
    if (mesh.current) {
      const targetScale = pressed ? 0.9 : hovered ? 1.05 : 1;
      mesh.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        5 * delta
      );
    }
  });

  return (
    <group position={position} ref={mesh}>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => (e.stopPropagation(), setHovered(false))}
        onClick={(e) => {
          e.stopPropagation();
          setPressed(true);
          onClick?.();
          setTimeout(() => setPressed(false), 150);
        }}
      >
        <capsuleGeometry args={[0.02, 0.05, 16, 32]} />
        <meshPhysicalMaterial
          color="#cccccc"
          metalness={1}
          roughness={0.15}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          envMapIntensity={1}
        />
      </mesh>
      <Text
        ref={textRef}
        position={[0, 0.01, 0.025]}
        fontSize={0.012}
        font="/fonts/Montserrat-Black.otf"
        color={'#fff'}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}
