import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-2 sm:p-4 bg-gray-900 bg-opacity-50 text-white text-center text-xs sm:text-sm z-20">
      © {new Date().getFullYear()} Julio Bendezú. Todos los derechos reservados.
    </footer>
  );
};

export default Footer;