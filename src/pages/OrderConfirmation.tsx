import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, Package, Truck, Home, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/utils/helpers';

export default function OrderConfirmation() {
  const location = useLocation();
  const orderData = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-nova-900">No Order Found</h1>
        <Link to="/shop" className="btn-primary mt-4">Continue Shopping</Link>
      </div>
    );
  }

  const { orderNumber, total, items, shippingAddress, paymentMethod } = orderData;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-nova-50">
      <div className="section-padding py-12 max-w-3xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-nova-900">Thank you for your order</h1>
          <p className="text-nova-500 mt-2">Your order has been confirmed and will be shipped soon.</p>

          <div className="mt-8 p-6 bg-nova-50 rounded-lg text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-nova-500 mb-1">Order Number</p>
                <p className="font-semibold text-nova-900">{orderNumber}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-nova-500 mb-1">Estimated Delivery</p>
                <p className="font-semibold text-nova-900">{estimatedDelivery.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-nova-500 mb-1">Payment Method</p>
                <p className="font-semibold text-nova-900">{paymentMethod}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-nova-500 mb-1">Total</p>
                <p className="font-semibold text-nova-900">{formatPrice(total)}</p>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="mt-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-nova-200 -z-10" />
              {[
                { icon: Check, label: 'Confirmed', active: true },
                { icon: Package, label: 'Processing', active: true },
                { icon: Truck, label: 'Shipped', active: false },
                { icon: Home, label: 'Delivered', active: false },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center bg-white px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.active ? 'bg-nova-900 text-white' : 'bg-nova-200 text-nova-500'}`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs mt-2 font-medium ${step.active ? 'text-nova-900' : 'text-nova-400'}`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/account/orders" className="btn-primary">
              Track Order
            </Link>
            <Link to="/shop" className="btn-secondary">
              <ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
