import React, { useEffect } from 'react';
import { Project } from '../data/projects';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con botón de cerrar */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">{project.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 sm:p-6">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-md mb-4 sm:mb-6" 
          />
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
            {project.description}
          </p>
          
          {/* Botones de acción */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Cerrar
            </button>
            {project.url && (
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center transition-colors"
              >
                Ver Proyecto
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
