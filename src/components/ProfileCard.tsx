import React, { useState } from 'react';

const ProfileCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePortfolioClick = () => {
    window.open('https://portfoliowp.juliobendezu.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col items-start z-10 w-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
        <img 
          src="/my-photo.jpg" 
          alt="Foto de perfil" 
          className="rounded-full w-16 h-16 sm:w-20 sm:h-20 object-cover border-4 border-white shadow-lg mb-4 sm:mb-0"
        />
        <div className="sm:ml-4">
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-1">Julio Bendezú</h1>
          <p className="text-gray-300 text-base sm:text-lg">Desarrollador de Software</p>
        </div>
      </div>
      
      {/* Botón con mejor responsive */}
      <div className="mt-4 sm:mt-6 w-full sm:w-auto">
        <button
          onClick={handlePortfolioClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative overflow-hidden px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-white
            transition-all duration-300 ease-out w-full sm:w-auto
            ${isHovered ? 'scale-105' : 'scale-100'}
          `}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: isHovered 
              ? '0 15px 35px rgba(102, 126, 234, 0.4), 0 5px 15px rgba(118, 75, 162, 0.3)' 
              : '0 8px 25px rgba(102, 126, 234, 0.3), 0 3px 10px rgba(118, 75, 162, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <span className="relative z-10 flex items-center justify-center sm:justify-start">
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
            <span className="text-sm sm:text-base">Ver Portafolio Web</span>
          </span>
          {isHovered && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20"
              style={{
                animation: 'shimmer 1.5s ease-in-out infinite'
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;