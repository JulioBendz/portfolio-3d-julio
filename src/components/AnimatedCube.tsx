import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Edges, Text } from '@react-three/drei';

const skills = ['Angular', 'React', 'Three.js', 'Node.js', 'SQL', '.Net'];

const facePositions: [number, number, number][] = [
  [0, 0, 1.6],  // Front
  [0, 0, -1.6], // Back
  [-1.6, 0, 0], // Left
  [1.6, 0, 0],  // Right
  [0, 1.6, 0],  // Top
  [0, -1.6, 0], // Bottom
];

const faceRotations: [number, number, number][] = [
  [0, 0, 0],         // Front
  [0, Math.PI, 0],   // Back
  [0, -Math.PI / 2, 0], // Left
  [0, Math.PI / 2, 0],  // Right
  [-Math.PI / 2, 0, 0], // Top
  [Math.PI / 2, 0, 0],  // Bottom
];

interface RotatingCubeProps {
  isAutoRotating: boolean;
  targetRotation: { x: number; y: number };
  onSkillClick: (skillIndex: number, skill: string) => void;
}

const RotatingCube = ({ isAutoRotating, targetRotation, onSkillClick }: RotatingCubeProps) => {
  const meshRef = useRef<Group>(null!);

  useFrame(() => {
    if (!meshRef.current) return;

    if (isAutoRotating) {
      meshRef.current.rotation.y += 0.005;
    } else {
      const diffX = targetRotation.x - meshRef.current.rotation.x;
      const diffY = targetRotation.y - meshRef.current.rotation.y;

      if (Math.abs(diffX) > 0.01 || Math.abs(diffY) > 0.01) {
        meshRef.current.rotation.x += diffX * 0.05;
        meshRef.current.rotation.y += diffY * 0.05;
      } else {
        meshRef.current.rotation.x = targetRotation.x;
        meshRef.current.rotation.y = targetRotation.y;
      }
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[3.2, 3.2, 3.2]} />
        <meshStandardMaterial color={'#64B5F6'} transparent={true} opacity={0.3} />
        <Edges>
          <meshBasicMaterial attach="material" color="#FFFFFF" />
        </Edges>
      </mesh>
      {skills.map((skill, index) => (
        <Text
          key={skill}
          position={facePositions[index]}
          rotation={faceRotations[index]}
          fontSize={0.5}
          color="#fff"
          anchorX="center"
          anchorY="middle"
          onClick={() => onSkillClick(index, skill)}
        >
          {skill}
        </Text>
      ))}
    </group>
  );
};

interface AnimatedCubeProps {
  onSkillClick: (skill: string) => void;
}

const AnimatedCube = ({ onSkillClick }: AnimatedCubeProps) => {
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [targetCubeRotation, setTargetCubeRotation] = useState({ x: 0, y: 0 });

  const handleSkillClick = (skillIndex: number, skill: string) => {
    setIsAutoRotating(false);
    const target = faceRotations[skillIndex];
    setTargetCubeRotation({ x: target[0], y: target[1] });
    onSkillClick(skill);
  };

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <RotatingCube
        isAutoRotating={isAutoRotating}
        targetRotation={targetCubeRotation}
        onSkillClick={handleSkillClick}
      />
    </>
  );
};

export default AnimatedCube;
