'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/image-utils';
import { DEFAULT_IMAGES } from '@/lib/default-images';
import { useState } from 'react';

interface AppImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onError?: () => void;
}

/**
 * Componente de imagen que maneja automáticamente rutas locales y remotas
 */
export function AppImage({ 
  src, 
  alt, 
  width, 
  height, 
  fill, 
  className, 
  priority, 
  sizes,
  placeholder,
  blurDataURL,
  onError,
  ...props 
}: AppImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(getImageUrl(src));

  const handleError = () => {
    if (!imageError) {
      setImageError(true);
      // Fallback a imagen por defecto
      setImageSrc('/img/uploads/default.jfif');
      onError?.();
    }
  };

  const imageProps = {
    src: imageSrc,
    alt,
    className,
    priority,
    sizes,
    placeholder,
    blurDataURL,
    onError: handleError,
    ...props
  };

  if (fill) {
    return <Image {...imageProps} fill />;
  }

  return (
    <Image 
      {...imageProps} 
      width={width || 400} 
      height={height || 300} 
    />
  );
}