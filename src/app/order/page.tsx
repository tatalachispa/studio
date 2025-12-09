'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";

export default function OrderPage() {
  const { state, dispatch, totalPrice, totalItems } = useCart();

  useEffect(() => {
    return () => {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [dispatch]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-4">
                <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
          <CardTitle className="text-3xl font-headline">¡Pedido Realizado!</CardTitle>
          <CardDescription>Gracias por tu pedido. Lo estamos preparando.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="my-6">
                <h3 className="font-semibold mb-4">Resumen del pedido</h3>
                <div className="space-y-4">
                    {state.items.map(item => {
                        const image = PlaceHolderImages.find(img => img.id === item.imageId);
                        return (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                {image && <Image src={image.imageUrl} alt={item.name} width={48} height={48} className="rounded-md object-cover" data-ai-hint={image.imageHint}/>}
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                                </div>
                                </div>
                                <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Separator className="my-6" />
            <div className="space-y-2">
                <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>{formatCurrency(totalPrice)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-muted-foreground">IVA (estimado)</p>
                    <p>{formatCurrency(totalPrice * 0.1)}</p>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>{formatCurrency(totalPrice * 1.1)}</p>
                </div>
            </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/">Volver al Menú</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
