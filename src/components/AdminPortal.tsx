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
  Power,
  PieChart,
  Download,
  Globe,
  Percent,
  ShieldCheck,
  Receipt,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
  Smartphone,
  Wallet,
  UtensilsCrossed,
  Flame,
  Zap,
  Bell,
  Check,
  Printer,
  ChevronRight,
  PhoneCall,
  RefreshCw
} from 'lucide-react';
import { MenuItem, Order, Reservation, DailyExpense, ExpenseCategory } from '../types';
import { OfflinePosTerminal } from './OfflinePosTerminal';

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
    offers,
    expenses,
    addExpense,
    deleteExpense,
    tables
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState<'pos' | 'overview' | 'finance' | 'orders' | 'reservations' | 'menu' | 'offers'>('pos');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderSourceFilter, setOrderSourceFilter] = useState<'all' | 'delivery' | 'dine_in' | 'pickup'>('all');

  // Peak Hour Rush State
  const [isPeakHour, setIsPeakHour] = useState<boolean>(() => {
    return localStorage.getItem('sarinda_peakhour_mode') === 'true';
  });
  const [kitchenDelay, setKitchenDelay] = useState<'normal' | 'busy' | 'full'>('normal');
  const [globalQuickSearch, setGlobalQuickSearch] = useState<string>('');

  const togglePeakHour = () => {
    const next = !isPeakHour;
    setIsPeakHour(next);
    localStorage.setItem('sarinda_peakhour_mode', String(next));
  };

  const handleQuickAdvanceOrder = (orderId: string, currentStatus: Order['status']) => {
    if (currentStatus === 'pending') {
      updateOrderStatus(orderId, 'preparing');
    } else if (currentStatus === 'preparing') {
      updateOrderStatus(orderId, 'on_delivery');
    } else if (currentStatus === 'on_delivery') {
      updateOrderStatus(orderId, 'delivered');
    }
  };

  // Expense Management State
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [expTitle, setExpTitle] = useState('');
  const [expBanglaTitle, setExpBanglaTitle] = useState('');
  const [expCategory, setExpCategory] = useState<ExpenseCategory>('meat_poultry');
  const [expAmount, setExpAmount] = useState<number>(5000);
  const [expPaymentMethod, setExpPaymentMethod] = useState<'cash' | 'bkash' | 'bank' | 'credit'>('cash');
  const [expRecordedBy, setExpRecordedBy] = useState('Mohammad Rahim (Manager)');
  const [expNotes, setExpNotes] = useState('');
  const [expenseFilterCat, setExpenseFilterCat] = useState<string>('all');
  const [expenseSearchQuery, setExpenseSearchQuery] = useState('');

  // New Item Form State
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemBanglaName, setNewItemBanglaName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<MenuItem['category']>('Biryani');
  const [newItemPrice, setNewItemPrice] = useState(350);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImg, setNewItemImg] = useState('https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80');

  // KPI & Financial Calculations
  const validOrders = orders.filter(o => o.status !== 'cancelled');
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  // Breakdown Calculations
  const bkashSales = validOrders.filter(o => o.paymentMethod === 'bkash' || o.paymentMethod === 'nagad').reduce((sum, o) => sum + o.total, 0);
  const cashSales = validOrders.filter(o => o.paymentMethod === 'cod').reduce((sum, o) => sum + o.total, 0);
  
  const deliverySales = validOrders.filter(o => o.orderType === 'delivery').reduce((sum, o) => sum + o.total, 0);
  const dineInSales = validOrders.filter(o => o.orderType === 'dine_in').reduce((sum, o) => sum + o.total, 0);
  const pickupSales = validOrders.filter(o => o.orderType === 'pickup').reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const pendingResCount = reservations.filter(r => r.status === 'pending').length;

  const categoryLabels: Record<ExpenseCategory, { en: string; bn: string; color: string; bg: string }> = {
    meat_poultry: { en: 'Meat & Poultry', bn: 'খাসি ও মুরগির মাংস', color: 'text-rose-700', bg: 'bg-rose-100' },
    rice_spices: { en: 'Basmati Rice & Spices', bn: 'বাসমতি চাল ও খাঁটি মশলা', color: 'text-amber-700', bg: 'bg-amber-100' },
    oil_ghee: { en: 'Mustard Oil & Pure Ghee', bn: 'খাঁটি ঘি ও সরিষার তেল', color: 'text-yellow-700', bg: 'bg-yellow-100' },
    vegetables_dairy: { en: 'Vegetables & Dairy', bn: 'আলু, পেঁয়াজ, টক দই', color: 'text-emerald-700', bg: 'bg-emerald-100' },
    packaging: { en: 'Packaging & Boxes', bn: 'পার্সেল বক্স ও ব্যাগ', color: 'text-blue-700', bg: 'bg-blue-100' },
    utilities: { en: 'Gas & Utilities', bn: 'গ্যাস সিলিন্ডার ও বিদ্যুৎ', color: 'text-purple-700', bg: 'bg-purple-100' },
    staff_wages: { en: 'Staff Daily Wages', bn: 'কিচেন ও ডেলিভারি মজুরি', color: 'text-indigo-700', bg: 'bg-indigo-100' },
    maintenance: { en: 'Maintenance', bn: 'রক্ষণাবেক্ষণ', color: 'text-slate-700', bg: 'bg-slate-100' },
    other: { en: 'Other Misc', bn: 'বিবিধ খরচ', color: 'text-teal-700', bg: 'bg-teal-100' }
  };

  const handleExportCSV = () => {
    const headers = ['Date,Title,Category,Amount (BDT),Payment Method,Recorded By,Notes\n'];
    const rows = expenses.map(e => 
      `"${e.date}","${e.title.replace(/"/g, '""')}","${categoryLabels[e.category]?.en || e.category}","${e.amount}","${e.paymentMethod}","${e.recordedBy}","${(e.notes || '').replace(/"/g, '""')}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sarinda_expense_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim() || Number(expAmount) <= 0) return;
    addExpense({
      title: expTitle.trim(),
      banglaTitle: expBanglaTitle.trim() || expTitle.trim(),
      category: expCategory,
      amount: Number(expAmount),
      paymentMethod: expPaymentMethod,
      recordedBy: expRecordedBy,
      date: new Date().toISOString().split('T')[0],
      notes: expNotes.trim()
    });
    setIsAddExpenseOpen(false);
    setExpTitle('');
    setExpBanglaTitle('');
    setExpAmount(5000);
    setExpNotes('');
  };

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
      
      {/* Admin Top Navbar - High-Contrast Luxury Executive Design */}
      <header className="bg-gradient-to-r from-[#071911] via-brand-primary to-[#0c2419] text-white border-b border-brand-leaf/30 px-4 sm:px-8 py-4 shadow-xl relative z-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Brand & Left Actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setActiveTab('home')}
                className="flex items-center gap-2 text-xs font-black bg-white/10 hover:bg-white/20 active:scale-95 px-3.5 py-2.5 rounded-2xl border border-white/15 transition cursor-pointer shadow-xs"
                title="Return to Public Customer Storefront"
              >
                <ArrowLeft className="w-4 h-4 text-brand-gold" />
                <span className="hidden sm:inline">স্টোরফ্রন্ট (Website)</span>
              </button>

              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="font-serif font-black text-2xl sm:text-3xl text-brand-gold tracking-tight flex items-center gap-2">
                    <span>Sarinda Operations Hub</span>
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Shift
                  </span>
                </div>
                <p className="text-xs text-brand-cream/80 font-medium mt-0.5">
                  সারিন্দা রেস্তোরাঁ ও ক্যাটারিং • সি কে ঘোষ রোড, ময়মনসিংহ
                </p>
              </div>
            </div>

            {/* Mobile Peak Hour Toggle */}
            <div className="lg:hidden">
              <button
                onClick={togglePeakHour}
                className={`px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition shadow-md ${
                  isPeakHour
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white animate-pulse'
                    : 'bg-white/10 text-white/90'
                }`}
              >
                <Flame className={`w-4 h-4 ${isPeakHour ? 'text-yellow-200' : 'text-slate-300'}`} />
                <span>{isPeakHour ? 'পিক আওয়ার ON' : 'পিক আওয়ার OFF'}</span>
              </button>
            </div>
          </div>

          {/* Right Controls: Peak Hour Mode & Kitchen Pace */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* 1. Peak Hour Quick Switch (Large Desktop Pill) */}
            <div className="hidden lg:flex items-center bg-black/40 p-1 rounded-2xl border border-white/15">
              <button
                onClick={togglePeakHour}
                className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
                  isPeakHour
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg ring-2 ring-amber-400/60 scale-[1.02]'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title="রাশ আওয়ার মোড চালু করলে বাটন বড় হয় এবং কিচেন অ্যালার্ট সক্রিয় হয়"
              >
                <Flame className={`w-4 h-4 ${isPeakHour ? 'text-yellow-200 animate-bounce' : 'text-amber-400'}`} />
                <span>{isPeakHour ? '⚡ রাশ আওয়ার মোড সক্রিয় (PEAK HOUR ON)' : 'পিক আওয়ার মোড চালু করুন'}</span>
              </button>
            </div>

            {/* 2. Kitchen Delay / Pace Indicator */}
            <div className="flex items-center gap-1 bg-black/30 p-1 rounded-2xl border border-white/10 text-xs">
              <span className="text-white/60 font-bold px-2 hidden sm:inline text-[11px] uppercase tracking-wider">কিচেন পেস:</span>
              <button
                onClick={() => setKitchenDelay('normal')}
                className={`px-2.5 py-1.5 rounded-xl font-extrabold text-[11px] transition cursor-pointer ${
                  kitchenDelay === 'normal'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                🟢 ১৫মি. (নরমাল)
              </button>
              <button
                onClick={() => setKitchenDelay('busy')}
                className={`px-2.5 py-1.5 rounded-xl font-extrabold text-[11px] transition cursor-pointer ${
                  kitchenDelay === 'busy'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                🟡 ২৫মি. (রাশ)
              </button>
              <button
                onClick={() => setKitchenDelay('full')}
                className={`px-2.5 py-1.5 rounded-xl font-extrabold text-[11px] transition cursor-pointer ${
                  kitchenDelay === 'full'
                    ? 'bg-rose-600 text-white font-black shadow animate-pulse'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                🔴 ৪০মি. (ফুল)
              </button>
            </div>

          </div>

        </div>

        {/* Admin Navigation Tabs - Large, Bold & High Legibility */}
        <div className="mt-4 pt-3 border-t border-white/10 hidden md:flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            {
              id: 'pos',
              icon: UtensilsCrossed,
              label: 'অফলাইন POS ও টেবিল',
              sub: 'Offline POS & Tables',
              badge: `${tables.filter(t => t.status === 'occupied').length} অকুপাইড`,
              badgeColor: 'bg-emerald-400 text-slate-950'
            },
            {
              id: 'orders',
              icon: ShoppingBag,
              label: 'অর্ডার পাইপলাইন',
              sub: 'Live Orders',
              badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}টি পেন্ডিং` : `${orders.length}টি`,
              badgeColor: pendingOrdersCount > 0 ? 'bg-amber-400 text-slate-950 animate-pulse font-black' : 'bg-white/20 text-white'
            },
            {
              id: 'finance',
              icon: DollarSign,
              label: 'দৈনিক লাভ-ক্ষতি (P&L)',
              sub: 'Daily Financials',
              badge: `মার্জিন ${profitMargin.toFixed(0)}%`,
              badgeColor: 'bg-brand-gold text-slate-950 font-black'
            },
            {
              id: 'reservations',
              icon: Calendar,
              label: 'টেবিল বুকিং',
              sub: 'Reservations',
              badge: pendingResCount > 0 ? `${pendingResCount} পেন্ডিং` : `${reservations.length}টি`,
              badgeColor: pendingResCount > 0 ? 'bg-amber-300 text-slate-950' : 'bg-white/20 text-white'
            },
            {
              id: 'menu',
              icon: Layers,
              label: 'মেনু ও প্রাইসিং',
              sub: 'Menu Items',
              badge: `${menu.length} পদ`,
              badgeColor: 'bg-white/20 text-white'
            },
            {
              id: 'offers',
              icon: Percent,
              label: 'ক্যাম্পেইন ও অফার',
              sub: 'Promo Codes',
              badge: `${offers.length}টি`,
              badgeColor: 'bg-white/20 text-white'
            },
            {
              id: 'overview',
              icon: PieChart,
              label: 'স্টোর সামারি',
              sub: 'Overview',
              badge: '',
              badgeColor: ''
            }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-gold text-slate-950 font-black shadow-lg ring-2 ring-brand-gold/60 scale-[1.02]'
                    : 'bg-white/10 hover:bg-white/20 text-white/90 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-brand-gold'}`} />
                <div className="text-left leading-tight">
                  <div className="font-black">{tab.label}</div>
                  <div className={`text-[10px] ${isActive ? 'text-slate-800' : 'text-white/60'} font-medium`}>{tab.sub}</div>
                </div>
                {tab.badge && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-black ${tab.badgeColor}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </header>

      {/* Mobile Tabs Bar */}
      <div className="md:hidden flex overflow-x-auto p-2.5 bg-[#0e241b] text-white gap-2 no-scrollbar border-b border-white/10">
        {[
          { id: 'pos', label: `🍽️ POS ও টেবিল (${tables.filter(t => t.status === 'occupied').length})` },
          { id: 'orders', label: `⚡ অর্ডার (${pendingOrdersCount})` },
          { id: 'finance', label: `📊 লাভ-ক্ষতি (${profitMargin.toFixed(0)}%)` },
          { id: 'reservations', label: `📅 বুকিং (${pendingResCount})` },
          { id: 'menu', label: `🍲 মেনু (${menu.length})` },
          { id: 'offers', label: `🏷️ অফার (${offers.length})` },
          { id: 'overview', label: '📈 ওভারভিউ' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition cursor-pointer ${
              activeAdminTab === tab.id ? 'bg-brand-gold text-slate-950 shadow' : 'bg-white/10 text-white/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Peak Hour Instant Fast-Action Bar (পিক আওয়ার কুইক একশন বার) */}
      <section className={`px-4 sm:px-8 py-3.5 border-b transition-colors duration-300 ${
        isPeakHour
          ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white border-amber-400 shadow-md'
          : 'bg-white text-slate-700 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3.5">
          
          {/* Quick Search for Rush Hours */}
          <div className="relative w-full md:w-96">
            <Search className={`w-4 h-4 absolute left-3.5 top-3 ${isPeakHour ? 'text-slate-400' : 'text-slate-400'}`} />
            <input
              type="text"
              value={globalQuickSearch}
              onChange={(e) => setGlobalQuickSearch(e.target.value)}
              placeholder="কাস্টমার ফোন (017...), নাম বা অর্ডার ID (#8924)..."
              className={`w-full pl-10 pr-8 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition focus:outline-none focus:ring-2 ${
                isPeakHour
                  ? 'bg-white text-slate-900 placeholder:text-slate-400 focus:ring-amber-300 shadow-inner'
                  : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:bg-white focus:ring-brand-primary/20'
              }`}
            />
            {globalQuickSearch && (
              <button
                onClick={() => setGlobalQuickSearch('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Rush Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            <button
              onClick={() => setActiveAdminTab('pos')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                isPeakHour
                  ? 'bg-slate-950 text-brand-gold hover:bg-slate-900'
                  : 'bg-brand-primary text-white hover:bg-brand-dark'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-brand-gold" />
              <span>+ নতুন টেবিল বিল (POS)</span>
            </button>

            <button
              onClick={() => {
                setActiveAdminTab('orders');
                setOrderSourceFilter('all');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                isPeakHour
                  ? 'bg-white text-slate-950 hover:bg-amber-100'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-rose-600" />
              <span>পেন্ডিং কিচেন অর্ডার ({pendingOrdersCount}টি)</span>
            </button>

            <button
              onClick={() => {
                if (orders.length > 0) {
                  setSelectedOrder(orders[0]);
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                isPeakHour
                  ? 'bg-amber-900/40 text-white border border-white/20 hover:bg-amber-900/60'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
              title="সর্বশেষ অর্ডারের ইনভয়েস প্রিভিউ ও প্রিন্ট"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-600" />
              <span>শেষ রসিদ প্রিন্ট</span>
            </button>
          </div>

        </div>

        {/* Instant Search Results Tray (Peak Hour Lookup) */}
        {globalQuickSearch.trim() && (
          <div className="max-w-7xl mx-auto mt-3 p-4 bg-white rounded-2xl shadow-xl border border-slate-200 text-slate-800 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-brand-leaf" />
                অনুসন্ধানের ফলাফল: "{globalQuickSearch}"
              </span>
              <button
                onClick={() => setGlobalQuickSearch('')}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                বন্ধ করুন ✕
              </button>
            </div>

            {orders.filter(o => 
              o.id.toLowerCase().includes(globalQuickSearch.toLowerCase()) ||
              o.customerName.toLowerCase().includes(globalQuickSearch.toLowerCase()) ||
              o.phone.includes(globalQuickSearch) ||
              o.address.toLowerCase().includes(globalQuickSearch.toLowerCase())
            ).length === 0 ? (
              <p className="text-xs text-slate-500 py-2">কোনো ম্যাচিং অর্ডার পাওয়া যায়নি। সঠিক নাম, ফোন বা অর্ডার ID দিয়ে চেষ্টা করুন।</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {orders.filter(o => 
                  o.id.toLowerCase().includes(globalQuickSearch.toLowerCase()) ||
                  o.customerName.toLowerCase().includes(globalQuickSearch.toLowerCase()) ||
                  o.phone.includes(globalQuickSearch) ||
                  o.address.toLowerCase().includes(globalQuickSearch.toLowerCase())
                ).slice(0, 6).map((order) => (
                  <div key={order.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-xs text-brand-primary">#{order.id}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                        order.status === 'on_delivery' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'preparing' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div>
                      <div className="font-extrabold text-sm text-slate-900">{order.customerName}</div>
                      <a href={`tel:${order.phone}`} className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
                        <PhoneCall className="w-3 h-3" /> {order.phone}
                      </a>
                    </div>

                    <div className="text-xs text-slate-600 truncate">
                      {order.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="font-black text-sm text-brand-primary">৳{order.total}</span>
                      
                      <div className="flex items-center gap-1.5">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => handleQuickAdvanceOrder(order.id, 'pending')}
                            className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-black cursor-pointer"
                          >
                            🔥 রান্না শুরু
                          </button>
                        )}
                        {order.status === 'preparing' && (
                          <button
                            onClick={() => handleQuickAdvanceOrder(order.id, 'preparing')}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-black cursor-pointer"
                          >
                            🚀 ডেলিভারি
                          </button>
                        )}
                        {order.status === 'on_delivery' && (
                          <button
                            onClick={() => handleQuickAdvanceOrder(order.id, 'on_delivery')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black cursor-pointer"
                          >
                            ✅ সম্পন্ন
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
                          title="View Invoice"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Cards Row - Executive Financial & Operational Snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* 1. Total Sales */}
          <div 
            onClick={() => setActiveAdminTab('finance')}
            className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Today's Sales • মোট বিক্রি
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 mt-1.5 tracking-tight">
                  ৳{totalRevenue.toLocaleString()}
                </h3>
                <span className="text-xs text-emerald-700 font-extrabold flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{validOrders.length}টি সফল অর্ডার (ডেলিভারি + ডাইন-ইন)</span>
                </span>
              </div>
              <div className="w-13 h-13 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* 2. Total Expenses */}
          <div 
            onClick={() => setActiveAdminTab('finance')}
            className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-rose-400 transition cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-500" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Today's Expenses • মোট খরচ
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl font-black text-rose-600 mt-1.5 tracking-tight">
                  ৳{totalExpenses.toLocaleString()}
                </h3>
                <span className="text-xs text-rose-600 font-extrabold flex items-center gap-1 mt-2">
                  <ArrowDownRight className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{expenses.length}টি বাজার ও ভাউচার রেকর্ড</span>
                </span>
              </div>
              <div className="w-13 h-13 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                <Receipt className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* 3. Net Profit */}
          <div 
            onClick={() => setActiveAdminTab('finance')}
            className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition cursor-pointer relative overflow-hidden group"
          >
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${netProfit >= 0 ? 'bg-emerald-600' : 'bg-red-500'}`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Net Profit • আজকের নিট লাভ
                </p>
                <h3 className={`font-serif text-3xl sm:text-4xl font-black mt-1.5 tracking-tight ${netProfit >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                  ৳{netProfit.toLocaleString()}
                </h3>
                <span className="text-xs text-emerald-700 font-extrabold flex items-center gap-1 mt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{netProfit >= 0 ? 'পজিটিভ ক্যাশ ফ্লো উদ্বৃত্ত' : 'খরচ বেশি / পর্যালোচনা প্রয়োজন'}</span>
                </span>
              </div>
              <div className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition ${netProfit >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* 4. Profit Margin % */}
          <div 
            onClick={() => setActiveAdminTab('finance')}
            className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400 transition cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Profit Margin • নিট মার্জিন
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl font-black text-amber-600 mt-1.5 tracking-tight">
                  {profitMargin.toFixed(1)}%
                </h3>
                <span className="text-xs text-amber-700 font-extrabold flex items-center gap-1 mt-2">
                  <Percent className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{profitMargin >= 25 ? '★ স্ট্যান্ডার্ড রেস্তোরাঁ মার্জিন' : 'ন্যায্য মার্জিন'}</span>
                </span>
              </div>
              <div className="w-13 h-13 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                <PieChart className="w-6 h-6" />
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 0. OFFLINE RESTAURANT POS & TABLE MANAGEMENT TERMINAL */}
        {/* ======================================================== */}
        {activeAdminTab === 'pos' && (
          <div className="space-y-8 animate-fadeIn">
            <OfflinePosTerminal />
          </div>
        )}

        {/* ======================================================== */}
        {/* 1. DAILY P&L, EXPENSES & PROFIT ANALYTICS TAB */}
        {/* ======================================================== */}
        {activeAdminTab === 'finance' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Global Remote Access & Cloud Ledger Banner */}
            <div className="bg-gradient-to-r from-brand-primary via-emerald-950 to-brand-dark p-6 sm:p-7 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                    <Globe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                    <span>Global Remote Sync Active • Accessible Worldwide</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-brand-gold">
                    Sarinda Live P&L Ledger (দৈনিক আয়-ব্যয় ও নিট লাভ)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    বিশ্বের যেকোনো প্রান্ত (লন্ডন, দুবাই, নিউইয়র্ক বা ঢাকা) থেকে আপনার স্মার্টফোন বা ল্যাপটপে রেস্তোরাঁর প্রতিদিনের কাঁচামাল খরচ, মোট বিক্রি, নিট লাভ ও মার্জিন রিয়েল-টাইমে পর্যবেক্ষণ করুন।
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setIsAddExpenseOpen(true)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-extrabold text-xs shadow-lg transition transform active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ খরচ এন্ট্রি (Add Expense)</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition cursor-pointer"
                    title="Export financial statement as CSV spreadsheet"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Quick Status Pill Bar */}
              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-white/60 block text-[11px]">Database Ledger:</span>
                  <span className="font-bold text-emerald-300 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Live Cloud Connected
                  </span>
                </div>
                <div>
                  <span className="text-white/60 block text-[11px]">Auto WhatsApp Summary:</span>
                  <span className="font-bold text-slate-200 mt-0.5 block">Everyday @ 11:30 PM</span>
                </div>
                <div>
                  <span className="text-white/60 block text-[11px]">Owner Master PIN:</span>
                  <span className="font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Secured (Admin Role)
                  </span>
                </div>
                <div>
                  <span className="text-white/60 block text-[11px]">Daily Target Achievement:</span>
                  <span className="font-bold text-emerald-400 mt-0.5 block">
                    {Math.min(100, Math.round((netProfit / 22000) * 100))}% of Daily Target
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Health & Channel Distribution Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 7 cols: Cost Structure & Category Breakdown */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-800">
                      খরচের ক্যাটাগরি বিশ্লেষণ (Cost Structure Breakdown)
                    </h3>
                    <p className="text-xs text-slate-500">কোন খাতে কত টাকা ব্যয় হচ্ছে</p>
                  </div>
                  <span className="text-xs font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-xl border border-rose-100">
                    মোট ৳{totalExpenses.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-4">
                  {(Object.keys(categoryLabels) as ExpenseCategory[]).map((cat) => {
                    const catAmount = expenses
                      .filter(e => e.category === cat)
                      .reduce((sum, e) => sum + e.amount, 0);
                    const percentage = totalExpenses > 0 ? ((catAmount / totalExpenses) * 100) : 0;
                    if (catAmount === 0 && percentage === 0) return null;

                    return (
                      <div key={cat} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700 flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${categoryLabels[cat].bg} border border-slate-300`} />
                            {categoryLabels[cat].bn} ({categoryLabels[cat].en})
                          </span>
                          <span className="font-mono font-bold text-slate-800">
                            ৳{catAmount.toLocaleString()} <span className="text-[11px] text-slate-400 font-normal">({percentage.toFixed(1)}%)</span>
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              cat === 'meat_poultry' ? 'bg-rose-500' :
                              cat === 'rice_spices' ? 'bg-amber-500' :
                              cat === 'oil_ghee' ? 'bg-yellow-500' :
                              cat === 'utilities' ? 'bg-purple-500' :
                              cat === 'staff_wages' ? 'bg-indigo-500' :
                              cat === 'packaging' ? 'bg-blue-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(2, percentage))}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-100 bg-slate-50/70 p-4 rounded-2xl flex items-center gap-3 text-xs text-slate-600">
                  <AlertCircle className="w-5 h-5 text-brand-primary shrink-0" />
                  <p>
                    <strong>F&B Management Tip:</strong> কাচ্চি রেস্তোরাঁয় কাঁচামাল বাবদ খরচ (Food Cost) সাধারণত মোট বিক্রির <strong>৬০-৬৫%</strong> এর মধ্যে থাকলে স্বাস্থ্যকর মুনাফা অর্জন করা যায়।
                  </p>
                </div>
              </div>

              {/* Right 5 cols: Sales Channels & Payment Split */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-800">
                    বিক্রি ও পেমেন্ট চ্যানেল (Sales Channels & Split)
                  </h3>
                  <p className="text-xs text-slate-500">টাকা কীভাবে আসছে</p>
                </div>

                {/* Sales Channels */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-700">ডাইন-ইন রেস্তোরাঁ টেবিল (Dine-In)</p>
                      <p className="text-[11px] text-slate-400">হল রুম ও ভিআইপি কেবিন সার্ভিস</p>
                    </div>
                    <span className="font-mono font-black text-sm text-brand-primary">৳{dineInSales.toLocaleString()}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-700">হোম ডেলিভারি (Online Delivery)</p>
                      <p className="text-[11px] text-slate-400">ওয়েবসাইট ও হটলাইন অর্ডার</p>
                    </div>
                    <span className="font-mono font-black text-sm text-brand-primary">৳{deliverySales.toLocaleString()}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-700">কাউন্টার টেক-অ্যাওয়ে (Takeaway & Pickup)</p>
                      <p className="text-[11px] text-slate-400">পার্সেল কাউন্টার থেকে পিকআপ</p>
                    </div>
                    <span className="font-mono font-black text-sm text-brand-primary">৳{pickupSales.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Methods Split */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <p className="text-xs font-bold text-slate-600">পেমেন্ট মেথড অনুপাত:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-2xl bg-pink-50/70 border border-pink-100 text-pink-900 text-xs">
                      <span className="font-bold block">বিকাশ ও ডিজিটাল (bKash)</span>
                      <span className="font-black text-base font-mono">৳{bkashSales.toLocaleString()}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-emerald-900 text-xs">
                      <span className="font-bold block">ক্যাশ অন ডেলিভারি (Cash)</span>
                      <span className="font-black text-base font-mono">৳{cashSales.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Profit Margin Gauge */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200/60 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">বর্তমান নেট প্রফিট মার্জিন:</span>
                    <span className="font-black font-mono text-emerald-700 text-sm">{profitMargin.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(5, profitMargin))}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    রেটিং: <strong className="text-emerald-700">চমৎকার (Excellent)</strong> — স্ট্যান্ডার্ড ২৫% মার্জিনের চেয়ে বেশি।
                  </p>
                </div>
              </div>

            </div>

            {/* Dish-Level Profit Economics Table (খাবার প্রতি লাভ ও ফুড কস্ট) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-800">
                    খাবার প্রতি লাভ ও কাঁচামাল খরচ (Dish-Level Unit Economics)
                  </h3>
                  <p className="text-xs text-slate-500">
                    প্রতি প্লেট রান্নায় খাসির মাংস, বাসমতি চাল, মশলা ও ঘি বাবদ কত খরচ হচ্ছে বনাম কত টাকায় বিক্রি হচ্ছে
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">
                  হাই মার্জিন আইটেম ট্র্যাকার
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                    <tr>
                      <th className="p-3 rounded-l-xl">আইটেমের নাম (Dish Name)</th>
                      <th className="p-3">বিক্রয় মূল্য (Price)</th>
                      <th className="p-3">কাঁচামাল খরচ (Raw Material Cost)</th>
                      <th className="p-3">গ্রস লাভ / প্লেট (Profit / Plate)</th>
                      <th className="p-3">মার্জিন % (Margin)</th>
                      <th className="p-3 rounded-r-xl">পারফরম্যান্স স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'স্পেশাল কাচ্চি বিরিয়ানি (Special Kacchi)', price: 340, cost: 195, status: 'Best Volume Seller' },
                      { name: 'নাওয়াবী কাচ্চি (Nawabi Saffron Kacchi)', price: 450, cost: 235, status: 'High Margin Premium' },
                      { name: 'শাহী বোরহানি (Shahi Borhani 250ml)', price: 75, cost: 28, status: 'Super High Margin (62%)' },
                      { name: 'বিয়ের বাড়ির চিকেন রোস্ট (Chicken Roast)', price: 180, cost: 92, status: 'High Volume Addon' },
                      { name: 'রয়াল ফ্যামিলি ফিস্ট প্লেটার (Royal Platter)', price: 990, cost: 560, status: 'Top Basket Size Booster' },
                      { name: 'শাহী মোরগ পোলাও (Morog Polao)', price: 240, cost: 135, status: 'Consistent Contributor' },
                      { name: 'জাফরানী ফিরনি (Zafrani Firni Pot)', price: 120, cost: 45, status: 'High Margin Dessert (62%)' }
                    ].map((row, idx) => {
                      const profit = row.price - row.cost;
                      const margin = ((profit / row.price) * 100).toFixed(1);

                      return (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="p-3 font-bold text-slate-800">{row.name}</td>
                          <td className="p-3 font-mono font-bold">৳{row.price}</td>
                          <td className="p-3 font-mono text-rose-600 font-semibold">৳{row.cost}</td>
                          <td className="p-3 font-mono text-emerald-700 font-bold">+৳{profit}</td>
                          <td className="p-3 font-mono font-black text-amber-700">{margin}%</td>
                          <td className="p-3">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Daily Expense Records Ledger (খরচের ভাউচার তালিকা) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-800">
                    দৈনিক খরচের খাতা ও ভাউচার হিসেব (Daily Expense Vouchers)
                  </h3>
                  <p className="text-xs text-slate-500">
                    আজকের সব বাজারের তালিকা, ডেলিভারি শিফট মজুরি ও ইউটিলিটি খরচের বিস্তারিত রেকর্ড
                  </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="খরচ বা ভাউচার খুঁজুন..."
                      value={expenseSearchQuery}
                      onChange={(e) => setExpenseSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 w-48 sm:w-60"
                    />
                  </div>

                  <select
                    value={expenseFilterCat}
                    onChange={(e) => setExpenseFilterCat(e.target.value)}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
                  >
                    <option value="all">সব ক্যাটাগরি (All)</option>
                    <option value="meat_poultry">মাংস ও মুরগি</option>
                    <option value="rice_spices">চাল ও মশলা</option>
                    <option value="oil_ghee">ঘি ও তেল</option>
                    <option value="vegetables_dairy">শাকসবজি ও আলু</option>
                    <option value="utilities">গ্যাস ও বিদ্যুৎ</option>
                    <option value="packaging">প্যাকেজিং বক্স</option>
                    <option value="staff_wages">স্টাফ মজুরি</option>
                    <option value="other">অন্যান্য</option>
                  </select>

                  <button
                    onClick={() => setIsAddExpenseOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary/90 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>নতুন ভাউচার</span>
                  </button>
                </div>
              </div>

              {/* Expense Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                    <tr>
                      <th className="p-3 rounded-l-xl">তারিখ</th>
                      <th className="p-3">খরচের বিবরণ (Description)</th>
                      <th className="p-3">ক্যাটাগরি (Category)</th>
                      <th className="p-3">পেমেন্ট মাধ্যম</th>
                      <th className="p-3">এন্ট্রি কারী (Recorded By)</th>
                      <th className="p-3">পরিমাণ (Amount)</th>
                      <th className="p-3 rounded-r-xl text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {expenses
                      .filter(e => {
                        const matchCat = expenseFilterCat === 'all' || e.category === expenseFilterCat;
                        const matchSearch = !expenseSearchQuery.trim() || 
                          e.title.toLowerCase().includes(expenseSearchQuery.toLowerCase()) ||
                          (e.banglaTitle && e.banglaTitle.toLowerCase().includes(expenseSearchQuery.toLowerCase())) ||
                          (e.notes && e.notes.toLowerCase().includes(expenseSearchQuery.toLowerCase()));
                        return matchCat && matchSearch;
                      })
                      .map((exp) => {
                        const catMeta = categoryLabels[exp.category] || categoryLabels.other;

                        return (
                          <tr key={exp.id} className="hover:bg-slate-50/80 transition">
                            <td className="p-3 font-mono text-slate-500">{exp.date}</td>
                            <td className="p-3">
                              <p className="font-bold text-slate-800">{exp.title}</p>
                              {exp.banglaTitle && (
                                <p className="text-[11px] text-slate-500">{exp.banglaTitle}</p>
                              )}
                              {exp.notes && (
                                <p className="text-[10px] text-slate-400 italic mt-0.5">নোট: {exp.notes}</p>
                              )}
                            </td>
                            <td className="p-3">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${catMeta.bg} ${catMeta.color}`}>
                                {catMeta.bn}
                              </span>
                            </td>
                            <td className="p-3 uppercase font-mono font-bold text-slate-600">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] ${
                                exp.paymentMethod === 'bkash' ? 'bg-pink-100 text-pink-700' :
                                exp.paymentMethod === 'bank' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {exp.paymentMethod}
                              </span>
                            </td>
                            <td className="p-3 text-slate-600">{exp.recordedBy}</td>
                            <td className="p-3 font-mono font-black text-rose-600 text-sm">
                              ৳{exp.amount.toLocaleString()}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete expense "${exp.title}"?`)) {
                                    deleteExpense(exp.id);
                                  }
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
                                title="Delete voucher"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Trend (Last 7 Days Financial Ledger) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-800">
                    গত ৭ দিনের লাভ-ক্ষতির তুলনা (7-Day Performance Trend)
                  </h3>
                  <p className="text-xs text-slate-500">প্রতিদিনের মোট বিক্রি, বাজার খরচ এবং অর্জিত মুনাফা</p>
                </div>
                <span className="text-xs font-bold text-brand-primary flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> চলতি সপ্তাহ
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                    <tr>
                      <th className="p-3 rounded-l-xl">দিন ও তারিখ</th>
                      <th className="p-3">মোট বিক্রি (Sales)</th>
                      <th className="p-3">মোট খরচ (Expenses)</th>
                      <th className="p-3">নিট লাভ (Net Profit)</th>
                      <th className="p-3">মার্জিন % (Profit Margin)</th>
                      <th className="p-3 rounded-r-xl">ক্যাশ ফ্লো স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { day: 'আজ (Today)', date: '09 Sep 2026', sales: totalRevenue, expenses: totalExpenses, profit: netProfit, margin: profitMargin.toFixed(1) },
                      { day: 'গতকাল (Yesterday)', date: '08 Sep 2026', sales: 79200, expenses: 54100, profit: 25100, margin: '31.7' },
                      { day: 'সোমবার (Monday)', date: '07 Sep 2026', sales: 68500, expenses: 47200, profit: 21300, margin: '31.1' },
                      { day: 'রবিবার (Sunday)', date: '06 Sep 2026', sales: 94000, expenses: 62800, profit: 31200, margin: '33.2' },
                      { day: 'শনিবার (Saturday - Weekend)', date: '05 Sep 2026', sales: 112000, expenses: 74500, profit: 37500, margin: '33.5' },
                      { day: 'শুক্রবার (Friday - Peak)', date: '04 Sep 2026', sales: 125000, expenses: 81000, profit: 44000, margin: '35.2' },
                      { day: 'বৃহস্পতিবার (Thursday)', date: '03 Sep 2026', sales: 82000, expenses: 56000, profit: 26000, margin: '31.7' }
                    ].map((row, idx) => (
                      <tr key={idx} className={idx === 0 ? 'bg-emerald-50/50 font-semibold' : 'hover:bg-slate-50/80 transition'}>
                        <td className="p-3">
                          <span className="font-bold text-slate-800">{row.day}</span>
                          <span className="text-[11px] text-slate-400 block">{row.date}</span>
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-800">৳{row.sales.toLocaleString()}</td>
                        <td className="p-3 font-mono text-rose-600">৳{row.expenses.toLocaleString()}</td>
                        <td className="p-3 font-mono font-black text-emerald-700">+৳{row.profit.toLocaleString()}</td>
                        <td className="p-3 font-mono font-bold text-amber-700">{row.margin}%</td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Healthy Surplus
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

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
                  Manage online deliveries, dine-in table bills, and takeaway counter pickups in one place.
                </p>
              </div>

              {/* Orders Source Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { id: 'all', label: `সকল (${orders.length})` },
                  { id: 'delivery', label: `🌐 অনলাইন (${orders.filter(o => o.orderType === 'delivery').length})` },
                  { id: 'dine_in', label: `🍽️ ডাইন-ইন (${orders.filter(o => o.orderType === 'dine_in').length})` },
                  { id: 'pickup', label: `🛍️ টেক-অ্যাওয়ে (${orders.filter(o => o.orderType === 'pickup').length})` }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setOrderSourceFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                      orderSourceFilter === f.id
                        ? 'bg-brand-primary text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-800 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Customer & Phone</th>
                    <th className="p-3.5">Type & Delivery Area</th>
                    <th className="p-3.5">Dishes Ordered</th>
                    <th className="p-3.5">Bill</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5">Status & 1-Click Rush Action</th>
                    <th className="p-3.5 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders
                    .filter((o) => orderSourceFilter === 'all' || o.orderType === orderSourceFilter)
                    .map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5 font-mono font-black text-brand-primary text-xs">#{order.id}</td>
                      <td className="p-3.5">
                        <div className="font-black text-slate-900 text-xs">{order.customerName}</div>
                        <a href={`tel:${order.phone}`} className="text-slate-500 hover:text-emerald-700 text-[11px] font-bold flex items-center gap-1 mt-0.5">
                          <PhoneCall className="w-3 h-3 text-emerald-600" />
                          {order.phone}
                        </a>
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-block px-2.5 py-0.5 rounded-lg font-black uppercase text-[10px] mb-1 ${
                          order.orderType === 'delivery' ? 'bg-blue-100 text-blue-800' :
                          order.orderType === 'dine_in' ? 'bg-amber-100 text-amber-900' : 'bg-purple-100 text-purple-900'
                        }`}>
                          {order.orderType === 'delivery' ? '🌐 অনলাইন ডেলিভারি' :
                           order.orderType === 'dine_in' ? '🍽️ ডাইন-ইন' : '🛍️ টেক-অ্যাওয়ে'}
                        </span>
                        <div className="truncate max-w-xs text-[11px] text-slate-600 font-medium">{order.address}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="max-w-xs space-y-1">
                          {order.items.map((i, idx) => (
                            <div key={idx} className="text-[11px] font-semibold text-slate-800 flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 text-[10px] font-black flex items-center justify-center shrink-0">
                                {i.quantity}
                              </span>
                              <span className="truncate">{i.menuItem.name}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5 font-mono font-black text-sm text-slate-900">৳{order.total}</td>
                      <td className="p-3.5">
                        <span className={`font-black uppercase text-[10px] px-2 py-0.5 rounded-md ${
                          order.paymentMethod === 'bkash' ? 'bg-pink-100 text-pink-800' :
                          order.paymentMethod === 'nagad' ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          
                          {/* 1-Click Fast Advancement Button for Peak Hours */}
                          {order.status === 'pending' && (
                            <button
                              onClick={() => handleQuickAdvanceOrder(order.id, 'pending')}
                              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-[11px] flex items-center gap-1 shadow-xs cursor-pointer whitespace-nowrap"
                              title="রান্না শুরুর নোটিশ দিন"
                            >
                              <Flame className="w-3.5 h-3.5" />
                              <span>🔥 রান্না শুরু (Start)</span>
                            </button>
                          )}
                          {order.status === 'preparing' && (
                            <button
                              onClick={() => handleQuickAdvanceOrder(order.id, 'preparing')}
                              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-[11px] flex items-center gap-1 shadow-xs cursor-pointer whitespace-nowrap"
                              title="রাইডার বা ওয়েটারের কাছে পাঠান"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>🚀 ডেলিভারি পাঠান</span>
                            </button>
                          )}
                          {order.status === 'on_delivery' && (
                            <button
                              onClick={() => handleQuickAdvanceOrder(order.id, 'on_delivery')}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-[11px] flex items-center gap-1 shadow-xs cursor-pointer whitespace-nowrap"
                              title="অর্ডার ডেলিভার্ড হিসেবে সম্পন্ন করুন"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>✅ সম্পন্ন (Delivered)</span>
                            </button>
                          )}
                          {order.status === 'delivered' && (
                            <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-[11px] flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> ডেলিভার্ড
                            </span>
                          )}

                          {/* Fallback Select Dropdown */}
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className={`text-[11px] font-extrabold px-2 py-1 rounded-xl border cursor-pointer ${
                              order.status === 'delivered'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : order.status === 'on_delivery'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : order.status === 'preparing'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : order.status === 'cancelled'
                                ? 'bg-red-50 text-red-800 border-red-300'
                                : 'bg-slate-100 text-slate-800 border-slate-300'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="on_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-brand-primary hover:text-white text-slate-700 transition cursor-pointer"
                          title="ইনভয়েস দেখুন ও প্রিন্ট করুন"
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

      {/* Add Daily Expense Voucher Modal */}
      {isAddExpenseOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-800 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-rose-600" />
                  নতুন দৈনিক খরচ / ভাউচার এন্ট্রি (Record Expense)
                </h3>
                <p className="text-xs text-slate-500">
                  রিয়েল-টাইম ক্লাউড সিস্টেমে সেভ হবে এবং সাথে সাথে নিট লাভ ও মার্জিন আপডেট হবে
                </p>
              </div>
              <button
                onClick={() => setIsAddExpenseOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExpenseSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  খরচের শিরোনাম / বিবরণ (Title) *
                </label>
                <input
                  type="text"
                  required
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  placeholder="যেমন: খাসির মাংস ২৫ কেজি, বাসমতি চাল, গ্যাস সিলিন্ডার..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  বাংলা অতিরিক্ত বিবরণ (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={expBanglaTitle}
                  onChange={(e) => setExpBanglaTitle(e.target.value)}
                  placeholder="যেমন: পুরান ঢাকা কাপ্তান বাজার খাসি সাপ্লাই"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">
                    খরচের খাত (Category) *
                  </label>
                  <select
                    value={expCategory}
                    onChange={(e) => setExpCategory(e.target.value as ExpenseCategory)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="meat_poultry">খাসি ও মুরগির মাংস (Meat & Poultry)</option>
                    <option value="rice_spices">বাসমতি চাল ও মশলা (Rice & Spices)</option>
                    <option value="oil_ghee">খাঁটি ঘি ও সরিষার তেল (Oil & Ghee)</option>
                    <option value="vegetables_dairy">আলু, পেঁয়াজ ও দই (Vegetables & Dairy)</option>
                    <option value="utilities">গ্যাস সিলিন্ডার ও বিদ্যুৎ (Utilities)</option>
                    <option value="packaging">পার্সেল বক্স ও ব্যাগ (Packaging)</option>
                    <option value="staff_wages">দৈনিক স্টাফ মজুরি (Staff Wages)</option>
                    <option value="maintenance">মেরামত ও রক্ষণাবেক্ষণ (Maintenance)</option>
                    <option value="other">অন্যান্য বিবিধ খরচ (Other)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700">
                    টাকার পরিমাণ (Amount ৳ BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={expAmount}
                    onChange={(e) => setExpAmount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold text-rose-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">
                    পেমেন্ট মাধ্যম (Payment Method) *
                  </label>
                  <select
                    value={expPaymentMethod}
                    onChange={(e) => setExpPaymentMethod(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="cash">নগদ ক্যাশ (Cash)</option>
                    <option value="bkash">বিকাশ / নগদ (bKash / MFS)</option>
                    <option value="bank">ব্যাংক ট্রান্সফার (Bank Transfer)</option>
                    <option value="credit">ভেন্ডর বাকি / ক্রেডিট (Credit)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700">
                    এন্ট্রি কারী (Recorded By) *
                  </label>
                  <input
                    type="text"
                    required
                    value={expRecordedBy}
                    onChange={(e) => setExpRecordedBy(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  নোট বা বাজার মেমোর বিবরণ
                </label>
                <textarea
                  rows={2}
                  value={expNotes}
                  onChange={(e) => setExpNotes(e.target.value)}
                  placeholder="ভেন্ডর মেমো নম্বর বা চালানের তথ্য..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddExpenseOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                  বাতিল (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition shadow-md cursor-pointer"
                >
                  ভাউচার সংরক্ষণ করুন (Save Expense)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
