// src/pages/Shop.tsx
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  products,
  categories,
  collections,
  getProductsByCategory,
  getProductsByCollection,
  getNewArrivals,
  getBestsellers,
  getSaleProducts,
} from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const collection = searchParams.get('collection');
  const filter = searchParams.get('filter');

  const filteredProducts = useMemo(() => {
    if (category) return getProductsByCategory(category);
    if (collection) return getProductsByCollection(collection);
    if (filter === 'new') return getNewArrivals();
    if (filter === 'bestsellers') return getBestsellers();
    if (filter === 'sale') return getSaleProducts();
    return products;
  }, [category, collection, filter]);

  const title = useMemo(() => {
    if (category) {
      const cat = categories.find((c) => c.id === category);
      return cat ? cat.name : 'Products';
    }
    if (collection) {
      const col = collections.find((c) => c.id === collection);
      return col ? col.name : 'Collection';
    }
    if (filter === 'new') return 'New Arrivals';
    if (filter === 'bestsellers') return 'Best Sellers';
    if (filter === 'sale') return 'On Sale';
    return 'All Products';
  }, [category, collection, filter]);

  const subtitle = useMemo(() => {
    if (category) {
      const cat = categories.find((c) => c.id === category);
      return cat?.description || '';
    }
    if (collection) {
      const col = collections.find((c) => c.id === collection);
      return col?.description || '';
    }
    return `${filteredProducts.length} products`;
  }, [category, collection, filteredProducts.length]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="section-padding pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-nova-400 font-medium mb-3">
            {category ? 'Category' : collection ? 'Collection' : filter ? 'Filter' : 'Shop'}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-nova-950 tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm text-nova-500 max-w-md mx-auto">{subtitle}</p>
        </motion.div>
      </div>

      {/* Active filters */}
      {(category || collection || filter) && (
        <div className="section-padding pb-8">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-nova-400">Filters:</span>
            {category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-nova-100 text-nova-800 rounded-full">
                {categories.find((c) => c.id === category)?.name}
                <Link to="/shop" className="hover:text-nova-950 ml-1">×</Link>
              </span>
            )}
            {collection && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-nova-100 text-nova-800 rounded-full">
                {collections.find((c) => c.id === collection)?.name}
                <Link to="/shop" className="hover:text-nova-950 ml-1">×</Link>
              </span>
            )}
            {filter && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-nova-100 text-nova-800 rounded-full">
                {filter}
                <Link to="/shop" className="hover:text-nova-950 ml-1">×</Link>
              </span>
            )}
            <Link
              to="/shop"
              className="text-xs text-nova-400 hover:text-nova-700 underline underline-offset-4 ml-2"
            >
              Clear all
            </Link>
          </div>
        </div>
      )}

      {/* Product grid */}
      <div className="section-padding pb-24">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg text-nova-400 mb-4">No products found.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium text-nova-700 hover:text-nova-950"
            >
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}