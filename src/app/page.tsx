import type { Product, SerializableCategory } from '@/lib/types';
import { getSerializableCategories, getProducts } from '@/lib/data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AppImage } from '@/components/app-image';
import { DinerSelector } from '@/components/diner-selector';
import { MenuSection } from '@/components/menu-section';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-dining');

  return (
    <section className="relative h-[60vh] w-full text-white">
      {heroImage && (
        <AppImage
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          Savor the Moment, <br/>Delivered.
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
          Experience the exquisite flavors of our kitchen from the comfort of your home.
        </p>
      </div>
    </section>
  );
}

export default async function Home() {
  const categories: SerializableCategory[] = getSerializableCategories();
  
  const productsCollection = collection(db, 'products');
  const productSnapshot = await getDocs(productsCollection);
  const products: Product[] = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div className="container mx-auto px-4 py-8 md:py-16">
          <MenuSection categories={categories} products={products} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
