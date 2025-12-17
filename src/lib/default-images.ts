/**
 * Imágenes por defecto de la aplicación
 */

export const DEFAULT_IMAGES = {
  // Logo y branding
  logo: '/img/default/logo.png',
  logoWhite: '/img/default/logo-white.png',
  favicon: '/img/default/favicon.ico',
  
  // Placeholders
  placeholderFood: '/img/uploads/default.jfif',
  placeholderUser: '/img/default/placeholder-user.png',
  placeholderRestaurant: '/img/default/placeholder-restaurant.jpg',
  
  // Iconos de categorías
  appetizers: '/img/default/categories/appetizers.jpg',
  mainCourse: '/img/default/categories/main-course.jpg',
  desserts: '/img/default/categories/desserts.jpg',
  beverages: '/img/default/categories/beverages.jpg',
  
  // Fondos
  heroBackground: '/img/default/backgrounds/hero-bg.jpg',
  loginBackground: '/img/default/backgrounds/login-bg.jpg',
  
  // Estados
  emptyCart: '/img/default/states/empty-cart.svg',
  noResults: '/img/default/states/no-results.svg',
  error404: '/img/default/states/404.svg',
};

export function getDefaultImage(key: keyof typeof DEFAULT_IMAGES): string {
  return DEFAULT_IMAGES[key];
}