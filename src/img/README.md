# Estructura de Imágenes

Esta carpeta contiene todas las imágenes de la aplicación organizadas de la siguiente manera:

## Estructura de Carpetas

```
src/img/
├── default/          # Imágenes por defecto de la aplicación
│   ├── logo.png      # Logo de la aplicación
│   ├── placeholder-food.jpg  # Imagen placeholder para comida
│   └── ...           # Otras imágenes por defecto
└── uploads/          # Imágenes subidas por administradores
    ├── product-1.jpg # Imágenes de productos
    ├── hero-bg.jpg   # Imágenes de fondo
    └── ...           # Otras imágenes subidas
```

## Cómo Usar las Imágenes

### 1. Usando el componente AppImage (recomendado)
```tsx
import { AppImage } from '@/components/app-image';

// Imagen local
<AppImage 
  src="/img/default/logo.png" 
  alt="Logo" 
  width={200} 
  height={100} 
/>

// Imagen remota
<AppImage 
  src="https://example.com/image.jpg" 
  alt="Imagen remota" 
  width={400} 
  height={300} 
/>
```

### 2. Usando las utilidades de imagen
```tsx
import { getDefaultImagePath, getUploadImagePath } from '@/lib/image-utils';

const logoPath = getDefaultImagePath('logo.png');
const productPath = getUploadImagePath('product-1.jpg');
```

### 3. Agregando nuevas imágenes por defecto
1. Coloca la imagen en `src/img/default/`
2. Actualiza `src/lib/placeholder-images.json` si es necesario
3. Usa la ruta `/img/default/nombre-archivo.ext`

### 4. Para imágenes subidas por admin
1. Las imágenes se guardan en `src/img/uploads/`
2. Usa la ruta `/img/uploads/nombre-archivo.ext`
3. El sistema de upload debe manejar la subida a esta carpeta

## Formatos Soportados
- JPG/JPEG
- PNG
- WebP
- SVG
- GIF

## Notas Importantes
- Las imágenes en `src/img/` son servidas como archivos estáticos por Next.js
- Para producción, considera usar un CDN o Firebase Storage
- El componente AppImage incluye fallback automático en caso de error
- Mantén los nombres de archivo descriptivos y sin espacios