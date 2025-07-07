import React from 'react';
import { Stars } from '@react-three/drei';
import WordPressButton from './WordPressButton';
import { useThree } from '@react-three/fiber';

const StarsBackground: React.FC = () => {
  const { viewport } = useThree();

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} speed={1} />
      <Stars radius={200} depth={80} count={8000} factor={6} saturation={1} speed={2} color="#FFD700" />
      <Stars radius={300} depth={120} count={12000} factor={8} saturation={1.5} speed={3} color="#ADD8E6" />
      <group position={[0, viewport.height / 2 - 1.3, 0]}>
        <WordPressButton />
      </group>
    </>
  );
};

export default StarsBackground;
