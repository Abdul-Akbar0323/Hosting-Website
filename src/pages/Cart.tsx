import { Link } from 'react-router-dom';
import { Minus, Plus, X, Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/utils/helpers';
import { getFeaturedProducts } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const { addToWishlist } = useWishlist();
  const freeShippingThreshold = 100;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const recommended = getFeaturedProducts().slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-20 h-20 text-nova-300 mb-6" />
        <h1 className="text-2xl font-bold text-nova-900">Your cart is empty</h1>
        <p className="text-nova-500 mt-2 mb-8">Discover our curated collection and find something you love.</p>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="section-padding py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-nova-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {subtotal < freeShippingThreshold && (
              <div className="bg-nova-50 p-4 rounded-lg">
                <p className="text-sm text-nova-700">
                  You're <strong>{formatPrice(freeShippingThreshold - subtotal)}</strong> away from free shipping
                </p>
                <div className="mt-3 h-2 bg-nova-200 rounded-full overflow-hidden">
                  <div className="h-full bg-nova-900 transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {items.map((item) => (
              <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex gap-4 md:gap-6 pb-6 border-b border-nova-100">
                <Link to={`/product/${item.product.slug}`} className="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-nova-100">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link to={`/product/${item.product.slug}`} className="text-base font-medium text-nova-900 hover:text-nova-600 line-clamp-1">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-nova-500 mt-1 capitalize">{item.product.category}</p>
                      {(item.color || item.size) && (
                        <p className="text-sm text-nova-500 mt-0.5">
                          {item.color && item.color} {item.size && `/ ${item.size}`}
                        </p>
                      )}
                    </div>
                    <button onClick={() => removeFromCart(item.product.id, item.color, item.size)} className="text-nova-400 hover:text-nova-700 p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-nova-200 rounded">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.color, item.size)} className="p-2 hover:bg-nova-50">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.color, item.size)} className="p-2 hover:bg-nova-50">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-nova-900">{formatPrice(item.product.price * item.quantity)}</p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-nova-500">{formatPrice(item.product.price)} each</p>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => { addToWishlist(item.product); removeFromCart(item.product.id, item.color, item.size); }}
                    className="flex items-center gap-1.5 text-xs text-nova-500 hover:text-nova-900 mt-3 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5" /> Move to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-nova-50 p-6 rounded-lg sticky top-24">
              <h2 className="text-lg font-semibold text-nova-900 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-nova-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-nova-600">
                  <span>Shipping</span>
                  <span>{subtotal >= freeShippingThreshold ? 'Free' : formatPrice(10)}</span>
                </div>
                <div className="flex justify-between text-nova-600">
                  <span>Estimated Tax</span>
                  <span>{formatPrice(subtotal * 0.08)}</span>
                </div>
                <div className="border-t border-nova-200 pt-3 flex justify-between font-semibold text-nova-900">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + (subtotal >= freeShippingThreshold ? 0 : 10) + subtotal * 0.08)}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-primary w-full mt-6">
                Secure Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/shop" className="btn-ghost w-full mt-2 text-xs">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-nova-900 mb-6">Recommended for You</h2>
          <ProductGrid products={recommended} columns={4} />
        </div>
      </div>
    </div>
  );
}
