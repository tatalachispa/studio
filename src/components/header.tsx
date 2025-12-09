"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RestoGoLogo } from '@/components/icons';
import { ShoppingCart, User } from 'lucide-react';
import { CartSheet } from './cart-sheet';
import { useCart } from '@/contexts/cart-context';
import { useState } from 'react';

export function Header() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <RestoGoLogo className="h-6 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
              Menú
            </Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Open Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
