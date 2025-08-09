export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  url?: string; // URL opcional del proyecto
}

export const projectsData: { [key: string]: Project[] } = {
  React: [
    { 
      title: 'Proyecto de E-commerce con React',
      description: 'Una tienda online completa construida con React, Redux y Firebase.',
      imageUrl: 'https://via.placeholder.com/300',
      url: 'https://github.com/example/ecommerce-react'
    },
    { 
      title: 'Clon de Netflix con React',
      description: 'Una interfaz de usuario inspirada en Netflix, utilizando la API de TMDB.',
      imageUrl: 'https://via.placeholder.com/300',
      url: 'https://github.com/example/netflix-clone'
    },
  ],
  'Node.js': [
    { 
      title: 'API REST para Red Social',
      description: 'Un backend robusto para una aplicación social con autenticación JWT.',
      imageUrl: 'https://via.placeholder.com/300',
      url: 'https://github.com/example/social-api'
    },
  ],
  // Agrega más proyectos para otras habilidades aquí
};