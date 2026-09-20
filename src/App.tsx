import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import CartDrawer from '@/components/CartDrawer';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import Account from '@/pages/Account';
import Wishlist from '@/pages/Wishlist';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Offers from '@/pages/Offers';
import Collections from '@/pages/Collections';



// Inside your Routes:

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col bg-nova-50">
            <Header onSearchOpen={() => setIsSearchOpen(true)} onCartOpen={() => setIsCartOpen(true)} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
               
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/account" element={<Account />} />
                <Route path="/account/:tab" element={<Account />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/collections" element={<Collections />} />
              </Routes>
            </main>
            <Footer />
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
