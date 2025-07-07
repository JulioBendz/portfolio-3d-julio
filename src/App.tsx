import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import AnimatedCube from './components/AnimatedCube';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectDisplay from './components/ProjectDisplay';
import ProjectDetailModal from './components/ProjectDetailModal';
import StarsBackground from './components/StarsBackground';
import ExternalLinkButton from './components/ExternalLinkButton';
import { projectsData, Project } from './data/projects';

function App() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(skill);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="relative h-screen w-screen bg-[#282c34]">
      {/* Fondo de estrellas a pantalla completa */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <StarsBackground skill={selectedSkill} />
        </Canvas>
      </div>

      {/* Botón WordPress HTML (alternativa funcional) */}
      <ExternalLinkButton />

      {/* Contenido principal */}
      <div className="relative z-10 grid grid-rows-[auto_1fr_auto] h-full">
        <Header />
        <main className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 p-4 overflow-auto">
          <div className="flex flex-col items-start justify-start">
            <ProjectDisplay 
              projects={selectedSkill ? projectsData[selectedSkill] || [] : []} 
              onProjectClick={handleProjectClick} 
            />
          </div>
          <div className="relative w-full h-full flex items-center justify-end">
            <div className="w-full h-full max-w-md max-h-md">
              <Canvas>
                <AnimatedCube onSkillClick={handleSkillClick} />
              </Canvas>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
