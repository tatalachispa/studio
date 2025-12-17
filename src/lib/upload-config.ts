/**
 * Configuración para el manejo de uploads de imágenes
 */

export const UPLOAD_CONFIG = {
  // Carpetas de destino
  UPLOAD_DIR: 'src/img/uploads',
  DEFAULT_DIR: 'src/img/default',
  
  // Tamaños máximos
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_WIDTH: 2048,
  MAX_HEIGHT: 2048,
  
  // Formatos permitidos
  ALLOWED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
  
  // Configuración de calidad
  JPEG_QUALITY: 85,
  WEBP_QUALITY: 85,
};

/**
 * Valida si un archivo es una imagen válida
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Verificar tamaño
  if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `El archivo es demasiado grande. Máximo ${UPLOAD_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB`
    };
  }
  
  // Verificar tipo MIME
  if (!UPLOAD_CONFIG.ALLOWED_FORMATS.includes(file.type)) {
    return {
      valid: false,
      error: `Formato no permitido. Use: ${UPLOAD_CONFIG.ALLOWED_EXTENSIONS.join(', ')}`
    };
  }
  
  return { valid: true };
}

/**
 * Genera un nombre único para el archivo
 */
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.substring(originalName.lastIndexOf('.'));
  const baseName = originalName.substring(0, originalName.lastIndexOf('.')).replace(/[^a-zA-Z0-9]/g, '-');
  
  return `${baseName}-${timestamp}-${random}${extension}`;
}