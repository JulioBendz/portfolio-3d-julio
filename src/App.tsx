import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import AnimatedCube from './components/AnimatedCube';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectDisplay from './components/ProjectDisplay';
import ProjectDetailModal from './components/ProjectDetailModal';
import StarsBackground from './components/StarsBackground';
import ExternalLinkButton from './components/ExternalLinkButton';
import ProfileCard from './components/ProfileCard';
import { projectsData, Project } from './data/projects';

function App() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

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

      <div className="relative z-10 grid grid-rows-[auto_1fr_auto] h-full">
        <Header />
        <main className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 p-4 overflow-auto pt-6">
          <div 
            className="flex flex-col items-start justify-start"
            onMouseEnter={pauseInactivityTimer}
            onMouseLeave={resetInactivityTimer}
          >
            <ProfileCard />
            <ProjectDisplay 
              projects={selectedSkill ? projectsData[selectedSkill] || [] : []} 
              onProjectClick={handleProjectClick} 
            />
          </div>
          <div className="relative w-full h-full flex items-center justify-end">
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
