export interface Project {
  title: string;
  description: string;
  imageUrl: string;
}

export const projectsData: { [key: string]: Project[] } = {
  React: [
    { 
      title: 'Proyecto de E-commerce con React',
      description: 'Una tienda online completa construida con React, Redux y Firebase.',
      imageUrl: 'https://via.placeholder.com/300'
    },
    { 
      title: 'Clon de Netflix con React',
      description: 'Una interfaz de usuario inspirada en Netflix, utilizando la API de TMDB.',
      imageUrl: 'https://via.placeholder.com/300'
    },
  ],
  'Node.js': [
    { 
      title: 'API REST para Red Social',
      description: 'Un backend robusto para una aplicación social con autenticación JWT.',
      imageUrl: 'https://via.placeholder.com/300'
    },
  ],
  // Agrega más proyectos para otras habilidades aquí
};