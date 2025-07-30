import React, { useState } from 'react';

// Componente HTML (versión alternativa)
const ExternalLinkButton: React.FC = () => {
  const [hovered, setHover] = useState(false);

  const openLink = () => {
    console.log('HTML Button clicked! Opening link...');
    window.open('https://portfoliowp.juliobendezu.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={openLink}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`
        px-4 py-2 rounded-xl font-bold text-white text-lg
        transition-all duration-300 transform hover:scale-110
        ${hovered ? 'bg-blue-500 shadow-2xl' : 'bg-blue-600 shadow-xl'}
        hover:shadow-3xl backdrop-blur-sm
      `}
      style={{
        background: hovered ? '#4a90e2' : '#357abD',
        boxShadow: hovered 
          ? '0 20px 40px rgba(74, 144, 226, 0.4), 0 0 20px rgba(74, 144, 226, 0.2)' 
          : '0 10px 30px rgba(53, 122, 189, 0.3), 0 0 15px rgba(53, 122, 189, 0.1)',
        border: '2px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      Portafolio en WordPress
    </button>
  );
};

export default ExternalLinkButton;
