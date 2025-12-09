import type { LucideIcon } from 'lucide-react';

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export type SerializableCategory = Omit<Category, 'icon'> & {
    iconName: keyof typeof import('lucide-react');
}

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
  category: string;
};

export type CartItem = Product & {
  quantity: number;
};
