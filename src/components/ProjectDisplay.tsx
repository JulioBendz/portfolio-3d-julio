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
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-6xl p-4 z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 bg-opacity-75 p-4 rounded-lg flex flex-col">
            <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-white text-xl font-bold">{project.title}</h3>
            <p className="text-gray-300 flex-grow">{project.description}</p>
            <button 
              onClick={() => onProjectClick(project)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ver más
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDisplay;