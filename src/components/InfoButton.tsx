import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

interface InfoButtonProps {
  skill: string | null;
}

const InfoButton: React.FC<InfoButtonProps> = ({ skill }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.position.y = Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <Billboard>
      <mesh
        ref={mesh}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[3.2, 0.7, 0.1]} />
        <meshStandardMaterial 
          color={hovered ? '#4a90e2' : '#357abD'} 
          transparent
          opacity={hovered ? 0.9 : 0.8}
        />
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {skill ? `Realizado con ${skill}` : 'Selecciona una habilidad'}
        </Text>
      </mesh>
    </Billboard>
  );
};

export default InfoButton;
