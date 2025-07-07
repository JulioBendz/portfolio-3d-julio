import React from 'react';
import ProfileCard from './ProfileCard';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 bg-gray-900 bg-opacity-50 shadow-lg flex items-center justify-between z-20">
      <ProfileCard />
      <nav className="flex-grow flex justify-end">
        <ul className="flex space-x-6">
          <li><a href="#about" className="text-white hover:text-blue-400 text-lg font-semibold">Acerca de</a></li>
          <li><a href="#skills" className="text-white hover:text-blue-400 text-lg font-semibold">Habilidades</a></li>
          <li><a href="#contact" className="text-white hover:text-blue-400 text-lg font-semibold">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;