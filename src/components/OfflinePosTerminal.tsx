import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { RestaurantTable, MenuItem, CartItem, Order } from '../types';
import {
  UtensilsCrossed,
  Users,
  Clock,
  Printer,
  Receipt,
  Plus,
  Minus,
  Trash2,
  Search,
  CheckCircle2,
  X,
  DollarSign,
  CreditCard,
  Smartphone,
  ShoppingBag,
  ChefHat,
  Tag,
  AlertCircle,
  Coffee,
  Check,
  Layers
} from 'lucide-react';

export const OfflinePosTerminal: React.FC = () => {
  const {
    lang,
    tables,
    updateTable,
    menu,
    createOfflineOrder,
    orders
  } = useStore();

  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [isTakeawayMode, setIsTakeawayMode] = useState(false);
  const [isPosModalOpen, setIsPosModalOpen] = useState(false);

  // POS Active Order State
  const [posCart, setPosCart] = useState<CartItem[]>([]);
  const [posGuestCount, setPosGuestCount] = useState<number>(2);
  const [posWaiterName, setPosWaiterName] = useState<string>('রাকিব (Rakib)');
  const [posKitchenNotes, setPosKitchenNotes] = useState<string>('');
  const [posDiscount, setPosDiscount] = useState<number>(0);
  const [posPaymentMethod, setPosPaymentMethod] = useState<'cash' | 'bkash' | 'card'>('cash');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchDishQuery, setSearchDishQuery] = useState<string>('');

  // Receipt / KOT Print Modal
  const [printModalData, setPrintModalData] = useState<{
    order: Partial<Order>;
    tableInfo?: RestaurantTable | null;
    isKOT?: boolean;
  } | null>(null);

  // Metrics
  const totalTables = tables.length;
  const occupiedTables = tables.filter((t) => t.status === 'occupied').length;
  const billingTables = tables.filter((t) => t.status === 'billing').length;
  const vacantTables = tables.filter((t) => t.status === 'vacant').length;

  // Filtered tables
  const filteredTables = tables.filter((t) => {
    if (areaFilter === 'all') return true;
    return t.area === areaFilter;
  });

  // Filtered menu dishes for POS
  const filteredDishes = menu.filter((item) => {
    const matchesCat =
      activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
    const q = searchDishQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.banglaName.toLowerCase().includes(q);
    return item.isAvailable && matchesCat && matchesSearch;
  });

  // Calculations for current POS Cart
  const posSubtotal = posCart.reduce((sum, item) => {
    const basePrice = item.selectedPortion ? item.selectedPortion.price : item.menuItem.price;
    const addonSum = item.selectedAddons.reduce((s, a) => s + a.price, 0);
    return sum + (basePrice + addonSum) * item.quantity;
  }, 0);

  const posTotal = Math.max(0, posSubtotal - posDiscount);

  // Handlers for POS Cart
  const handleAddDishToPos = (dish: MenuItem) => {
    setPosCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.menuItem.id === dish.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        return [
          ...prev,
          {
            id: `pos-${dish.id}-${Date.now()}`,
            menuItem: dish,
            quantity: 1,
            selectedAddons: []
          }
        ];
      }
    });
  };

  const handleUpdatePosQty = (dishId: string, delta: number) => {
    setPosCart((prev) =>
      prev
        .map((item) => {
          if (item.menuItem.id === dishId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromPos = (dishId: string) => {
    setPosCart((prev) => prev.filter((item) => item.menuItem.id !== dishId));
  };

  // Open POS for a Table
  const handleOpenTablePos = (table: RestaurantTable) => {
    setSelectedTable(table);
    setIsTakeawayMode(false);
    setPosGuestCount(table.guestCount || table.capacity || 2);
    setPosWaiterName(table.waiterName || 'রাকিব (Rakib)');
    setPosDiscount(0);
    setPosPaymentMethod('cash');

    // If table already has an active order in store, load items
    if (table.activeOrderId) {
      const existingOrder = orders.find((o) => o.id === table.activeOrderId);
      if (existingOrder) {
        setPosCart([...existingOrder.items]);
        setPosDiscount(existingOrder.discount || 0);
        setPosKitchenNotes(existingOrder.notes || '');
      } else {
        // Preload sample items representing running meal
        const sampleBiryani = menu.find((m) => m.id === 'special-kacchi-biryani') || menu[0];
        const sampleBorhani = menu.find((m) => m.id === 'shahi-borhani') || menu[1];
        setPosCart([
          { id: 'p1', menuItem: sampleBiryani, quantity: 2, selectedAddons: [] },
          { id: 'p2', menuItem: sampleBorhani, quantity: 2, selectedAddons: [] }
        ]);
      }
    } else {
      setPosCart([]);
      setPosKitchenNotes('');
    }

    setIsPosModalOpen(true);
  };

  // Open POS for Takeaway
  const handleOpenTakeawayPos = () => {
    setSelectedTable(null);
    setIsTakeawayMode(true);
    setPosCart([]);
    setPosGuestCount(1);
    setPosWaiterName('কাউন্টার ক্যাশিয়ার');
    setPosDiscount(0);
    setPosKitchenNotes('');
    setIsPosModalOpen(true);
  };

  // Save Order as Occupied / Ongoing Dining
  const handleSaveOngoingTable = () => {
    if (!selectedTable) return;
    if (posCart.length === 0) {
      alert('অনুগ্রহ করে অন্তত একটি খাবার মেনু থেকে যোগ করুন!');
      return;
    }

    const orderId = selectedTable.activeOrderId || `POS-${Math.floor(1000 + Math.random() * 9000)}`;

    updateTable(selectedTable.id, {
      status: 'occupied',
      activeOrderId: orderId,
      guestCount: posGuestCount,
      waiterName: posWaiterName,
      occupiedAt: selectedTable.occupiedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setIsPosModalOpen(false);
  };

  // Mark Table as Billing Ready
  const handleMarkTableBilling = (tableId: string) => {
    updateTable(tableId, { status: 'billing' });
  };

  // Settle Bill & Make Table Vacant
  const handleSettleAndVacant = () => {
    if (posCart.length === 0) {
      alert('অর্ডারে কোনো খাবার নেই!');
      return;
    }

    const created = createOfflineOrder({
      customerName: selectedTable ? `ডাইন-ইন (${selectedTable.banglaName})` : 'কাউন্টার পার্সেল টেক-অ্যাওয়ে',
      phone: 'Walk-in Guest',
      orderType: selectedTable ? 'dine_in' : 'pickup',
      orderSource: 'offline_pos',
      tableNumber: selectedTable ? selectedTable.id : undefined,
      waiterName: posWaiterName,
      items: posCart,
      subtotal: posSubtotal,
      discount: posDiscount,
      deliveryFee: 0,
      total: posTotal,
      paymentMethod: posPaymentMethod,
      paymentStatus: 'paid',
      status: 'delivered',
      notes: posKitchenNotes
    });

    if (selectedTable) {
      updateTable(selectedTable.id, {
        status: 'vacant',
        activeOrderId: undefined,
        guestCount: undefined,
        waiterName: undefined,
        occupiedAt: undefined
      });
    }

    // Show printable invoice
    setPrintModalData({
      order: created,
      tableInfo: selectedTable,
      isKOT: false
    });

    setIsPosModalOpen(false);
  };

  // Free table directly
  const handleDirectVacantTable = (tableId: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই টেবিলটি খালি করতে চান?')) {
      updateTable(tableId, {
        status: 'vacant',
        activeOrderId: undefined,
        guestCount: undefined,
        waiterName: undefined,
        occupiedAt: undefined
      });
    }
  };

  // Print KOT (Kitchen Order Ticket)
  const handlePrintKOT = () => {
    if (posCart.length === 0) {
      alert('রান্নাঘরে পাঠানোর জন্য আইটেম যোগ করুন!');
      return;
    }

    setPrintModalData({
      order: {
        id: selectedTable?.activeOrderId || `KOT-${Math.floor(1000 + Math.random() * 9000)}`,
        items: posCart,
        notes: posKitchenNotes,
        waiterName: posWaiterName,
        createdAt: new Date().toISOString()
      },
      tableInfo: selectedTable,
      isKOT: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Executive Floor Status Summary */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-md">
                <UtensilsCrossed className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-xl text-slate-800 flex items-center gap-2">
                  <span>রেস্তোরাঁ অফলাইন পিওএস ও টেবিল বিলিং টার্মিনাল</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-sans text-xs font-bold">
                    Executive POS Live
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  ডাইন-ইন টেবিল ট্র্যাকিং, কিচেন টোকেন (KOT), দ্রুত কাউন্টার পার্সেল ও ক্যাশ রেজিস্টার
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenTakeawayPos}
              className="px-5 py-3 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-brand-gold" />
              <span>🛍️ কাউন্টার টেক-অ্যাওয়ে / পার্সেল অর্ডার</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">মোট টেবিল ও কেবিন</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{totalTables}টি</p>
            <p className="text-[10px] text-slate-400 mt-0.5">গ্রাউন্ড ফ্লোর, কেবিন ও হল</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">চলমান ভোজন (Occupied)</p>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            </div>
            <p className="text-2xl font-black text-amber-900 mt-1">{occupiedTables}টি টেবিলে খাবার চলছে</p>
            <p className="text-[10px] text-amber-700 mt-0.5">রান্নাঘর থেকে পরিবেশন সম্পন্ন</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <p className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">বিল প্রস্তুত (Billing)</p>
            <p className="text-2xl font-black text-blue-900 mt-1">{billingTables}টি বিল রেডি</p>
            <p className="text-[10px] text-blue-700 mt-0.5">ক্যাশ বা কার্ড সংগ্রহ করুন</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">খালি সিট (Vacant)</p>
            <p className="text-2xl font-black text-emerald-900 mt-1">{vacantTables}টি টেবিল খালি</p>
            <p className="text-[10px] text-emerald-700 mt-0.5">গেস্ট বসানোর জন্য প্রস্তুত</p>
          </div>
        </div>
      </div>

      {/* Area Filtering Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
          {[
            { id: 'all', label: `সকল টেবিল (${totalTables})` },
            { id: 'Standard Dining', label: 'স্ট্যান্ডার্ড ডাইনিং (গ্রাউন্ড ফ্লোর)' },
            { id: 'VIP Private Cabin', label: 'ভিআইপি প্রাইভেট কেবিন' },
            { id: 'Family Hall', label: 'গ্র্যান্ড ফ্যামিলি হল' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAreaFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                areaFilter === tab.id
                  ? 'bg-brand-primary text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Floor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTables.map((table) => {
          const isOccupied = table.status === 'occupied';
          const isBilling = table.status === 'billing';
          const isVacant = table.status === 'vacant';

          return (
            <div
              key={table.id}
              className={`p-5 rounded-3xl border-2 transition-all duration-200 shadow-xs flex flex-col justify-between ${
                isOccupied
                  ? 'bg-amber-50/70 border-amber-300 shadow-amber-100'
                  : isBilling
                  ? 'bg-blue-50/70 border-blue-300 shadow-blue-100'
                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Table Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-slate-800">{table.banglaName}</h3>
                      <span className="text-xs font-mono font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {table.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>সর্বোচ্চ ধারণক্ষমতা: {table.capacity} জন</span>
                      <span className="text-slate-300">•</span>
                      <span>{table.area}</span>
                    </p>
                  </div>

                  {/* Status Pill */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      isOccupied
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : isBilling
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isOccupied
                          ? 'bg-amber-500 animate-pulse'
                          : isBilling
                          ? 'bg-blue-500 animate-pulse'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <span>
                      {isOccupied ? 'ভোজন চলছে' : isBilling ? 'বিল প্রস্তুত' : 'সিট খালি আছে'}
                    </span>
                  </span>
                </div>

                {/* Table Live Details if Occupied or Billing */}
                {(isOccupied || isBilling) && (
                  <div className="mt-4 p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-1.5 text-xs text-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        বর্তমান গেস্ট:
                      </span>
                      <span className="font-bold">{table.guestCount || 2} জন</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-1">
                        <ChefHat className="w-3.5 h-3.5 text-slate-400" />
                        টেবিল পরিবেশক:
                      </span>
                      <span className="font-bold">{table.waiterName || 'রাকিব'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        বসার সময়:
                      </span>
                      <span className="font-semibold text-slate-600">{table.occupiedAt || '12:45 PM'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center gap-2">
                {isVacant ? (
                  <button
                    onClick={() => handleOpenTablePos(table)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>গেস্ট বসান ও অর্ডার শুরু করুন</span>
                  </button>
                ) : isOccupied ? (
                  <>
                    <button
                      onClick={() => handleOpenTablePos(table)}
                      className="flex-1 py-2 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>খাবার যোগ</span>
                    </button>
                    <button
                      onClick={() => handleMarkTableBilling(table.id)}
                      className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition cursor-pointer"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>বিল রেডি</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleOpenTablePos(table)}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition cursor-pointer"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>পেমেন্ট সংগ্রহ ও খালি</span>
                    </button>
                    <button
                      onClick={() => handleDirectVacantTable(table.id)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition"
                      title="সরাসরি খালি করুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* POS Touchscreen Billing Modal */}
      {isPosModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* POS Header Bar */}
            <div className="bg-brand-primary text-white p-4 sm:px-6 flex items-center justify-between border-b border-brand-dark">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-gold">
                  {isTakeawayMode ? <ShoppingBag className="w-5 h-5" /> : <UtensilsCrossed className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                    <span>{isTakeawayMode ? '🛍️ কাউন্টার টেক-অ্যাওয়ে পার্সেল বিলিং' : `🍽️ ${selectedTable?.banglaName}`}</span>
                    {!isTakeawayMode && (
                      <span className="text-xs bg-brand-gold text-brand-dark px-2 py-0.5 rounded-md font-mono font-bold">
                        {selectedTable?.id}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-brand-cream/70">
                    রেস্তোরাঁ ক্যাশ কাউন্টার ও টাচস্ক্রিন পিওএস সিস্টেম
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPosModalOpen(false)}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* POS Body Grid: 60% Menu Dishes | 40% Running Bill */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              {/* Left Column: Menu Dishes (7 Cols) */}
              <div className="lg:col-span-7 p-4 sm:p-6 border-r border-slate-200 flex flex-col overflow-hidden bg-slate-50/50">
                {/* Search & Category Filter */}
                <div className="space-y-3 pb-3 border-b border-slate-200">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={searchDishQuery}
                      onChange={(e) => setSearchDishQuery(e.target.value)}
                      placeholder="খাবারের নাম লিখে দ্রুত খুঁজুন (যেমন: কাচ্চি, বোরহানি, রোস্ট)..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {[
                      { id: 'all', label: 'সকল' },
                      { id: 'Biryani', label: 'কাচ্চি ও বিরিয়ানি' },
                      { id: 'Main Dish', label: 'রোস্ট ও রেজালা' },
                      { id: 'Appetizer', label: 'কাবাব ও প্ল্যাটার' },
                      { id: 'Beverage', label: 'বোরহানি' },
                      { id: 'Dessert', label: 'ফিরনি ও মিষ্টি' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                          activeCategory === cat.id
                            ? 'bg-brand-primary text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dishes Grid */}
                <div className="flex-1 overflow-y-auto py-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {filteredDishes.map((dish) => {
                    const inCartCount = posCart.find((i) => i.menuItem.id === dish.id)?.quantity || 0;

                    return (
                      <button
                        key={dish.id}
                        onClick={() => handleAddDishToPos(dish)}
                        className={`p-2.5 rounded-2xl border text-left transition duration-150 relative flex flex-col justify-between group cursor-pointer ${
                          inCartCount > 0
                            ? 'bg-amber-50/60 border-amber-300 ring-1 ring-amber-300'
                            : 'bg-white border-slate-200 hover:border-brand-primary hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-xs text-slate-800 line-clamp-1">
                              {dish.banglaName}
                            </p>
                            <p className="text-xs font-black text-brand-primary mt-1">
                              ৳{dish.price}
                            </p>
                          </div>
                        </div>

                        {inCartCount > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 bg-brand-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                            {inCartCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Order Summary & Bill Pad (5 Cols) */}
              <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between bg-white overflow-y-auto">
                <div>
                  {/* Table Context Configuration */}
                  <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase">গেস্ট সংখ্যা</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={posGuestCount}
                        onChange={(e) => setPosGuestCount(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase">পরিবেশক (Waiter)</label>
                      <select
                        value={posWaiterName}
                        onChange={(e) => setPosWaiterName(e.target.value)}
                        className="w-full mt-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800"
                      >
                        <option value="রাকিব (Rakib)">রাকিব (Rakib)</option>
                        <option value="সুমন (Sumon)">সুমন (Sumon)</option>
                        <option value="সাইফুল (Saiful)">সাইফুল (Head Waiter)</option>
                        <option value="কাউন্টার ক্যাশিয়ার">কাউন্টার ক্যাশিয়ার</option>
                      </select>
                    </div>
                  </div>

                  {/* Items Order List */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-2">
                      <span>নির্বাচিত খাবার ({posCart.length}টি)</span>
                      <span>পরিমাণ ও মূল্য</span>
                    </div>

                    {posCart.length === 0 ? (
                      <div className="py-10 text-center text-slate-400">
                        <UtensilsCrossed className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p className="text-xs">মেনু থেকে খাবারে ট্যাপ করে এই টেবিলে যোগ করুন</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {posCart.map((item) => {
                          const itemTotal = item.menuItem.price * item.quantity;

                          return (
                            <div
                              key={item.menuItem.id}
                              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="font-bold text-xs text-slate-800 truncate">
                                  {item.menuItem.banglaName}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                  ৳{item.menuItem.price} x {item.quantity} = ৳{itemTotal}
                                </p>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => handleUpdatePosQty(item.menuItem.id, -1)}
                                  className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold w-5 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdatePosQty(item.menuItem.id, 1)}
                                  className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleRemoveFromPos(item.menuItem.id)}
                                  className="p-1 text-slate-400 hover:text-red-500 transition"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Kitchen Special Instructions */}
                  <div className="mt-3">
                    <input
                      type="text"
                      value={posKitchenNotes}
                      onChange={(e) => setPosKitchenNotes(e.target.value)}
                      placeholder="রান্নাঘরের বিশেষ নোট (যেমন: ঝাল কম, লেবু ও সালাদ আলাদা)..."
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    />
                  </div>
                </div>

                {/* Bill Totals & Payment Section */}
                <div className="mt-4 pt-3 border-t border-slate-200 space-y-3">
                  {/* Totals Breakdown */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>সাবটোটাল</span>
                      <span className="font-bold">৳{posSubtotal}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>বিশেষ ছাড় / ডিসকাউন্ট</span>
                      <div className="flex items-center gap-1">
                        <span>- ৳</span>
                        <input
                          type="number"
                          min="0"
                          value={posDiscount}
                          onChange={(e) => setPosDiscount(Number(e.target.value))}
                          className="w-16 px-2 py-0.5 rounded border border-slate-200 text-right font-bold text-xs"
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-black text-brand-primary">
                      <span>সর্বমোট প্রদেয়</span>
                      <span>৳{posTotal}</span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      মূল্য পরিশোধের মাধ্যম
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'cash', label: '💵 ক্যাশ', icon: DollarSign },
                        { id: 'bkash', label: '📱 বিকাশ / নগদ', icon: Smartphone },
                        { id: 'card', label: '💳 কার্ড / POS', icon: CreditCard }
                      ].map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setPosPaymentMethod(pm.id as any)}
                          className={`py-1.5 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1 ${
                            posPaymentMethod === pm.id
                              ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>{pm.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handlePrintKOT}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <ChefHat className="w-4 h-4 text-amber-600" />
                      <span>🖨️ KOT কিচেন প্রিন্ট</span>
                    </button>

                    {!isTakeawayMode && (
                      <button
                        type="button"
                        onClick={handleSaveOngoingTable}
                        className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>টেবিল চলমান রাখুন</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleSettleAndVacant}
                      className={`py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer ${
                        isTakeawayMode ? 'col-span-2' : 'col-span-2'
                      }`}
                    >
                      <Receipt className="w-4 h-4" />
                      <span>
                        {isTakeawayMode
                          ? 'বিল পরিশোধ ও রসিদ প্রিন্ট করুন'
                          : 'বিল সংগ্রহ ও টেবিল খালি করুন (Settle & Vacant)'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Printable Thermal Receipt / KOT Modal */}
      {printModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-brand-primary" />
                <span>{printModalData.isKOT ? 'কিচেন অর্ডার টিকিট (KOT)' : 'কাস্টমার পেমেন্ট ইনভয়েস'}</span>
              </h4>
              <button
                onClick={() => setPrintModalData(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Thermal Receipt Preview */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs text-slate-800 space-y-2">
              <div className="text-center pb-2 border-b border-dashed border-slate-300">
                <p className="font-black text-sm uppercase tracking-wider">SARINDA RESTAURANT</p>
                <p className="text-[10px] text-slate-500">CK Ghosh Road, Mymensingh</p>
                <p className="text-[10px] text-slate-500">Hotline: +880 1712-121434</p>
                {printModalData.isKOT ? (
                  <p className="mt-1 font-bold text-xs bg-amber-200 text-amber-900 py-0.5 rounded">
                    *** KITCHEN ORDER TICKET (KOT) ***
                  </p>
                ) : (
                  <p className="mt-1 font-bold text-[11px] text-emerald-800">
                    *** OFFICIAL CASH RECEIPT ***
                  </p>
                )}
              </div>

              <div className="text-[11px] space-y-0.5">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-bold">{printModalData.order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Table / Type:</span>
                  <span className="font-bold">
                    {printModalData.tableInfo
                      ? `${printModalData.tableInfo.name} (${printModalData.tableInfo.id})`
                      : 'Takeaway Counter'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Server / Waiter:</span>
                  <span>{printModalData.order.waiterName || 'Staff'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date().toLocaleString()}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="pt-2 border-t border-dashed border-slate-300 space-y-1">
                {printModalData.order.items?.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <span>
                      {it.quantity}x {it.menuItem.banglaName || it.menuItem.name}
                    </span>
                    {!printModalData.isKOT && <span>৳{it.menuItem.price * it.quantity}</span>}
                  </div>
                ))}
              </div>

              {printModalData.order.notes && (
                <div className="p-1.5 bg-yellow-50 text-amber-900 text-[10px] rounded border border-yellow-200">
                  <strong>Kitchen Note:</strong> {printModalData.order.notes}
                </div>
              )}

              {!printModalData.isKOT && (
                <div className="pt-2 border-t border-dashed border-slate-300 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳{printModalData.order.subtotal}</span>
                  </div>
                  {Number(printModalData.order.discount) > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount:</span>
                      <span>-৳{printModalData.order.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-black text-xs border-t border-slate-300 pt-1">
                    <span>Total Paid:</span>
                    <span>৳{printModalData.order.total}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Paid Via:</span>
                    <span className="uppercase">{printModalData.order.paymentMethod || 'CASH'}</span>
                  </div>
                </div>
              )}

              <div className="text-center pt-2 border-t border-dashed border-slate-300 text-[10px] text-slate-400">
                ধন্যবাদ! আবার আসবেন।
              </div>
            </div>

            {/* Print Trigger Button */}
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্টারে পাঠান (Print)</span>
              </button>
              <button
                onClick={() => setPrintModalData(null)}
                className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflinePosTerminal;
