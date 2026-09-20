import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { formatPrice } from '@/utils/helpers';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-[2rem] border border-nova-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-nova-100">
        <img
         src={product.images?.[0]}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 rounded-full bg-nova-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-nova-900 line-clamp-2">{product.name}</h3>
        <p className="mt-2 text-sm text-nova-500 line-clamp-2">{product.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-base font-semibold text-nova-900">{formatPrice(product.price)}</p>
            {product.originalPrice && product.discount && (
              <p className="text-xs text-nova-400 line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
          <span className="rounded-full bg-nova-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-nova-700">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
