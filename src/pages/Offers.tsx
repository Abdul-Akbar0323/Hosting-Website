import { Link } from 'react-router-dom';
import { getSaleProducts } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import { Clock } from 'lucide-react';

export default function Offers() {
  const saleProducts = getSaleProducts();

  // Countdown timer state simulation
  const [timeLeft] = [{
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 42,
  }];

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Promo Banner */}
      <div className="bg-nova-900 text-white py-16 lg:py-24">
        <div className="section-padding text-center">
          <p className="text-sm uppercase tracking-widest text-white/70 mb-4">Limited Time</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Sale</h1>
          <p className="text-lg text-white/80 mb-8">Up to 25% off on selected items</p>

          <div className="flex items-center justify-center gap-4">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map((unit) => (
              <div key={unit.label} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold">{String(unit.value).padStart(2, '0')}</span>
                </div>
                <p className="text-xs text-white/60 mt-2">{unit.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sale Products */}
      <div className="section-padding py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-nova-900">Sale Products</h2>
          <p className="text-sm text-nova-500">{saleProducts.length} items on sale</p>
        </div>
        <ProductGrid products={saleProducts} />
      </div>
    </div>
  );
}
