import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import AnimatedCube from './components/AnimatedCube';
import Header from './components/Header';
import Footer from './components/Footer';
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
          {/* Columna izquierda: ProfileCard + Panel proyectos (solo desktop) */}
          <div className="flex flex-col gap-4 order-1 lg:order-1 w-full lg:w-1/2 relative">
            <ProfileCard />
            <div className={`hidden lg:block rounded-2xl border border-gray-700/40 overflow-hidden transition-all duration-500 ease-out ${selectedSkill ? 'bg-gray-950/70 backdrop-blur-sm opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'}`}>
              {selectedSkill && (
                <div className="h-full p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-xl font-bold">Proyectos de {selectedSkill}</h3>
                    <button onClick={() => setSelectedSkill(null)} className="text-xs text-gray-300 hover:text-white border border-gray-500/40 px-2 py-1 rounded-md transition-colors">Cerrar</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-1 custom-scrollbar max-h-[50vh]">
                    {currentProjects.map((project, idx) => (
                      <div key={idx} className="bg-gray-800/80 hover:bg-gray-800/95 p-4 rounded-xl border border-gray-600/50 hover:border-blue-400/60 transition-all duration-200 flex flex-col group">
                        <h4 className="text-white text-sm font-semibold mb-2 group-hover:text-blue-300 line-clamp-2 min-h-[2.5rem]">{project.title}</h4>
                        <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-3 flex-1">{project.description}</p>
                        <div className="flex gap-2 mt-auto">
                          <button onClick={() => handleProjectClick(project)} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-2 rounded-lg text-xs transition-colors">Ver más</button>
                          {project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-2 rounded-lg text-xs text-center transition-colors">Demo</a>
                          )}
                        </div>
                      </div>
                    ))}
                    {selectedSkill && currentProjects.length === 0 && (
                      <div className="col-span-2 text-center text-gray-300 text-sm py-10 border border-dashed border-gray-600/40 rounded-xl">Sin proyectos aún.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha: Cubo 3D vuelve a su lugar original */}
          <div className="relative w-full h-80 sm:h-96 lg:h-full flex items-end sm:items-end lg:items-center justify-center order-2 lg:order-2 lg:w-1/2">
            <div className="w-full h-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Canvas>
                <AnimatedCube
                  onSkillClick={handleSkillClick}
                  isAutoRotating={isAutoRotating}
                  setIsAutoRotating={setIsAutoRotating}
                />
              </Canvas>
            </div>
          </div>

          {/* Panel proyectos en móviles/tablets (similar estilo, debajo del cubo) */}
          <div className={`block lg:hidden w-full order-3 transition-all duration-500 ease-out ${selectedSkill ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'}`}>
            {selectedSkill && (
              <div className="rounded-2xl border border-gray-700/40 bg-gray-950/70 backdrop-blur-sm p-4 sm:p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg sm:text-xl font-bold">Proyectos de {selectedSkill}</h3>
                  <button onClick={() => setSelectedSkill(null)} className="text-xs text-gray-300 hover:text-white border border-gray-500/40 px-2 py-1 rounded-md transition-colors">Cerrar</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pr-1 custom-scrollbar max-h-[50vh]">
                  {currentProjects.map((project, idx) => (
                    <div key={idx} className="bg-gray-800/80 hover:bg-gray-800/95 p-4 rounded-xl border border-gray-600/50 hover:border-blue-400/60 transition-all duration-200 flex flex-col group">
                      <h4 className="text-white text-sm font-semibold mb-2 group-hover:text-blue-300 line-clamp-2 min-h-[2.5rem]">{project.title}</h4>
                      <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-3 flex-1">{project.description}</p>
                      <div className="flex gap-2 mt-auto">
                        <button onClick={() => handleProjectClick(project)} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-2 rounded-lg text-xs transition-colors">Ver más</button>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-2 rounded-lg text-xs text-center transition-colors">Demo</a>
                        )}
                      </div>
                    </div>
                  ))}
                  {selectedSkill && currentProjects.length === 0 && (
                    <div className="col-span-1 sm:col-span-2 text-center text-gray-300 text-sm py-10 border border-dashed border-gray-600/40 rounded-xl">Sin proyectos aún.</div>
                  )}
                </div>
              </div>
            )}
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
