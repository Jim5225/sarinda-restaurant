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
