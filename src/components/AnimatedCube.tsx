import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Quaternion, Euler } from 'three';
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

// These are the target rotations for the CUBE to bring a face to the front.
const targetCubeEulerRotations = [
    new Euler(0, 0, 0),         // Front
    new Euler(0, Math.PI, 0),   // Back
    new Euler(0, Math.PI / 2, 0),  // Left
    new Euler(0, -Math.PI / 2, 0), // Right
    new Euler(Math.PI / 2, 0, 0), // Top
    new Euler(-Math.PI / 2, 0, 0),  // Bottom
];

interface RotatingCubeProps {
  isAutoRotating: boolean;
  targetQuaternion: Quaternion;
  onRotationComplete: () => void;
  onFaceClick: (skillIndex: number) => void;
}

const RotatingCube = ({ isAutoRotating, targetQuaternion, onRotationComplete, onFaceClick }: RotatingCubeProps) => {
  const meshRef = useRef<Group>(null!);
  const [isRotating, setIsRotating] = useState(false);

  // Detectar el tamaño de pantalla para ajustar el tamaño del cubo
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 1024;
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  
  // Tamaño del cubo según el dispositivo
  let cubeSize = 3.2; // Tamaño base
  if (isMobile) {
    cubeSize = 3.5; // Un poco más grande en móviles pero no tanto
  } else if (isTablet) {
    cubeSize = 3.3; // Ligeramente más grande en tablets
  } else {
    cubeSize = 3.2; // Tamaño original en desktop
  }

  // Posición Y del cubo según el dispositivo
  const cubePositionY = isMobile ? -1 : isTablet ? -0.8 : 0; // Mover hacia abajo en móviles

  useFrame(() => {
    if (!meshRef.current) return;

    if (isAutoRotating) {
      meshRef.current.rotation.y += 0.005;
    } else {
      if (!meshRef.current.quaternion.equals(targetQuaternion)) {
        meshRef.current.quaternion.slerp(targetQuaternion, 0.1);
        if (meshRef.current.quaternion.angleTo(targetQuaternion) < 0.01) {
          meshRef.current.quaternion.copy(targetQuaternion);
          if(isRotating) {
            onRotationComplete();
            setIsRotating(false);
          }
        }
      }
    }
  });

  const handleFaceClick = (skillIndex: number) => {
    setIsRotating(true);
    onFaceClick(skillIndex);
  }

  return (
    <group ref={meshRef} position={[0, cubePositionY, 0]}>
      <mesh>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
        <meshStandardMaterial color={'#64B5F6'} transparent={true} opacity={0.3} />
        <Edges>
          <meshBasicMaterial attach="material" color="#FFFFFF" />
        </Edges>
      </mesh>
      {skills.map((skill, index) => (
        <Text
          key={skill}
          position={[facePositions[index][0] * (cubeSize/3.2), facePositions[index][1] * (cubeSize/3.2), facePositions[index][2] * (cubeSize/3.2)]}
          rotation={faceRotations[index]}
          fontSize={isMobile ? 0.55 : isTablet ? 0.52 : 0.5}
          color="#fff"
          anchorX="center"
          anchorY="middle"
          onClick={() => handleFaceClick(index)}
        >
          {skill}
        </Text>
      ))}
    </group>
  );
};

interface AnimatedCubeProps {
  onSkillClick: (skill: string | null) => void;
  isAutoRotating: boolean;
  setIsAutoRotating: (isAutoRotating: boolean) => void;
}

const AnimatedCube = ({ onSkillClick, isAutoRotating, setIsAutoRotating }: AnimatedCubeProps) => {
  const [targetQuaternion, setTargetQuaternion] = useState(new Quaternion());
  const [currentSkill, setCurrentSkill] = useState<string | null>(null);

  const targetQuaternions = useMemo(() => targetCubeEulerRotations.map(euler => new Quaternion().setFromEuler(euler)), []);

  const handleFaceClick = (skillIndex: number) => {
    setIsAutoRotating(false);
    setTargetQuaternion(targetQuaternions[skillIndex]);
    setCurrentSkill(skills[skillIndex]);
  };

  const handleRotationComplete = () => {
    if (currentSkill) {
      onSkillClick(currentSkill);
    }
  };

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <RotatingCube
        isAutoRotating={isAutoRotating}
        targetQuaternion={targetQuaternion}
        onFaceClick={handleFaceClick}
        onRotationComplete={handleRotationComplete}
      />
    </>
  );
};

export default AnimatedCube;
