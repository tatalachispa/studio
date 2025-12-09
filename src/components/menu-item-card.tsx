"use client";

import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCart } from '@/contexts/cart-context';
import { PlusCircle } from 'lucide-react';

interface MenuItemCardProps {
  product: Product;
}

export function MenuItemCard({ product }: MenuItemCardProps) {
  const { addItem } = useCart();
  const image = PlaceHolderImages.find(img => img.id === product.imageId);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        {image && (
          <div className="aspect-[4/3] relative">
            <Image
              src={image.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <CardTitle className="font-headline text-xl mb-2">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <span className="text-lg font-semibold text-foreground">{formatCurrency(product.price)}</span>
        <Button onClick={() => addItem(product)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </CardFooter>
    </Card>
  );
}
