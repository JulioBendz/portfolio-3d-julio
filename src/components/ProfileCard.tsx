import React from 'react';

const ProfileCard: React.FC = () => {
  return (
    <div className="flex flex-col items-start z-10">
      <div className="flex items-center">
        <img 
          src="/my-photo.jpg" 
          alt="Foto de perfil" 
          className="rounded-full w-20 h-20 object-cover border-4 border-white shadow-lg"
        />
        <div className="ml-4">
          <h1 className="text-white text-3xl font-bold">Julio Bendezú</h1>
          <p className="text-gray-300 text-lg">Desarrollador de Software</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;