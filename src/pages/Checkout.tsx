import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, CreditCard, Truck, Wallet, Banknote } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/helpers';
import { useToast } from '@/context/ToastContext';

const steps = ['Information', 'Shipping', 'Payment', 'Review'];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'United States',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const freeShippingThreshold = 100;
  const shippingCost = shippingMethod === 'express' ? 20 : subtotal >= freeShippingThreshold ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateStep = () => {
    if (currentStep === 0) {
      return formData.fullName && formData.email && formData.address && formData.city && formData.postalCode;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      addToast('Please fill in all required fields', 'error');
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: `NOV-${Date.now().toString().slice(-6)}`,
          total,
          items,
          shippingAddress: formData,
          paymentMethod: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery',
        }
      });
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-nova-900">Your cart is empty</h1>
        <p className="text-nova-500 mt-2 mb-8">Add some items before checking out.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-nova-50">
      <div className="section-padding py-8 lg:py-12">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((step, idx) => (
              <div key={step} className="flex items-center gap-2 md:gap-4">
                <div className={`flex items-center gap-2 ${idx <= currentStep ? 'text-nova-900' : 'text-nova-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    idx < currentStep ? 'bg-green-600 text-white' : idx === currentStep ? 'bg-nova-900 text-white' : 'bg-nova-200 text-nova-600'
                  }`}>
                    {idx < currentStep ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span className="hidden md:inline text-sm font-medium">{step}</span>
                </div>
                {idx < steps.length - 1 && <ChevronRight className="w-4 h-4 text-nova-400" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Information */}
            {currentStep === 0 && (
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-nova-900 mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-nova-700 mb-1">Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nova-700 mb-1">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nova-700 mb-1">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-nova-700 mb-1">Address *</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nova-700 mb-1">City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nova-700 mb-1">Province/State</label>
                    <input type="text" name="province" value={formData.province} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nova-700 mb-1">Postal Code *</label>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nova-700 mb-1">Country</label>
                    <select name="country" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none bg-white">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Shipping */}
            {currentStep === 1 && (
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-nova-900 mb-4">Shipping Method</h2>
                <label className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${shippingMethod === 'standard' ? 'border-nova-900 bg-nova-50' : 'border-nova-200'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" name="shipping" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="w-4 h-4 text-nova-900" />
                    <div>
                      <p className="font-medium text-nova-900">Standard Delivery</p>
                      <p className="text-sm text-nova-500">5-7 business days</p>
                    </div>
                  </div>
                  <span className="font-semibold text-nova-900">{subtotal >= freeShippingThreshold ? 'Free' : formatPrice(10)}</span>
                </label>
                <label className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${shippingMethod === 'express' ? 'border-nova-900 bg-nova-50' : 'border-nova-200'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" name="shipping" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="w-4 h-4 text-nova-900" />
                    <div>
                      <p className="font-medium text-nova-900">Express Delivery</p>
                      <p className="text-sm text-nova-500">2-3 business days</p>
                    </div>
                  </div>
                  <span className="font-semibold text-nova-900">{formatPrice(20)}</span>
                </label>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 2 && (
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-nova-900 mb-4">Payment Method</h2>
                <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-nova-900 bg-nova-50' : 'border-nova-200'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-nova-900" />
                  <CreditCard className="w-5 h-5 text-nova-600" />
                  <div>
                    <p className="font-medium text-nova-900">Credit / Debit Card</p>
                    <p className="text-sm text-nova-500">Visa, Mastercard, Amex</p>
                  </div>
                </label>
                <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-nova-900 bg-nova-50' : 'border-nova-200'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="w-4 h-4 text-nova-900" />
                  <Wallet className="w-5 h-5 text-nova-600" />
                  <div>
                    <p className="font-medium text-nova-900">Digital Wallet</p>
                    <p className="text-sm text-nova-500">PayPal, Apple Pay, Google Pay</p>
                  </div>
                </label>
                <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-nova-900 bg-nova-50' : 'border-nova-200'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-nova-900" />
                  <Banknote className="w-5 h-5 text-nova-600" />
                  <div>
                    <p className="font-medium text-nova-900">Cash on Delivery</p>
                    <p className="text-sm text-nova-500">Pay when you receive</p>
                  </div>
                </label>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 3 && (
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm space-y-6">
                <h2 className="text-lg font-semibold text-nova-900">Review Order</h2>

                <div className="border-b border-nova-100 pb-4">
                  <h3 className="font-medium text-nova-900 mb-2">Shipping Address</h3>
                  <p className="text-sm text-nova-600">{formData.fullName}</p>
                  <p className="text-sm text-nova-600">{formData.address}</p>
                  <p className="text-sm text-nova-600">{formData.city}, {formData.province} {formData.postalCode}</p>
                  <p className="text-sm text-nova-600">{formData.country}</p>
                </div>

                <div className="border-b border-nova-100 pb-4">
                  <h3 className="font-medium text-nova-900 mb-2">Shipping Method</h3>
                  <p className="text-sm text-nova-600">{shippingMethod === 'express' ? 'Express Delivery (2-3 days)' : 'Standard Delivery (5-7 days)'}</p>
                </div>

                <div>
                  <h3 className="font-medium text-nova-900 mb-2">Payment Method</h3>
                  <p className="text-sm text-nova-600">{paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod === 'paypal' ? 'Digital Wallet' : 'Cash on Delivery'}</p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {currentStep > 0 && (
                <button onClick={() => setCurrentStep(prev => prev - 1)} className="btn-secondary">
                  Back
                </button>
              )}
              <button onClick={handleNext} disabled={isProcessing} className="btn-primary flex-1">
                {isProcessing ? 'Processing...' : currentStep === steps.length - 1 ? 'Place Order' : 'Continue'}
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold text-nova-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex gap-3">
                    <img src={item.product.images[0]} alt="" className="w-12 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-nova-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-nova-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-nova-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-nova-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-nova-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-nova-600">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-semibold text-nova-900 pt-2 border-t border-nova-100">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
