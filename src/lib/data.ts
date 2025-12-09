import type { Category, SerializableCategory, Product } from './types';
import { Salad, Utensils, CakeSlice, CupSoda } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const CATEGORIES: Category[] = [
  { id: 'appetizers', name: 'Entradas', icon: Salad },
  { id: 'main-courses', name: 'Platos Principales', icon: Utensils },
  { id: 'desserts', name: 'Postres', icon: CakeSlice },
  { id: 'beverages', name: 'Bebidas', icon: CupSoda },
];

const SERIALIZABLE_CATEGORIES: SerializableCategory[] = [
    { id: 'appetizers', name: 'Entradas', iconName: 'Salad' },
    { id: 'main-courses', name: 'Platos Principales', iconName: 'Utensils' },
    { id: 'desserts', name: 'Postres', iconName: 'CakeSlice' },
    { id: 'beverages', name: 'Bebidas', iconName: 'CupSoda' },
];

// The products are now fetched from Firestore, so this static array can be removed
// or kept as a fallback/seed. For now, let's fetch from Firestore.
const PRODUCTS: Product[] = [];

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getSerializableCategories(): SerializableCategory[] {
    return SERIALIZABLE_CATEGORIES;
}

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });

    if (category) {
      return products.filter((p) => p.category === category);
    }
    return products;
  } catch (error) {
    console.error("Error fetching products from Firestore: ", error);
    // Return a default/empty list or handle the error as appropriate
    return [];
  }
}
