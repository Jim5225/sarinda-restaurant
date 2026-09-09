export interface Addon {
  id: string;
  name: string;
  banglaName: string;
  price: number;
}

export interface PortionVariant {
  id: string;
  name: string;
  banglaName: string;
  price: number;
}

export type MenuCategory = 
  | 'Biryani' 
  | 'Khichuri' 
  | 'Kebab' 
  | 'Meat' 
  | 'Fish' 
  | 'Rice' 
  | 'Vorta & Dal' 
  | 'Naan & Paratha' 
  | 'Kebab Platter' 
  | 'Dessert' 
  | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  banglaName: string;
  category: MenuCategory;
  price: number;
  originalPrice?: number;
  portionNote?: string;
  banglaPortionNote?: string;
  portions?: PortionVariant[];
  description: string;
  banglaDescription: string;
  image: string;
  isPopular?: boolean;
  isSignature?: boolean;
  isSpicy?: boolean;
  isHalal: boolean;
  calories?: number;
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  prepTime?: string;
  addons?: Addon[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  selectedPortion?: PortionVariant;
  quantity: number;
  selectedAddons: Addon[];
  notes?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  orderType: 'delivery' | 'pickup' | 'dine_in';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  paymentStatus: 'pending' | 'paid';
  status: 'pending' | 'preparing' | 'on_delivery' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface Reservation {
  id: string;
  guestName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guestsCount: number;
  seatingArea: 'Standard Dining' | 'Family Hall' | 'VIP Private Cabin' | 'Rooftop Terrace';
  specialRequest?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  banglaTitle: string;
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minOrder: number;
  validity: string;
  description: string;
  banglaDescription: string;
  image: string;
  badge: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  banglaComment: string;
  date: string;
  dishOrdered: string;
  avatar: string;
}

export type ExpenseCategory = 
  | 'meat_poultry'      // খাসি ও মুরগির মাংস
  | 'rice_spices'       // বাসমতি চাল, পোলাও চাল ও খাঁটি মশলা
  | 'oil_ghee'          // খাঁটি ঘি ও সরিষার তেল
  | 'vegetables_dairy'  // আলু, পেঁয়াজ, টক দই, দুধ
  | 'packaging'         // ফুড বক্স, ক্যারি ব্যাগ, সিলিং
  | 'utilities'         // গ্যাস সিলিন্ডার, বিদ্যুৎ, পানির বিল
  | 'staff_wages'       // কিচেন স্টাফ ও ডেলিভারি শিফট মজুরি
  | 'maintenance'       // ইকুইপমেন্ট ও রেস্তোরাঁ রক্ষণাবেক্ষণ
  | 'other';            // বিবিধ খরচ

export interface DailyExpense {
  id: string;
  title: string;
  banglaTitle?: string;
  category: ExpenseCategory;
  amount: number;
  paymentMethod: 'cash' | 'bkash' | 'bank' | 'credit';
  recordedBy: string;
  date: string; // YYYY-MM-DD
  notes?: string;
}
