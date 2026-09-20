import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Heart, Minus, Plus, RotateCcw, Share2, Shield, Truck } from 'lucide-react';
import { getProductBySlug, getProductReviews, getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/utils/helpers';
import ProductGrid from '@/components/ProductGrid';
import Rating from '@/components/ui/Rating';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = useMemo(() => (slug ? getProductBySlug(slug) : undefined), [slug]);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<'details' | 'shipping' | 'specs' | null>('details');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!product) return;
    setSelectedImage(0);
    setQuantity(1);
    setSelectedColor(product.colors[0]?.name ?? null);
    setSelectedSize(product.sizes[0] ?? null);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 section-padding">
        <div className="max-w-3xl mx-auto text-center py-20">
          <p className="text-nova-600">Product not found.</p>
          <Link to="/shop" className="btn-primary mt-6 inline-block">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const related = getRelatedProducts(product.id);
  const reviews = getProductReviews(product.id);
  const selectedProductImage = product.images[selectedImage] ?? product.images[0] ?? '';

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const sections = [
    {
      id: 'details',
      title: 'Product Details',
      content: (
        <div className="space-y-4 text-sm text-nova-600">
          <p>{product.description}</p>
          <p>{product.shortDescription}</p>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: (
        <div className="space-y-3 text-sm text-nova-600">
          <p>Free standard shipping on orders over $100.</p>
          <p>30-day returns for unused items in original packaging.</p>
        </div>
      ),
    },
    {
      id: 'specs',
      title: 'Specifications',
      content: (
        <div className="space-y-3 text-sm text-nova-600">
          {product.specifications.map((spec) => (
            <div key={spec.label} className="flex justify-between gap-4">
              <span className="font-medium text-nova-900">{spec.label}</span>
              <span>{spec.value}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-24 section-padding">
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-nova-200 overflow-hidden bg-white shadow-sm">
            <img src={selectedProductImage} alt={product.name} className="w-full h-[520px] object-cover" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-3xl border ${selectedImage === index ? 'border-nova-900' : 'border-nova-200'} bg-nova-50`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="h-24 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl border border-nova-200 bg-white p-6 shadow-sm">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-nova-500">{product.category}</p>
                <h1 className="mt-2 text-3xl font-bold text-nova-900">{product.name}</h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
                <span className="text-sm text-nova-500">{reviews.length} reviews</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-3xl font-semibold text-nova-900">{formatPrice(product.price)}</span>
                {product.originalPrice && <span className="text-sm text-nova-500 line-through">{formatPrice(product.originalPrice)}</span>}
              </div>

              <p className="text-sm leading-relaxed text-nova-600">{product.shortDescription}</p>

              <div className="grid gap-4">
                {product.colors.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-nova-900 mb-2">
                      Color: <span className="text-nova-500">{selectedColor ?? product.colors[0].name}</span>
                    </p>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setSelectedColor(color.name)}
                          className={`h-10 w-10 rounded-full border-2 transition-transform ${selectedColor === color.name ? 'border-nova-900 scale-110' : 'border-nova-200'}`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-nova-900 mb-2">
                      Size: <span className="text-nova-500">{selectedSize ?? product.sizes[0]}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-2xl px-4 py-2 text-sm border transition ${selectedSize === size ? 'border-nova-900 bg-nova-900 text-white' : 'border-nova-300 text-nova-700 hover:border-nova-500'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-nova-900 mb-2">Quantity</p>
                  <div className="inline-flex items-center rounded-full border border-nova-300 overflow-hidden">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-nova-700 hover:bg-nova-50">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 text-center text-sm font-semibold">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-nova-700 hover:bg-nova-50">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-nova-600">
                  <span className={`h-2.5 w-2.5 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                  <span>{product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={handleAddToCart} disabled={product.stock === 0} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  Add to Cart
                </button>
                <button type="button" onClick={handleAddToCart} disabled={product.stock === 0} className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed">
                  Buy Now
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
                <button type="button" onClick={toggleWishlist} className="flex items-center gap-2 text-nova-600 hover:text-nova-900">
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  {inWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </button>
                <button type="button" className="flex items-center gap-2 text-sm text-nova-600 hover:text-nova-900">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-nova-100">
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto text-nova-500 mb-1" />
                  <p className="text-xs text-nova-600">Free Shipping<br />over $100</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 mx-auto text-nova-500 mb-1" />
                  <p className="text-xs text-nova-600">30-Day<br />Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto text-nova-500 mb-1" />
                  <p className="text-xs text-nova-600">Secure<br />Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-20 max-w-7xl mx-auto">
        <div className="border-t border-nova-200 pt-10">
          {sections.map((section) => (
            <div key={section.id} className="border-b border-nova-200 py-5">
              <button type="button" onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)} className="w-full flex items-center justify-between text-left text-nova-900">
                <span className="font-semibold">{section.title}</span>
                {expandedSection === section.id ? <ChevronUp className="w-5 h-5 text-nova-500" /> : <ChevronDown className="w-5 h-5 text-nova-500" />}
              </button>
              {expandedSection === section.id && <div className="pt-4 text-nova-600">{section.content}</div>}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-nova-900 mb-8">Customer Reviews</h2>
          {reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {reviews.map((review) => (
                <div key={review.id} className="bg-nova-50 p-6 rounded-3xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-nova-900">{review.userName}</p>
                      <p className="text-xs text-nova-500">{review.date}</p>
                    </div>
                    {review.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Verified Purchase</span>}
                  </div>
                  <Rating rating={review.rating} reviewCount={review.reviewCount} size="sm" />
                  <h4 className="font-semibold text-nova-900 mt-3">{review.title}</h4>
                  <p className="text-sm leading-relaxed text-nova-600 mt-2">{review.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-nova-500">No reviews yet. Be the first to review this product.</p>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-nova-900 mb-8">You May Also Like</h2>
            <ProductGrid products={related} columns={4} />
          </div>
        )}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-4" onClick={() => setIsFullscreen(false)}>
          <button type="button" className="absolute top-4 right-4 text-white text-3xl">×</button>
          <img src={selectedProductImage} alt={product.name} className="max-h-[90vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
