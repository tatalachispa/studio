
'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSerializableCategories } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Product } from '@/lib/types';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

function FirebaseCredentialsCheck() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey || apiKey.includes("placeholder")) {
    return (
      <Alert variant="destructive" className="mb-8">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Configuración Incompleta</AlertTitle>
        <AlertDescription>
          No se han encontrado las credenciales de Firebase. Por favor, asegúrate de que tu archivo `.env.local` esté correctamente configurado y que hayas reiniciado el servidor.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}


export default function AdminPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageId: '',
    category: '',
  });

  const categories = getSerializableCategories();

  const fetchProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(productsList);
    } catch (error: any) {
        if (error.code === 'permission-denied') {
             toast({
                variant: "destructive",
                title: "Error de Permisos",
                description: "No tienes permiso para leer los productos. Revisa las reglas de seguridad de Firestore.",
            });
        }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    setNewProduct(prev => ({ ...prev, category: value }));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.imageId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }

    try {
      await addDoc(collection(db, 'products'), {
        ...newProduct,
        price: parseFloat(newProduct.price),
      });
      toast({
        title: "¡Producto Añadido!",
        description: "El nuevo producto ha sido añadido a la base de datos.",
      });
      setNewProduct({
        name: '',
        description: '',
        price: '',
        imageId: '',
        category: '',
      });
      fetchProducts(); // Refresh the list
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al añadir producto",
        description: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
            <FirebaseCredentialsCheck />
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <Card>
                        <CardHeader>
                        <CardTitle>Añadir Nuevo Producto</CardTitle>
                        <CardDescription>Rellena el formulario para añadir un nuevo plato al menú.</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre del Producto</Label>
                                <Input id="name" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Ej: Lasaña a la Boloñesa" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea id="description" name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Describe el plato..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Precio</Label>
                                    <Input id="price" name="price" type="number" value={newProduct.price} onChange={handleInputChange} placeholder="Ej: 16.50" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="imageId">ID de Imagen</Label>
                                    <Input id="imageId" name="imageId" value={newProduct.imageId} onChange={handleInputChange} placeholder="Ej: lasagna" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Categoría</Label>
                                <Select onValueChange={handleCategoryChange} value={newProduct.category} required>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full">Añadir Producto</Button>
                        </form>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Productos en el Menú</CardTitle>
                            <CardDescription>Esta es la lista actual de productos en Firestore.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                            {products.length > 0 ? (
                                products.map(product => (
                                <div key={product.id} className="p-4 border rounded-lg">
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-sm text-muted-foreground">{product.description}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm font-bold">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}</span>
                                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{product.category}</span>
                                    </div>
                                </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-center">No hay productos en la base de datos.</p>
                            )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
        <Footer />
    </div>
  );
}
