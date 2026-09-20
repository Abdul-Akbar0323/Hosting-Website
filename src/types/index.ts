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

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
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