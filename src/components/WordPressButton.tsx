import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

const WordPressButton: React.FC = () => {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * 2) * 0.1;
    }
  });

  const openLink = () => {
    window.open('https://juliobendezu.com', '_blank');
  };

  return (
    <Billboard ref={group}>
      <mesh
        onClick={openLink}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[3, 0.6, 0.1]} />
        <meshStandardMaterial color={hovered ? '#4a90e2' : '#357abD'} />
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Portafolio en WordPress
        </Text>
      </mesh>
    </Billboard>
  );
};

export default WordPressButton;
