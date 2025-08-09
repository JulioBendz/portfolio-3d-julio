import React, { useState } from 'react';
import ExternalLinkButton from './ExternalLinkButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full p-4 bg-gray-900 bg-opacity-50 shadow-lg flex items-center justify-between z-20 relative">
      <div className="flex items-center">
        <img src="/Logo-Perfil.png" alt="Julio Bendezú Logo" className="h-8 w-8 sm:h-12 sm:w-12 mr-2 sm:mr-4" />
      </div>
      
      {/* Botón hamburguesa para móviles */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white p-2 z-30"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Navegación desktop */}
      <nav className="hidden md:flex justify-end">
        <ul className="flex space-x-6">
          <li><a href="#about" className="text-white hover:text-blue-400 text-lg font-semibold transition-colors">Acerca de</a></li>
          <li><a href="#skills" className="text-white hover:text-blue-400 text-lg font-semibold transition-colors">Habilidades</a></li>
          <li><a href="#contact" className="text-white hover:text-blue-400 text-lg font-semibold transition-colors">Contacto</a></li>
        </ul>
      </nav>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 bg-opacity-95 md:hidden z-40 border-t border-gray-700">
          <nav className="p-4">
            <ul className="flex flex-col space-y-4">
              <li><a href="#about" className="text-white hover:text-blue-400 text-lg font-semibold block transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Acerca de</a></li>
              <li><a href="#skills" className="text-white hover:text-blue-400 text-lg font-semibold block transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Habilidades</a></li>
              <li><a href="#contact" className="text-white hover:text-blue-400 text-lg font-semibold block transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Contacto</a></li>
            </ul>
          </nav>
        </div>
      )}

      {/* Botón externo centrado en desktop, oculto en móvil */}
      <div className="hidden md:flex flex-grow justify-center">
        <ExternalLinkButton />
      </div>
    </header>
  );
};

export default Header;