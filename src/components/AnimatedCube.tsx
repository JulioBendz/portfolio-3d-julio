import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Quaternion, Euler } from 'three';
import { Edges, Text, Html } from '@react-three/drei';
import { Project } from '../data/projects';

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
  projects: Project[];
  onProjectClick: (project: Project) => void;
  selectedSkill: string | null;
}

const RotatingCube = ({ isAutoRotating, targetQuaternion, onRotationComplete, onFaceClick, projects, onProjectClick, selectedSkill }: RotatingCubeProps) => {
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
      
      {/* Proyectos como overlay HTML */}
      {projects.length > 0 && (
        <Html position={[0, -4, 0]} center>
          <div className="bg-gray-900 bg-opacity-90 p-3 sm:p-4 rounded-lg shadow-lg border border-gray-700 max-w-xs sm:max-w-sm lg:max-w-md">
            <h3 className="text-white text-sm sm:text-base font-bold mb-2 text-center">
              Proyectos de {selectedSkill}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {projects.slice(0, 3).map((project, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-75 p-2 sm:p-3 rounded-lg flex flex-col">
                  <h4 className="text-white text-xs sm:text-sm font-bold mb-1">{project.title}</h4>
                  <p className="text-gray-300 text-xs mb-2 line-clamp-2">{project.description}</p>
                  <div className="flex gap-1 sm:gap-2">
                    <button 
                      onClick={() => onProjectClick(project)}
                      className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs transition-colors"
                    >
                      Ver más
                    </button>
                    {project.url && (
                      <a 
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs transition-colors text-center"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

interface AnimatedCubeProps {
  onSkillClick: (skill: string | null) => void;
  isAutoRotating: boolean;
  setIsAutoRotating: (isAutoRotating: boolean) => void;
  projects: Project[];
  onProjectClick: (project: Project) => void;
  selectedSkill: string | null;
}

const AnimatedCube = ({ onSkillClick, isAutoRotating, setIsAutoRotating, projects, onProjectClick, selectedSkill }: AnimatedCubeProps) => {
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
        projects={projects}
        onProjectClick={onProjectClick}
        selectedSkill={selectedSkill}
      />
    </>
  );
};

export default AnimatedCube;
