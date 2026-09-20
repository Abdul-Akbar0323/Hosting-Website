import { Link } from 'react-router-dom'
import type { Product } from '@/types'

type ProductGridProps = {
  products: Product[]
  columns?: 2 | 3 | 4
}

const columnClassMap: Record<ProductGridProps['columns'], string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
}

export default function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  return (
    <div className={`grid gap-6 ${columnClassMap[columns]}`}>
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.slug}`}
          className="group block overflow-hidden rounded-3xl border border-nova-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="relative h-72 bg-nova-100">
            <img
              src={product.images?.[0] ?? ''}
              alt={product.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-full bg-nova-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                {product.badge}
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-nova-900">{product.name}</h3>
            <p className="mt-2 text-sm text-nova-500 line-clamp-2">{product.shortDescription ?? product.description}</p>
            <div className="mt-4 flex items-center justify-between gap-3 text-sm text-nova-900">
              <span className="font-semibold">${product.price.toFixed(2)}</span>
              {product.originalPrice && product.discount ? (
                <span className="text-nova-500 line-through">${product.originalPrice.toFixed(2)}</span>
              ) : null}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
