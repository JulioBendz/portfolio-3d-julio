export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  url?: string; // URL opcional del proyecto
}

// Nota: Se usan imágenes OpenGraph de GitHub para previsualización rápida.
// Formato: https://opengraph.githubassets.com/1/{owner}/{repo}
export const projectsData: { [key: string]: Project[] } = {
  React: [
    {
      title: 'Portfolio 3D (React + Three.js)',
      description: 'Portafolio interactivo 3D construido con React, Vite, Three.js y TailwindCSS.',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/portfolio-3d-julio',
      url: 'https://github.com/JulioBendz/portfolio-3d-julio'
    },
    {
      title: 'Universo Dictariano (React 3D)',
      description: 'Experimento 3D interactivo con React y three/fiber explorando un universo temático.',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/universo-dictariano',
      url: 'https://github.com/JulioBendz/universo-dictariano'
    }
  ],
  Angular: [
    {
      title: 'Angular Firebase Auth CRUD',
      description: 'Aplicación Angular con autenticación Firebase y operaciones CRUD.',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/angular-firebase-auth-crud',
      url: 'https://github.com/JulioBendz/angular-firebase-auth-crud'
    },
    {
      title: 'Angular 19 Demo',
      description: 'Proyecto base en Angular 19 explorando estructura modular y buenas prácticas.',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/AngularProject',
      url: 'https://github.com/JulioBendz/AngularProject'
    }
  ],
  'Three.js': [
    {
      title: 'Planet Three',
      description: 'Escena 3D con planetas usando Three.js y Vite, efectos de iluminación y orbit controls.',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/planet-three',
      url: 'https://github.com/JulioBendz/planet-three'
    },
    {
      title: 'Planet Three Vite',
      description: 'Variación ligera del proyecto de planetas optimizada para Vite + Three.js.',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/planet-threejs-vite',
      url: 'https://github.com/JulioBendz/planet-threejs-vite'
    },
    {
      title: 'Universo Dictariano',
      description: 'Proyecto 3D interactivo reutilizado también para demostrar integración con React.',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/universo-dictariano',
      url: 'https://github.com/JulioBendz/universo-dictariano'
    }
  ],
  'Node.js': [
    {
      title: 'API Colors Docker',
      description: 'API REST CRUD (Node.js + Express + MySQL) dockerizada y desplegable en Render.',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/API_Colors_Docker',
      url: 'https://github.com/JulioBendz/API_Colors_Docker'
    },
    {
      title: 'API Colores',
      description: 'Versión base de la API CRUD de colores (Node.js + Express + MySQL).',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/API_Colores',
      url: 'https://github.com/JulioBendz/API_Colores'
    }
  ],
  SQL: [
    {
      title: 'API Colors Docker (MySQL)',
      description: 'Implementación de persistencia MySQL para gestión de colores con migración dockerizada.',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/API_Colors_Docker',
      url: 'https://github.com/JulioBendz/API_Colors_Docker'
    },
    {
      title: 'API Colores (MySQL)',
      description: 'CRUD de colores usando Node.js + Express + MySQL enfocada en simplicidad.',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/API_Colores',
      url: 'https://github.com/JulioBendz/API_Colores'
    }
  ],
  '.Net': [
    {
      title: 'Aventura Inca en el Tiempo',
      description: 'Juego narrativo en C# que mezcla exploración y viajes temporales (concepto/prototipo).',
      imageUrl: 'https://opengraph.githubassets.com/1/JulioBendz/Aventura-Inca-en-el-Tiempo',
      url: 'https://github.com/JulioBendz/Aventura-Inca-en-el-Tiempo'
    }
  ]
};