/**
 * Utilidades para manejo de imágenes locales y remotas
 */

export type ImageSource = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  isLocal?: boolean;
};

/**
 * Obtiene la URL completa de una imagen, ya sea local o remota
 */
export function getImageUrl(imagePath: string): string {
  // Si ya es una URL completa (http/https), la devolvemos tal como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Si es una ruta local, la convertimos a ruta estática de Next.js
  if (imagePath.startsWith('/img/') || imagePath.startsWith('img/')) {
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return cleanPath;
  }
  
  // Si no tiene prefijo, asumimos que está en la carpeta de imágenes
  return `/img/${imagePath}`;
}

/**
 * Obtiene la ruta para imágenes por defecto
 */
export function getDefaultImagePath(filename: string): string {
  return `/img/default/${filename}`;
}

/**
 * Obtiene la ruta para imágenes subidas por admin
 */
export function getUploadImagePath(filename: string): string {
  return `/img/uploads/${filename}`;
}

/**
 * Verifica si una imagen es local o remota
 */
export function isLocalImage(imageUrl: string): boolean {
  return !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://');
}