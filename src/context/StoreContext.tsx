import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, Order, Reservation, Offer, Addon } from '../types';
import { INITIAL_MENU_ITEMS, INITIAL_OFFERS } from '../data/initialData';

interface StoreContextType {
  lang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Menu
  menu: MenuItem[];
  toggleItemAvailability: (id: string) => void;
  updateMenuItem: (item: MenuItem) => void;
  addMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, selectedAddons?: Addon[], notes?: string) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartDiscount: number;
  cartTotal: number;

  // Offers
  offers: Offer[];
  appliedOffer: Offer | null;
  applyOffer: (code: string) => { success: boolean; message: string };
  removeOffer: () => void;

  // Orders
  orders: Order[];
  createOrder: (data: {
    customerName: string;
    phone: string;
    address: string;
    orderType: 'delivery' | 'pickup' | 'dine_in';
    paymentMethod: 'cod' | 'bkash' | 'nagad';
    notes?: string;
  }) => Order;
  updateOrderStatus: (id: string, status: Order['status']) => void;

  // Reservations
  reservations: Reservation[];
  createReservation: (data: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => Reservation;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;

  // Modals & UI States
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  detailItem: MenuItem | null;
  setDetailItem: (item: MenuItem | null) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
  isAiChatOpen: boolean;
  setIsAiChatOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<'en' | 'bn'>(() => {
    return (localStorage.getItem('sarinda_lang') as 'en' | 'bn') || 'en';
  });

  const [activeTab, setActiveTab] = useState<string>('home');

  // Menu State
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('sarinda_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sarinda_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Offers State
  const [offers] = useState<Offer[]>(INITIAL_OFFERS);
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(() => {
    const saved = localStorage.getItem('sarinda_applied_offer');
    return saved ? JSON.parse(saved) : null;
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sarinda_orders');
    if (saved) return JSON.parse(saved);
    // Initial mock order for admin overview
    return [
      {
        id: 'ORD-8921',
        customerName: 'Ashfaqul Karim',
        phone: '01711223344',
        address: 'House 14, Road 7, Dhanmondi, Dhaka',
        orderType: 'delivery',
        items: [
          {
            id: 'kacchi-special-1',
            menuItem: INITIAL_MENU_ITEMS[0],
            quantity: 2,
            selectedAddons: [INITIAL_MENU_ITEMS[0].addons![0]]
          }
        ],
        subtotal: 900,
        discount: 135,
        deliveryFee: 60,
        total: 825,
        paymentMethod: 'bkash',
        paymentStatus: 'paid',
        status: 'preparing',
        notes: 'Please pack extra salad if possible',
        createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString()
      },
      {
        id: 'ORD-8920',
        customerName: 'Samira Huq',
        phone: '01819556677',
        address: 'Banani Block C, Road 11, Dhaka',
        orderType: 'delivery',
        items: [
          {
            id: 'royal-platter-1',
            menuItem: INITIAL_MENU_ITEMS[10],
            quantity: 1,
            selectedAddons: []
          }
        ],
        subtotal: 990,
        discount: 0,
        deliveryFee: 60,
        total: 1050,
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        status: 'on_delivery',
        createdAt: new Date(Date.now() - 70 * 60 * 1000).toISOString()
      }
    ];
  });

  // Reservations State
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('sarinda_reservations');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'RES-3412',
        guestName: 'Rashidul Hasan',
        phone: '01788990011',
        email: 'rashid@gmail.com',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '8:00 PM',
        guestsCount: 6,
        seatingArea: 'VIP Private Cabin',
        specialRequest: 'Family birthday celebration. Please arrange a quiet corner.',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
    ];
  });

  // UI Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sarinda_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('sarinda_menu', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem('sarinda_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sarinda_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sarinda_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    if (appliedOffer) {
      localStorage.setItem('sarinda_applied_offer', JSON.stringify(appliedOffer));
    } else {
      localStorage.removeItem('sarinda_applied_offer');
    }
  }, [appliedOffer]);

  // Cart Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    const itemPrice = item.menuItem.price;
    const addonsTotal = item.selectedAddons.reduce((acc, addon) => acc + addon.price, 0);
    return sum + (itemPrice + addonsTotal) * item.quantity;
  }, 0);

  const cartDeliveryFee = cart.length > 0 ? 60 : 0;

  const cartDiscount = appliedOffer && cartSubtotal >= appliedOffer.minOrder
    ? Math.min(Math.round((cartSubtotal * appliedOffer.discountPercent) / 100), appliedOffer.maxDiscount)
    : 0;

  const cartTotal = Math.max(0, cartSubtotal + cartDeliveryFee - cartDiscount);

  // Cart Actions
  const addToCart = (
    item: MenuItem,
    quantity: number = 1,
    selectedAddons: Addon[] = [],
    notes?: string
  ) => {
    setCart((prev) => {
      // Check if exact same item with exact same addons already exists
      const addonIdsKey = selectedAddons.map(a => a.id).sort().join(',');
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.menuItem.id === item.id &&
          ci.selectedAddons.map(a => a.id).sort().join(',') === addonIdsKey &&
          (ci.notes || '') === (notes || '')
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            id: `${item.id}-${Date.now()}`,
            menuItem: item,
            quantity,
            selectedAddons,
            notes
          }
        ];
      }
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedOffer(null);
  };

  // Promo Code
  const applyOffer = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = offers.find(o => o.code.toUpperCase() === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try SARINDA15 or FAMILY20' };
    }
    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Minimum order of ৳${found.minOrder} required for code ${found.code}.`
      };
    }
    setAppliedOffer(found);
    return { success: true, message: `Code ${found.code} applied! Saved discount.` };
  };

  const removeOffer = () => {
    setAppliedOffer(null);
  };

  // Order Placement
  const createOrder = (data: {
    customerName: string;
    phone: string;
    address: string;
    orderType: 'delivery' | 'pickup' | 'dine_in';
    paymentMethod: 'cod' | 'bkash' | 'nagad';
    notes?: string;
  }): Order => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: data.customerName,
      phone: data.phone,
      address: data.address,
      orderType: data.orderType,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: data.orderType === 'delivery' ? cartDeliveryFee : 0,
      total: data.orderType === 'delivery' ? cartTotal : Math.max(0, cartSubtotal - cartDiscount),
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'pending',
      notes: data.notes,
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  // Reservations
  const createReservation = (data: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Reservation => {
    const newReservation: Reservation = {
      ...data,
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status } : res))
    );
  };

  // Menu Admin
  const toggleItemAvailability = (id: string) => {
    setMenu((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenu((prev) =>
      prev.map((m) => (m.id === item.id ? item : m))
    );
  };

  const addMenuItem = (item: MenuItem) => {
    setMenu((prev) => [item, ...prev]);
  };

  const deleteMenuItem = (id: string) => {
    setMenu((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        lang,
        setLang,
        activeTab,
        setActiveTab,
        menu,
        toggleItemAvailability,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDeliveryFee,
        cartDiscount,
        cartTotal,
        offers,
        appliedOffer,
        applyOffer,
        removeOffer,
        orders,
        createOrder,
        updateOrderStatus,
        reservations,
        createReservation,
        updateReservationStatus,
        isCartOpen,
        setIsCartOpen,
        detailItem,
        setDetailItem,
        isReservationOpen,
        setIsReservationOpen,
        isSearchOpen,
        setIsSearchOpen,
        lastOrder,
        setLastOrder,
        isAiChatOpen,
        setIsAiChatOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
