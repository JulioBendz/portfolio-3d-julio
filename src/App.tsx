import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import AnimatedCube from './components/AnimatedCube';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectDetailModal from './components/ProjectDetailModal';
import StarsBackground from './components/StarsBackground';
import ProfileCard from './components/ProfileCard';
import ProjectDisplay from './components/ProjectDisplay';
import { projectsData, Project } from './data/projects';

function App() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      setSelectedSkill(null);
      setIsAutoRotating(true);
    }, 10000); // 10 seconds
  };

  const pauseInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, []);

  const handleSkillClick = (skill: string | null) => {
    setSelectedSkill(skill);
    setIsAutoRotating(false);
    resetInactivityTimer();
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    pauseInactivityTimer(); // Pause timer when modal opens
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    // Only reset timer if no skill was selected (i.e., cube was auto-rotating)
    // Otherwise, keep the cube static on the selected skill
    if (selectedSkill === null) {
      resetInactivityTimer();
    }
  };

  const currentProjects = selectedSkill ? projectsData[selectedSkill] || [] : [];

  return (
    <div className="relative h-screen w-screen bg-[#282c34]">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <StarsBackground skill={selectedSkill} />
        </Canvas>
      </div>

      {/* Banner de "En Desarrollo" responsive */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-4">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-2xl animate-pulse">
          <span className="text-sm sm:text-lg font-bold flex items-center justify-center">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full mr-2 sm:mr-3 animate-ping"></span>
            🚧 En Desarrollo
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <Header />
        
  {/* Contenido principal */}
  <main className="flex-1 flex flex-col lg:flex-row gap-4 p-2 sm:p-4 overflow-auto pt-6">
          {/* Columna izquierda: ProfileCard centrado */}
          <div className="flex flex-col items-center justify-start order-1 lg:order-1 lg:w-1/2">
            <ProfileCard />
          </div>
          
          {/* Columna derecha: Cubo 3D (overlay proyectos sólo en desktop dentro del propio componente) */}
          <div className="relative w-full h-80 sm:h-96 lg:h-full flex items-end sm:items-end lg:items-center justify-center order-2 lg:order-2 lg:w-1/2">
            <div className="w-full h-full max-w-sm sm:max-w-md lg:max-w-md max-h-sm sm:max-h-md lg:max-h-md">
              <Canvas>
                <AnimatedCube
                  onSkillClick={handleSkillClick}
                  isAutoRotating={isAutoRotating}
                  setIsAutoRotating={setIsAutoRotating}
                  projects={currentProjects}
                  onProjectClick={handleProjectClick}
                  selectedSkill={selectedSkill}
                />
              </Canvas>
            </div>
          </div>

          {/* Lista de proyectos SOLO en pantallas pequeñas y medianas (debajo del cubo). Oculta en lg porque ahí se muestra overlay 3D. */}
          <div className="block lg:hidden w-full order-3">
            <ProjectDisplay projects={currentProjects} onProjectClick={handleProjectClick} />
          </div>
        </main>
        
        <Footer />
      </div>

      <ProjectDetailModal 
        project={selectedProject} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default App;
