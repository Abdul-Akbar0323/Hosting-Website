import React, { createContext, useContext, useCallback } from 'react';
import { WishlistItem, Product } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from './ToastContext';

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<WishlistItem[]>('novae-wishlist', []);
  const { addToast } = useToast();

  const addToWishlist = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.find((i) => i.product.id === product.id)) {
        return prev;
      }
      addToast(`${product.name} added to wishlist`, 'success');
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, [setItems, addToast]);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
    addToast('Removed from wishlist', 'info');
  }, [setItems, addToast]);

  const isInWishlist = useCallback((productId: string) => {
    return items.some((i) => i.product.id === productId);
  }, [items]);

  const totalItems = items.length;

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, totalItems }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
