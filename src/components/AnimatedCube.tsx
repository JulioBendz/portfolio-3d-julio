import { useRef, useState, useMemo, useEffect } from 'react';
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
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  // Detectar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detectar el tamaño de pantalla para ajustar el tamaño del cubo
  const isMobile = windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024;
  const isLarge = windowSize.width >= 1024;
  
  // Tamaño del cubo según el dispositivo
  let cubeSize = 3.2; // Tamaño base
  if (isMobile) {
    cubeSize = 3.0; // Un poco más pequeño en móviles para evitar cortes
  } else if (isTablet) {
    cubeSize = 3.2; // Tamaño original en tablets
  } else {
    cubeSize = 3.2; // Tamaño original en desktop
  }

  // Posición Y del cubo según el dispositivo
  const cubePositionY = isMobile ? -0.5 : isTablet ? -0.3 : 0; // Mover hacia abajo en móviles

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
          fontSize={isMobile ? 0.5 : isTablet ? 0.52 : 0.5}
          color="#fff"
          anchorX="center"
          anchorY="middle"
          onClick={() => handleFaceClick(index)}
        >
          {skill}
        </Text>
      ))}
      
      {/* Proyectos como overlay SOLO en pantallas grandes (>=1024) */}
      {isLarge && projects.length > 0 && (
        <Html
          // Posicionar a la derecha del cubo para no taparlo
          position={[6.5, 1.2, 0]}
          center={false}
          transform={false}
          distanceFactor={12}
          zIndexRange={[0, 20]}
          style={{
            transform: 'none',
            width: '540px',
            maxWidth: '40vw',
            pointerEvents: 'auto'
          }}
        >
          <div className="bg-gray-950/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700/70 hover:border-gray-500 transition-colors duration-300">
            <h3 className="text-white text-xl font-bold mb-5 tracking-wide text-center">
              Proyectos de {selectedSkill}
            </h3>
            <div className="grid grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-800/80 hover:bg-gray-800/95 p-4 rounded-xl border border-gray-600/60 hover:border-blue-400/60 transition-all duration-200 flex flex-col group"
                >
                  <h4 className="text-white text-sm font-semibold mb-2 group-hover:text-blue-300 line-clamp-2 min-h-[2.5rem]">
                    {project.title}
                  </h4>
                  <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-3 flex-1">
                    {project.description}
                  </p>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => onProjectClick(project)}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-2 rounded-lg text-xs transition-colors"
                    >
                      Ver más
                    </button>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-2 rounded-lg text-xs text-center transition-colors"
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
