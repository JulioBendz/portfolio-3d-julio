import React from 'react';
import { Project } from '../data/projects';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
        <img src={project.imageUrl} alt={project.title} className="w-full h-96 object-cover rounded-md mb-4" />
        <p className="text-gray-700 text-lg">{project.description}</p>
        <button 
          onClick={onClose}
          className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
