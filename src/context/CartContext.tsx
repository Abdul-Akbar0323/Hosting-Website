import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, Product } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string | null, size?: string | null) => void;
  removeFromCart: (productId: string, color?: string | null, size?: string | null) => void;
  updateQuantity: (productId: string, quantity: number, color?: string | null, size?: string | null) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('novae-cart', []);
  const { addToast } = useToast();

  const addToCart = useCallback((product: Product, quantity = 1, color: string | null = null, size: string | null = null) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.color === color && i.size === size
      );
      if (existing) {
        addToast(`Updated quantity in cart`, 'success');
        return prev.map((i) =>
          i.product.id === product.id && i.color === color && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      addToast(`${product.name} added to cart`, 'success');
      return [...prev, { product, quantity, color, size }];
    });
  }, [setItems, addToast]);

  const removeFromCart = useCallback((productId: string, color?: string | null, size?: string | null) => {
    setItems((prev) => prev.filter(
      (i) => !(i.product.id === productId && i.color === color && i.size === size)
    ));
    addToast('Removed from cart', 'info');
  }, [setItems, addToast]);

  const updateQuantity = useCallback((productId: string, quantity: number, color?: string | null, size?: string | null) => {
    if (quantity < 1) {
      removeFromCart(productId, color, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.color === color && i.size === size
          ? { ...i, quantity }
          : i
      )
    );
  }, [setItems, removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
