import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

// Componente Three.js (versión original)
const WordPressButton3D: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.position.y = Math.sin(t * 2) * 0.1;
    }
  });

  const openLink = () => {
    console.log('Button clicked! Attempting to open link...');
    try {
      // Intentar múltiples métodos para abrir el enlace
      const url = 'https://juliobendezu.com';
      
      // Método 1: window.open
      const newWindow = window.open(url, '_blank');
      
      // Si window.open falla, usar location.href
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        console.log('window.open failed, trying location.href...');
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error opening link:', error);
      // Fallback final
      window.location.href = 'https://juliobendezu.com';
    }
  };

  const handlePointerOver = (event: any) => {
    console.log('Pointer over detected');
    event.stopPropagation();
    setHover(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (event: any) => {
    console.log('Pointer out detected');
    event.stopPropagation();
    setHover(false);
    document.body.style.cursor = 'default';
  };

  const handleClick = (event: any) => {
    console.log('Click detected on WordPress button');
    event.stopPropagation();
    event.preventDefault();
    openLink();
  };

  return (
    <Billboard>
      <mesh
        ref={mesh}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerDown={(e) => {
          console.log('Pointer down detected');
          e.stopPropagation();
        }}
        onPointerUp={(e) => {
          console.log('Pointer up detected');
          e.stopPropagation();
        }}
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
          Realizado con React (varia segun la seleccion del cubo)
        </Text>
      </mesh>
    </Billboard>
  );
};

// Componente HTML (versión alternativa)
const WordPressButtonHTML: React.FC = () => {
  const [hovered, setHover] = useState(false);

  const openLink = () => {
    console.log('HTML Button clicked! Opening link...');
    window.open('https://juliobendezu.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={openLink}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`
        fixed top-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
        px-8 py-4 rounded-xl font-bold text-white text-lg
        transition-all duration-300 transform hover:scale-110
        ${hovered ? 'bg-blue-500 shadow-2xl' : 'bg-blue-600 shadow-xl'}
        hover:shadow-3xl backdrop-blur-sm
      `}
      style={{
        background: hovered ? '#4a90e2' : '#357abD',
        boxShadow: hovered 
          ? '0 20px 40px rgba(74, 144, 226, 0.4), 0 0 20px rgba(74, 144, 226, 0.2)' 
          : '0 10px 30px rgba(53, 122, 189, 0.3), 0 0 15px rgba(53, 122, 189, 0.1)',
        border: '2px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      Portafolio en WordPress
    </button>
  );
};

// Exportar ambos componentes
export { WordPressButton3D, WordPressButtonHTML };
export default WordPressButton3D;
