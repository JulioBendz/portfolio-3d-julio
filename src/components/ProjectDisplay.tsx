import React from 'react';
import { Project } from '../data/projects';

interface ProjectDisplayProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectDisplay: React.FC<ProjectDisplayProps> = ({ projects, onProjectClick }) => {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="w-full p-2 sm:p-4 z-10 bg-gray-900 bg-opacity-30">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-white text-lg sm:text-xl font-bold mb-4 text-center">
          Proyectos de {projects[0]?.title?.split(' ')[0] || 'Habilidad'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 bg-opacity-75 p-3 sm:p-4 rounded-lg flex flex-col hover:bg-opacity-90 transition-all duration-300">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-24 sm:h-32 md:h-40 object-cover rounded-md mb-3 sm:mb-4" 
              />
              <h3 className="text-white text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base flex-grow mb-3 sm:mb-4">{project.description}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => onProjectClick(project)}
                  className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:px-4 rounded text-sm sm:text-base transition-colors"
                >
                  Ver más
                </button>
                {project.url && (
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 sm:px-4 rounded text-sm sm:text-base transition-colors text-center"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplay;