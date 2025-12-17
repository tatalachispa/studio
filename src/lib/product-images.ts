/**
 * Mapeo de imágenes para productos específicos
 */

export const PRODUCT_IMAGES = {
  empanadas: '/img/uploads/empanadas.jfif',
  bolognesa: '/img/uploads/bolognesa.jfif',
  chori: '/img/uploads/chori.jfif',
  choripan: '/img/uploads/chori.jfif',
  pasta: '/img/uploads/bolognesa.jfif',
};

/**
 * Obtiene la imagen de un producto basado en su nombre o ID
 */
export function getProductImage(productName: string): string {
  const name = productName.toLowerCase();
  
  // Buscar coincidencias exactas
  if (PRODUCT_IMAGES[name as keyof typeof PRODUCT_IMAGES]) {
    return PRODUCT_IMAGES[name as keyof typeof PRODUCT_IMAGES];
  }
  
  // Buscar coincidencias parciales
  for (const [key, imagePath] of Object.entries(PRODUCT_IMAGES)) {
    if (name.includes(key) || key.includes(name)) {
      return imagePath;
    }
  }
  
  // Fallback a imagen por defecto
  return '/img/default/placeholder-food.svg';
}