"use client";

import { useState, createElement } from 'react';
import type { SerializableCategory, Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DinerSelector } from './diner-selector';
import { MenuItemCard } from './menu-item-card';
import * as LucideIcons from 'lucide-react';

interface MenuSectionProps {
  categories: SerializableCategory[];
  products: Product[];
}

export function MenuSection({ categories, products }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full">
      <DinerSelector />
      
      <div className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Nuestro Menú</h2>
        <div className="flex justify-center flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="rounded-full"
          >
            Todos
          </Button>
          {categories.map((category) => {
            const Icon = LucideIcons[category.iconName] as React.ElementType;
            return (
                <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
                >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {category.name}
                </Button>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <MenuItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
