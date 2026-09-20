// Collections.tsx
import { Link } from 'react-router-dom';
import { collections } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export default function Collections() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="section-padding py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-nova-900">Curated Collections</h1>
          <p className="text-nova-500 mt-2">Thoughtfully grouped for every lifestyle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {collections.map((collection) => (
            <Link 
              key={collection.id} 
              to={`/shop?collection=${collection.id}`}
              className="group relative aspect-[16/10] overflow-hidden rounded-lg block"
            >
              <img 
                src={collection.image} 
                alt={collection.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <h2 className="text-2xl md:text-3xl font-bold">{collection.name}</h2>
                <p className="text-white/80 mt-2 max-w-sm">{collection.description}</p>
                <span className="inline-flex items-center gap-2 mt-4 text-sm font-medium group-hover:gap-3 transition-all">
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}    //index.ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  collection: string[];
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  specifications: { label: string; value: string }[];
  whatsIncluded: string[];
  stock: number;
  badge: 'new' | 'bestseller' | 'limited' | 'trending' | 'sale' | null;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color: string | null;
  size: string | null;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  estimatedDelivery: string;
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}