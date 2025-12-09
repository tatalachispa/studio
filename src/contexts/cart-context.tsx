"use client";

import React, { createContext, useReducer, useContext, type Dispatch } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

const MAX_ITEMS_PER_DINER = 4;

type CartState = {
  items: CartItem[];
  diners: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string } // payload is productId
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'SET_DINERS'; payload: number }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  diners: 1,
};

const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<CartAction>;
  totalItems: number;
  totalPrice: number;
  cartLimit: number;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      if (totalItems >= state.diners * MAX_ITEMS_PER_DINER) {
        // This is where we'd show a toast, handled in the component calling dispatch
        return state;
      }
      
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.productId),
        };
      }
      
      // Check against total limit before updating
      const otherItemsQuantity = state.items
        .filter(item => item.id !== action.payload.productId)
        .reduce((sum, item) => sum + item.quantity, 0);
      
      const newTotalQuantity = otherItemsQuantity + action.payload.quantity;
      
      if (newTotalQuantity > state.diners * MAX_ITEMS_PER_DINER) {
        // Let the component handle the toast
        return state;
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    }
    case 'SET_DINERS': {
      return {
        ...state,
        diners: action.payload,
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartLimit = state.diners * MAX_ITEMS_PER_DINER;

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, totalPrice, cartLimit }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  const { toast } = useToast();

  const addItem = (product: Product) => {
    if (context.totalItems >= context.cartLimit) {
      toast({
        variant: "destructive",
        title: "Límite del carrito alcanzado",
        description: `No puedes añadir más de ${context.cartLimit} artículos para ${context.state.diners} comensal(es).`,
      });
    } else {
      context.dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const otherItemsQuantity = context.state.items
      .filter(item => item.id !== productId)
      .reduce((sum, item) => sum + item.quantity, 0);
    if (otherItemsQuantity + quantity > context.cartLimit && quantity > 0) {
       toast({
        variant: "destructive",
        title: "Límite del carrito alcanzado",
        description: `No puedes tener más de ${context.cartLimit} artículos para ${context.state.diners} comensal(es).`,
      });
    } else {
        context.dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    }
  };


  return { ...context, addItem, updateQuantity };
};
