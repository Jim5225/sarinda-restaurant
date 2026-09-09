import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  TrendingUp,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Plus,
  ArrowLeft,
  DollarSign,
  Search,
  Eye,
  Trash2,
  Power
} from 'lucide-react';
import { MenuItem, Order, Reservation } from '../types';

export const AdminPortal: React.FC = () => {
  const {
    setActiveTab,
    orders,
    updateOrderStatus,
    reservations,
    updateReservationStatus,
    menu,
    toggleItemAvailability,
    addMenuItem,
    deleteMenuItem,
    offers
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'orders' | 'reservations' | 'menu' | 'offers'>('overview');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // New Item Form State
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemBanglaName, setNewItemBanglaName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<MenuItem['category']>('Biryani');
  const [newItemPrice, setNewItemPrice] = useState(350);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImg, setNewItemImg] = useState('https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80');

  // KPI Calculations
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const pendingResCount = reservations.filter(r => r.status === 'pending').length;

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: MenuItem = {
      id: `dish-${Date.now()}`,
      name: newItemName.trim(),
      banglaName: newItemBanglaName.trim() || newItemName.trim(),
      category: newItemCategory,
      price: Number(newItemPrice),
      description: newItemDesc.trim() || 'Delicious traditional preparation.',
      banglaDescription: 'সুস্বাদু ও মুখরোচক ঐতিহ্যবাহী খাবার।',
      image: newItemImg,
      isAvailable: true,
      isHalal: true,
      rating: 5.0,
      reviewsCount: 1,
      prepTime: '20 mins'
    };

    addMenuItem(newItem);
    setIsAddItemOpen(false);
    setNewItemName('');
    setNewItemBanglaName('');
    setNewItemDesc('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* Admin Top Navbar */}
      <header className="bg-brand-primary text-white border-b border-brand-dark px-4 sm:px-8 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </button>

          <div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-brand-gold flex items-center gap-2">
              Sarinda Operations Hub
            </h1>
            <p className="text-[11px] text-brand-cream/70">
              Kitchen & Restaurant Management System
            </p>
          </div>
        </div>

        {/* Admin Navigation Pills */}
        <div className="hidden md:flex items-center gap-1 bg-brand-dark/40 p-1 rounded-2xl border border-white/10">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'orders', label: `Orders (${pendingOrdersCount})` },
            { id: 'reservations', label: `Reservations (${pendingResCount})` },
            { id: 'menu', label: `Menu (${menu.length})` },
            { id: 'offers', label: `Offers (${offers.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeAdminTab === tab.id
                  ? 'bg-brand-gold text-brand-dark shadow'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="md:hidden flex overflow-x-auto p-2 bg-brand-primary/95 text-white gap-1.5 no-scrollbar">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'orders', label: 'Orders' },
          { id: 'reservations', label: 'Reservations' },
          { id: 'menu', label: 'Menu' },
          { id: 'offers', label: 'Offers' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeAdminTab === tab.id ? 'bg-brand-gold text-brand-dark' : 'bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-brand-primary mt-1">
                ৳{totalRevenue}
              </h3>
              <span className="text-[11px] text-emerald-600 font-bold">● Active Store Sales</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-brand-primary mt-1">
                {orders.length}
              </h3>
              <span className="text-[11px] text-amber-600 font-bold">
                {pendingOrdersCount} In Kitchen / Delivery
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Table Bookings</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-brand-primary mt-1">
                {reservations.length}
              </h3>
              <span className="text-[11px] text-blue-600 font-bold">
                {pendingResCount} Pending Confirmation
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Menu Catalog</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-brand-primary mt-1">
                {menu.length}
              </h3>
              <span className="text-[11px] text-slate-500 font-bold">
                {menu.filter(m => m.isAvailable).length} Active Dishes
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeAdminTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Recent Orders Overview */}
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-800">
                    Live Kitchen & Customer Orders
                  </h3>
                  <p className="text-xs text-slate-500">Real-time status updates</p>
                </div>
                <button
                  onClick={() => setActiveAdminTab('orders')}
                  className="text-xs font-bold text-brand-leaf hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-brand-primary">#{order.id}</span>
                        <span className="font-semibold text-xs text-slate-700">{order.customerName}</span>
                        <span className="text-[11px] text-slate-400">({order.phone})</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {order.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-sm text-slate-800">৳{order.total}</span>
                      
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${
                          order.status === 'delivered'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : order.status === 'on_delivery'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : order.status === 'preparing'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : order.status === 'cancelled'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="on_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Reservations Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-800">
                    Latest Bookings
                  </h3>
                  <p className="text-xs text-slate-500">Upcoming reservations</p>
                </div>
                <button
                  onClick={() => setActiveAdminTab('reservations')}
                  className="text-xs font-bold text-brand-leaf hover:underline"
                >
                  Manage →
                </button>
              </div>

              <div className="space-y-3">
                {reservations.slice(0, 4).map((res) => (
                  <div key={res.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{res.guestName} ({res.guestsCount}p)</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                        res.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {res.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-500">
                      {res.date} at {res.time} • <span className="text-brand-leaf font-semibold">{res.seatingArea}</span>
                    </p>
                    {res.specialRequest && (
                      <p className="text-[11px] italic text-slate-400">"{res.specialRequest}"</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. ORDERS MANAGEMENT TAB */}
        {activeAdminTab === 'orders' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif font-bold text-2xl text-slate-800">
                  Customer Orders Pipeline
                </h2>
                <p className="text-xs text-slate-500">
                  Manage incoming food orders, update cooking status, and view customer contacts.
                </p>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Type & Address</th>
                    <th className="p-3">Dishes Ordered</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/60">
                      <td className="p-3 font-mono font-bold text-brand-primary">#{order.id}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-800">{order.customerName}</div>
                        <div className="text-slate-400 text-[11px]">{order.phone}</div>
                      </td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 font-bold uppercase text-[10px] text-slate-700 mb-0.5">
                          {order.orderType}
                        </span>
                        <div className="truncate max-w-xs text-[11px]">{order.address}</div>
                      </td>
                      <td className="p-3">
                        <div className="max-w-xs space-y-0.5">
                          {order.items.map((i, idx) => (
                            <div key={idx} className="text-[11px]">
                              {i.quantity}x {i.menuItem.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 font-black text-sm text-slate-800">৳{order.total}</td>
                      <td className="p-3">
                        <span className="font-bold uppercase text-[11px] text-brand-leaf">
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className={`text-xs font-bold px-2 py-1 rounded-xl border ${
                            order.status === 'delivered'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : order.status === 'on_delivery'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : order.status === 'preparing'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : order.status === 'cancelled'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="preparing">Preparing</option>
                          <option value="on_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          title="View Invoice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. RESERVATIONS TAB */}
        {activeAdminTab === 'reservations' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif font-bold text-2xl text-slate-800">
                Table Reservations Manager
              </h2>
              <p className="text-xs text-slate-500">
                Confirm guest tables, seat assignments, and dining party requests.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Guest Name</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Party Size</th>
                    <th className="p-3">Seating Area</th>
                    <th className="p-3">Special Request</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50/60">
                      <td className="p-3 font-mono font-bold text-brand-primary">#{res.id}</td>
                      <td className="p-3 font-bold text-slate-800">{res.guestName}</td>
                      <td className="p-3">{res.phone}</td>
                      <td className="p-3 font-semibold text-slate-800">{res.date} • {res.time}</td>
                      <td className="p-3 font-bold">{res.guestsCount} Guests</td>
                      <td className="p-3 text-brand-leaf font-semibold">{res.seatingArea}</td>
                      <td className="p-3 max-w-xs truncate">{res.specialRequest || '—'}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          {res.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => updateReservationStatus(res.id, 'confirmed')}
                                className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[11px] hover:bg-emerald-700"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => updateReservationStatus(res.id, 'cancelled')}
                                className="px-2 py-1 bg-red-100 text-red-700 rounded-lg font-bold text-[11px] hover:bg-red-200"
                              >
                                Decline
                              </button>
                            </>
                          ) : (
                            <span
                              className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                                res.status === 'confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {res.status}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. MENU CATALOG MANAGER */}
        {activeAdminTab === 'menu' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif font-bold text-2xl text-slate-800">
                  Menu Items & Pricing Manager
                </h2>
                <p className="text-xs text-slate-500">
                  Update dish availability, live prices, or add new delicacies to the restaurant menu.
                </p>
              </div>

              <button
                onClick={() => setIsAddItemOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold flex items-center gap-1.5 hover:bg-brand-dark transition shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Dish</span>
              </button>
            </div>

            {/* Menu List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menu.map((dish) => (
                <div
                  key={dish.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex gap-3.5 items-start justify-between"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase text-brand-leaf">{dish.category}</span>
                    <h4 className="font-serif font-bold text-sm text-slate-800 truncate">{dish.name}</h4>
                    <p className="text-xs font-extrabold text-brand-primary mt-0.5">৳{dish.price}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => toggleItemAvailability(dish.id)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                          dish.isAvailable
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {dish.isAvailable ? '● In Stock' : '✕ Sold Out'}
                      </button>

                      <button
                        onClick={() => deleteMenuItem(dish.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. OFFERS TAB */}
        {activeAdminTab === 'offers' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif font-bold text-2xl text-slate-800">
                Campaign & Promo Codes
              </h2>
              <p className="text-xs text-slate-500">
                Active marketing codes and discount rules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {offers.map((offer) => (
                <div key={offer.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm bg-brand-primary text-brand-gold px-2.5 py-0.5 rounded">
                      {offer.code}
                    </span>
                    <span className="text-xs font-black text-emerald-700">
                      {offer.discountPercent}% OFF
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-800">{offer.title}</h4>
                  <p className="text-xs text-slate-500">{offer.description}</p>
                  <p className="text-[11px] font-semibold text-slate-400">Min Order: ৳{offer.minOrder}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Add New Dish Modal */}
      {isAddItemOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <h3 className="font-serif font-bold text-lg text-slate-800">
              Add New Dish to Menu
            </h3>

            <form onSubmit={handleAddNewItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Dish Name (English) *</label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Mutton Galouti Kabab"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Dish Name (বাংলা)</label>
                <input
                  type="text"
                  value={newItemBanglaName}
                  onChange={(e) => setNewItemBanglaName(e.target.value)}
                  placeholder="যেমন: খাসির গলৌটি কাবাব"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                  >
                    <option value="Biryani">Biryani (বিরিয়ানি)</option>
                    <option value="Khichuri">Khichuri (খিচুড়ি)</option>
                    <option value="Kebab">Kebab (কাবাব)</option>
                    <option value="Meat">Meat & Curry (মাংস)</option>
                    <option value="Fish">Fish (মাছ)</option>
                    <option value="Rice">Rice (ভাত)</option>
                    <option value="Vorta & Dal">Vorta & Dal (ভর্তা/সবজি/ডাল)</option>
                    <option value="Naan & Paratha">Naan & Paratha (নান ও পরটা)</option>
                    <option value="Kebab Platter">Kebab Platter (কাবাব প্লেটার)</option>
                    <option value="Dessert">Dessert (ডেজার্ট)</option>
                    <option value="Drinks">Drinks (ড্রিংকস)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Price (৳ BDT) *</label>
                  <input
                    type="number"
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  placeholder="Appetizing description of spices, cooking style..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  value={newItemImg}
                  onChange={(e) => setNewItemImg(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddItemOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-primary text-white font-bold"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-800">
                  Invoice #{selectedOrder.id}
                </h3>
                <p className="text-xs text-slate-500">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <p><strong>Customer:</strong> {selectedOrder.customerName} ({selectedOrder.phone})</p>
              <p><strong>Type:</strong> {selectedOrder.orderType.toUpperCase()}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              {selectedOrder.notes && <p><strong>Notes:</strong> {selectedOrder.notes}</p>}
            </div>

            <div className="border-t border-b border-slate-100 py-3 space-y-1.5 text-xs">
              <p className="font-bold text-slate-800">Items:</p>
              {selectedOrder.items.map((i, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{i.quantity}x {i.menuItem.name}</span>
                  <span className="font-bold">৳{i.menuItem.price * i.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>৳{selectedOrder.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>৳{selectedOrder.deliveryFee}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount:</span>
                  <span>-৳{selectedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-brand-primary pt-1 border-t">
                <span>Total:</span>
                <span>৳{selectedOrder.total}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 bg-brand-primary text-white font-bold rounded-xl text-xs"
            >
              Close Invoice
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
