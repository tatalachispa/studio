"use client";

import { useCart } from "@/contexts/cart-context";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Users } from 'lucide-react';

export function DinerSelector() {
  const { state, dispatch } = useCart();
  const maxDiners = 10;

  const handleDinerChange = (value: string) => {
    dispatch({ type: 'SET_DINERS', payload: parseInt(value, 10) });
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6 shadow-sm mb-12">
      <div className='flex items-center gap-2 text-accent'>
        <Users className="h-6 w-6" />
        <Label htmlFor="diners-select" className="text-lg font-semibold text-accent font-headline">¿Cuántos sois en la mesa?</Label>
      </div>
      <Select
        value={state.diners.toString()}
        onValueChange={handleDinerChange}
      >
        <SelectTrigger id="diners-select" className="w-[180px] text-base h-12">
          <SelectValue placeholder="Número de comensales" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: maxDiners }, (_, i) => i + 1).map(num => (
            <SelectItem key={num} value={num.toString()} className="text-base">
              {num} {num === 1 ? 'comensal' : 'comensales'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        Puedes añadir hasta 4 artículos por comensal a tu pedido.
      </p>
    </div>
  );
}
