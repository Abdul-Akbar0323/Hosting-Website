import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/helpers';
import Rating from '@/components/ui/Rating';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4">
        <Heart className="w-20 h-20 text-nova-300 mb-6" />
        <h1 className="text-2xl font-bold text-nova-900">Your wishlist is empty</h1>
        <p className="text-nova-500 mt-2 mb-8">Save items you love for later.</p>
        <Link to="/shop" className="btn-primary">Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="section-padding py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-nova-900 mb-2">My Wishlist</h1>
        <p className="text-nova-500 mb-8">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(({ product }) => (
            <div key={product.id} className="group relative bg-white border border-nova-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <Link to={`/product/${product.slug}`} className="block aspect-[3/4] overflow-hidden bg-nova-100">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>

              <button 
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4 text-nova-600" />
              </button>

              <div className="p-4">
                <Link to={`/product/${product.slug}`}>
                  <h3 className="font-medium text-nova-900 line-clamp-1 hover:text-nova-600">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold text-nova-900">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-nova-400 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />

                <button
                  onClick={() => addToCart(product, 1, product.colors[0]?.name || null, product.sizes[0] || null)}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 border border-nova-900 text-nova-900 text-sm font-medium hover:bg-nova-900 hover:text-white transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
