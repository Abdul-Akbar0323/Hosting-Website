import { Link } from 'react-router-dom'

type HeaderProps = {
  onSearchOpen: () => void
  onCartOpen: () => void
}

export default function Header({ onSearchOpen, onCartOpen }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-nova-900">
          Novae
        </Link>
        <nav className="hidden md:flex gap-6 text-sm text-nova-700">
          <Link to="/shop" className="hover:text-nova-900">Shop</Link>
          <Link to="/collections" className="hover:text-nova-900">Collections</Link>
          <Link to="/offers" className="hover:text-nova-900">Offers</Link>
          <Link to="/about" className="hover:text-nova-900">About</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSearchOpen}
            className="text-sm font-medium text-nova-700 hover:text-nova-900"
          >
            Search
          </button>
          <button
            type="button"
            onClick={onCartOpen}
            className="text-sm font-medium text-nova-700 hover:text-nova-900"
          >
            Cart
          </button>
        </div>
      </div>
    </header>
  )
}
