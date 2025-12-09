import type { Category, SerializableCategory, Product } from './types';
import { Salad, Utensils, CakeSlice, CupSoda } from 'lucide-react';

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

const PRODUCTS: Product[] = [
  // Appetizers
  {
    id: 'prod_001',
    name: 'Bruschetta Clásica',
    description: 'Pan tostado con tomates frescos, ajo, albahaca y un toque de aceite de oliva.',
    price: 8.50,
    imageId: 'bruschetta',
    category: 'appetizers',
  },
  {
    id: 'prod_002',
    name: 'Calamares Fritos',
    description: 'Tiernos aros de calamar rebozados y fritos a la perfección, servidos con salsa alioli.',
    price: 12.00,
    imageId: 'calamari',
    category: 'appetizers',
  },
  {
    id: 'prod_003',
    name: 'Ensalada Caprese',
    description: 'Rodajas de tomate y mozzarella fresca, aderezadas con albahaca y vinagre balsámico.',
    price: 9.75,
    imageId: 'caprese-salad',
    category: 'appetizers',
  },

  // Main Courses
  {
    id: 'prod_004',
    name: 'Lasaña a la Boloñesa',
    description: 'Capas de pasta fresca, rica salsa boloñesa, bechamel y queso parmesano gratinado.',
    price: 16.50,
    imageId: 'lasagna',
    category: 'main-courses',
  },
  {
    id: 'prod_005',
    name: 'Salmón a la Parrilla',
    description: 'Filete de salmón fresco a la parrilla con espárragos y un toque de limón.',
    price: 22.00,
    imageId: 'salmon-dish',
    category: 'main-courses',
  },
  {
    id: 'prod_006',
    name: 'Entrecot de Ternera',
    description: 'Jugoso entrecot de ternera a la parrilla, acompañado de patatas rústicas y hierbas.',
    price: 25.00,
    imageId: 'ribeye-steak',
    category: 'main-courses',
  },
  {
    id: 'prod_007',
    name: 'Risotto de Champiñones',
    description: 'Cremoso risotto arborio con una mezcla de champiñones silvestres y aceite de trufa.',
    price: 18.00,
    imageId: 'risotto',
    category: 'main-courses',
  },

  // Desserts
  {
    id: 'prod_008',
    name: 'Tiramisú Casero',
    description: 'Clásico postre italiano con bizcochos de soletilla, café, mascarpone y cacao.',
    price: 7.50,
    imageId: 'tiramisu',
    category: 'desserts',
  },
  {
    id: 'prod_009',
    name: 'Panna Cotta',
    description: 'Postre de nata cocida suave y sedosa, servido con una salsa de frutos rojos.',
    price: 7.00,
    imageId: 'panna-cotta',
    category: 'desserts',
  },
  {
    id: 'prod_010',
    name: 'Coulant de Chocolate',
    description: 'Pastel de chocolate caliente con un corazón líquido, acompañado de helado de vainilla.',
    price: 8.00,
    imageId: 'chocolate-lava-cake',
    category: 'desserts',
  },

  // Beverages
  {
    id: 'prod_011',
    name: 'Vino Tinto de la Casa',
    description: 'Copa de vino tinto seleccionado por nuestro sommelier.',
    price: 5.50,
    imageId: 'red-wine',
    category: 'beverages',
  },
  {
    id: 'prod_012',
    name: 'Agua Mineral',
    description: 'Botella de agua mineral sin gas o con gas.',
    price: 3.00,
    imageId: 'mineral-water',
    category: 'beverages',
  },
  {
    id: 'prod_013',
    name: 'Café Espresso',
    description: 'Café intenso y aromático para terminar su comida.',
    price: 2.50,
    imageId: 'espresso',
    category: 'beverages',
  },
];

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getSerializableCategories(): SerializableCategory[] {
    return SERIALIZABLE_CATEGORIES;
}

export function getProducts(category?: string): Product[] {
  if (category) {
    return PRODUCTS.filter((p) => p.category === category);
  }
  return PRODUCTS;
}
