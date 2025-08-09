import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import AnimatedCube from './components/AnimatedCube';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectDisplay from './components/ProjectDisplay';
import ProjectDetailModal from './components/ProjectDetailModal';
import StarsBackground from './components/StarsBackground';
import ProfileCard from './components/ProfileCard';
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
        
        {/* Contenido principal reorganizado */}
        <main className="flex-1 flex flex-col lg:flex-row gap-4 p-2 sm:p-4 overflow-auto pt-6">
          {/* Columna izquierda: ProfileCard y botón */}
          <div className="flex flex-col items-start justify-start order-1 lg:order-1 lg:w-1/2">
            <ProfileCard />
          </div>
          
          {/* Columna derecha: Cubo 3D */}
          <div className="relative w-full h-64 sm:h-80 lg:h-full flex items-center justify-center order-2 lg:order-2 lg:w-1/2">
            <div className="w-full h-full max-w-md max-h-md">
              <Canvas>
                <AnimatedCube 
                  onSkillClick={handleSkillClick} 
                  isAutoRotating={isAutoRotating}
                  setIsAutoRotating={setIsAutoRotating}
                />
              </Canvas>
            </div>
          </div>
        </main>

        {/* Proyectos en la parte inferior */}
        <div 
          className="order-3"
          onMouseEnter={pauseInactivityTimer}
          onMouseLeave={resetInactivityTimer}
        >
          <ProjectDisplay 
            projects={selectedSkill ? projectsData[selectedSkill] || [] : []} 
            onProjectClick={handleProjectClick} 
          />
        </div>
        
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
