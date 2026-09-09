import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { X, CheckCircle2, ShoppingBag, Truck, Store, Utensils, MessageCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { lang, cart, cartSubtotal, cartDeliveryFee, cartDiscount, cartTotal, createOrder } = useStore();
  const t = translations[lang];

  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dine_in'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [errorMsg, setErrorMsg] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your name' : 'অনুগ্রহ করে আপনার নাম লিখুন');
      return;
    }
    if (!phone.trim() || phone.trim().length < 11) {
      setErrorMsg(lang === 'en' ? 'Please enter a valid 11-digit phone number' : '১১ ডিজিটের সঠিক মোবাইল নম্বর দিন');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your delivery address' : 'ডেলিভারির সম্পূর্ণ ঠিকানা দিন');
      return;
    }

    setErrorMsg('');

    const newOrder = createOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: orderType === 'delivery' ? address.trim() : 'Sarinda Restaurant (Dine-in / Pickup)',
      orderType,
      paymentMethod,
      notes: notes.trim() || undefined
    });

    setPlacedOrder(newOrder);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleWhatsAppShare = () => {
    if (!placedOrder) return;
    const itemsList = placedOrder.items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.menuItem.name} (৳${i.menuItem.price * i.quantity})`
      )
      .join('\n');

    const msg = `*Sarinda Restaurant Order Confirmation*\n` +
      `Order ID: ${placedOrder.id}\n` +
      `Customer: ${placedOrder.customerName} (${placedOrder.phone})\n` +
      `Type: ${placedOrder.orderType.toUpperCase()}\n` +
      `Address: ${placedOrder.address}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `Total Payable: ৳${placedOrder.total}\n` +
      `Payment: ${placedOrder.paymentMethod.toUpperCase()}`;

    window.open(`https://wa.me/8801711234567?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const resetAndClose = () => {
    setPlacedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-brand-border flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-brand-border flex items-center justify-between bg-brand-cream/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h2 className="font-serif font-bold text-lg text-brand-primary">
              {placedOrder ? (lang === 'en' ? 'Order Confirmed!' : 'অর্ডার নিশ্চিত হয়েছে!') : t.checkoutTitle}
            </h2>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl text-brand-charcoal/70 hover:bg-brand-cream transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {placedOrder ? (
            /* Order Placed Success View */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-leaf flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  {lang === 'en' ? 'Order Placed Successfully' : 'আপনার অর্ডার গ্রহণ করা হয়েছে'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-primary">
                  Order ID: #{placedOrder.id}
                </h3>
                <p className="text-xs text-brand-muted mt-1">
                  {lang === 'en'
                    ? 'Our kitchen is preparing your feast. Estimated arrival: 30-40 minutes.'
                    : 'আমাদের কিচেনে খাবার প্রস্তুত হচ্ছে। আনুমানিক ৩০-৪০ মিনিটে পৌঁছাবে।'}
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="bg-brand-cream/40 rounded-2xl p-4 border border-brand-border text-left space-y-2 text-xs">
                <div className="flex justify-between pb-2 border-b border-brand-border">
                  <span className="text-brand-muted">{lang === 'en' ? 'Customer' : 'গ্রাহক'}:</span>
                  <span className="font-bold text-brand-charcoal">{placedOrder.customerName} ({placedOrder.phone})</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-brand-border">
                  <span className="text-brand-muted">{lang === 'en' ? 'Address' : 'ঠিকানা'}:</span>
                  <span className="font-bold text-brand-charcoal">{placedOrder.address}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-brand-border">
                  <span className="text-brand-muted">{lang === 'en' ? 'Payment' : 'পেমেন্ট'}:</span>
                  <span className="font-bold uppercase text-brand-primary">{placedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-extrabold text-brand-primary">
                  <span>{lang === 'en' ? 'Total Payable' : 'সর্বমোট প্রদেয়'}:</span>
                  <span>৳{placedOrder.total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Get Order Updates on WhatsApp' : 'হোয়াটসঅ্যাপে অর্ডার কপি পান'}</span>
                </button>

                <button
                  onClick={resetAndClose}
                  className="w-full py-3 rounded-xl bg-brand-primary text-white font-bold text-xs sm:text-sm hover:bg-brand-dark transition cursor-pointer"
                >
                  {lang === 'en' ? 'Back to Restaurant' : 'রেস্তোরাঁয় ফিরে যান'}
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Order Type Selector */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-2">
                  {lang === 'en' ? 'Select Order Type' : 'অর্ডারের ধরন নির্বাচন করুন'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'delivery', label: t.orderTypeDelivery, icon: Truck },
                    { id: 'pickup', label: t.orderTypePickup, icon: Store },
                    { id: 'dine_in', label: t.orderTypeDineIn, icon: Utensils }
                  ].map((type) => {
                    const Icon = type.icon;
                    const isSelected = orderType === type.id;
                    return (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setOrderType(type.id as any)}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                            : 'bg-brand-cream/30 text-brand-charcoal border-brand-border hover:bg-brand-cream'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] font-bold leading-tight">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                    {t.phoneNumber} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>
              </div>

              {/* Delivery Address (only if delivery) */}
              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                    {t.deliveryAddress} *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House, Road, Area, Dhaka (e.g. House 24, Road 4, Dhanmondi)"
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-cream/40 border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>
              )}

              {/* Cooking / Delivery Notes */}
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                  {t.deliveryInstructions}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g. Please ring bell twice or less chili' : 'যেমন: কম ঝাল দেবেন বা কলিং বেল বাজাবেন'}
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-cream/40 border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-2">
                  {t.paymentMethod}
                </label>
                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'bg-brand-primary/5 border-brand-primary'
                        : 'border-brand-border bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-brand-primary focus:ring-brand-primary"
                      />
                      <div>
                        <span className="text-xs font-bold text-brand-charcoal block">
                          {t.cashOnDelivery}
                        </span>
                        <span className="text-[11px] text-brand-muted">
                          {lang === 'en' ? 'Pay with cash upon receipt of food' : 'খাবার হাতে পেয়ে নগদে মূল্য পরিশোধ করুন'}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-leaf">✓ Standard</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'bkash'
                        ? 'bg-pink-50/50 border-pink-500'
                        : 'border-brand-border bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="text-pink-600 focus:ring-pink-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-pink-700 block">
                          bKash Online / QR Payment
                        </span>
                        <span className="text-[11px] text-brand-muted">
                          Merchant: 01712121434 (Send Money / Counter Pay)
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-pink-100 text-pink-700 px-2 py-0.5 rounded">bKash</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'nagad'
                        ? 'bg-orange-50/50 border-orange-500'
                        : 'border-brand-border bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'nagad'}
                        onChange={() => setPaymentMethod('nagad')}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-orange-700 block">
                          Nagad Payment
                        </span>
                        <span className="text-[11px] text-brand-muted">
                          Merchant: 01712121434
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded">Nagad</span>
                  </label>
                </div>
              </div>

              {/* Pricing breakdown summary */}
              <div className="bg-brand-cream/50 rounded-2xl p-3.5 border border-brand-border text-xs space-y-1">
                <div className="flex justify-between text-brand-muted">
                  <span>{t.subtotal} ({cart.length} items)</span>
                  <span>৳{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>{t.deliveryFee}</span>
                  <span>{orderType === 'delivery' ? `৳${cartDeliveryFee}` : 'Free'}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-brand-leaf font-semibold">
                    <span>{t.discount}</span>
                    <span>-৳{cartDiscount}</span>
                  </div>
                )}
                <div className="border-t border-brand-border pt-1.5 flex justify-between font-extrabold text-sm text-brand-primary">
                  <span>{t.grandTotal}</span>
                  <span>
                    ৳{orderType === 'delivery' ? cartTotal : Math.max(0, cartSubtotal - cartDiscount)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer"
              >
                {t.placeOrder}
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
