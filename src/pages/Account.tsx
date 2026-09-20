import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Package, Heart, MapPin, CreditCard, Bell, Settings, LogOut, ChevronRight } from 'lucide-react';
import { orders } from '@/data/products';
import { formatPrice } from '@/utils/helpers';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const statusColors = {
  processing: 'bg-amber-100 text-amber-700',
  shipped: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function Account() {
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();

  // Check if we're on a specific tab via URL
  const pathTab = location.pathname.split('/').pop();
  const currentTab = pathTab && pathTab !== 'account' ? pathTab : activeTab;

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-nova-50">
      <div className="section-padding py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-nova-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-nova-100">
                <div className="w-16 h-16 bg-nova-900 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3">
                  JD
                </div>
                <h2 className="font-semibold text-nova-900">John Doe</h2>
                <p className="text-sm text-nova-500">john@example.com</p>
              </div>
              <nav className="p-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      currentTab === item.id ? 'bg-nova-900 text-white' : 'text-nova-700 hover:bg-nova-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {currentTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <Package className="w-8 h-8 text-nova-400 mb-3" />
                    <p className="text-2xl font-bold text-nova-900">{orders.length}</p>
                    <p className="text-sm text-nova-500">Total Orders</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <Heart className="w-8 h-8 text-nova-400 mb-3" />
                    <p className="text-2xl font-bold text-nova-900">12</p>
                    <p className="text-sm text-nova-500">Wishlist Items</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <CreditCard className="w-8 h-8 text-nova-400 mb-3" />
                    <p className="text-2xl font-bold text-nova-900">2</p>
                    <p className="text-sm text-nova-500">Saved Cards</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold text-nova-900 mb-4">Recent Orders</h2>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-nova-100 rounded-lg hover:border-nova-300 transition-colors">
                        <div>
                          <p className="font-medium text-nova-900">{order.orderNumber}</p>
                          <p className="text-sm text-nova-500">{order.date} · {order.items.length} items</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${statusColors[order.status]}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <p className="text-sm font-medium text-nova-900 mt-1">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab('orders')} className="mt-4 text-sm font-medium text-nova-700 hover:text-nova-900 flex items-center gap-1">
                    View All Orders <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {currentTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-nova-100">
                  <h2 className="text-lg font-semibold text-nova-900">Order History</h2>
                </div>
                <div className="divide-y divide-nova-100">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <p className="font-semibold text-nova-900">{order.orderNumber}</p>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${statusColors[order.status]}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-nova-500 mt-1">Placed on {order.date}</p>
                        </div>
                        <p className="text-lg font-semibold text-nova-900">{formatPrice(order.total)}</p>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex-shrink-0 w-16 h-20 bg-nova-100 rounded overflow-hidden">
                            <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-4 text-sm">
                        <p className="text-nova-500">Estimated delivery: <span className="text-nova-900 font-medium">{order.estimatedDelivery}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'wishlist' && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-nova-900 mb-4">Wishlist</h2>
                <Link to="/wishlist" className="btn-primary inline-flex">View Full Wishlist</Link>
              </div>
            )}

            {currentTab === 'addresses' && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-nova-900 mb-4">Saved Addresses</h2>
                <div className="border border-nova-200 p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-nova-900">John Doe</p>
                      <p className="text-sm text-nova-600 mt-1">123 Main Street, Apt 4B</p>
                      <p className="text-sm text-nova-600">New York, NY 10001</p>
                      <p className="text-sm text-nova-600">United States</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-nova-100 text-xs font-medium text-nova-700 rounded">Default</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentTab === 'settings' && (
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                <h2 className="text-lg font-semibold text-nova-900">Account Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-nova-700 mb-1">Full Name</label>
                    <input type="text" defaultValue="John Doe" className="w-full px-4 py-2 border border-nova-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nova-700 mb-1">Email</label>
                    <input type="email" defaultValue="john@example.com" className="w-full px-4 py-2 border border-nova-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nova-700 mb-1">Phone</label>
                    <input type="tel" defaultValue="+1 555 123 4567" className="w-full px-4 py-2 border border-nova-300 rounded-lg" />
                  </div>
                </div>
                <button className="btn-primary">Save Changes</button>
              </div>
            )}

            {(currentTab === 'payment' || currentTab === 'notifications') && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-nova-900 mb-4">
                  {currentTab === 'payment' ? 'Payment Methods' : 'Notifications'}
                </h2>
                <p className="text-nova-500">Coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
