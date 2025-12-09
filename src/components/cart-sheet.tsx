"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from './ui/separator';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Progress } from './ui/progress';

export function CartSheet({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { state, dispatch, totalItems, totalPrice, cartLimit, updateQuantity } = useCart();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Tu Pedido</SheetTitle>
           <SheetDescription>
            Revisa los artículos de tu pedido a continuación.
          </SheetDescription>
        </SheetHeader>
        
        <Separator />

        {totalItems > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto">
                <ScrollArea className="h-full">
                    <div className="flex flex-col gap-4 p-6 pr-6">
                    {state.items.map((item) => {
                        const image = PlaceHolderImages.find(img => img.id === item.imageId);
                        return (
                        <div key={item.id} className="flex items-start gap-4">
                            {image && (
                            <div className="relative h-20 w-20 rounded-md overflow-hidden">
                                <Image
                                src={image.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                                />
                            </div>
                            )}
                            <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                <Minus className="h-3 w-3" />
                                </Button>
                                <span>{item.quantity}</span>
                                <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                <Plus className="h-3 w-3" />
                                </Button>
                            </div>
                            </div>
                            <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                            >
                            <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        );
                    })}
                    </div>
                </ScrollArea>
            </div>

            <Separator />
            
            <SheetFooter className="p-6 sm:flex-col sm:items-stretch sm:gap-4">
              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Items</span>
                  <span>{totalItems} / {cartLimit}</span>
                </div>
                 <Progress value={(totalItems / cartLimit) * 100} className="h-2" />
              </div>
              
              <Button asChild size="lg" className="w-full" onClick={() => onOpenChange(false)}>
                <Link href="/order">Realizar Pedido</Link>
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <h3 className="font-semibold text-xl">Tu carrito está vacío</h3>
            <p className="text-muted-foreground">Añade algunos platos deliciosos para empezar.</p>
            <Button onClick={() => onOpenChange(false)}>Volver al Menú</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
