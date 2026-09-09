import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../data/translations';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, Phone, AlertCircle, X } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const { lang, createReservation } = useStore();
  const t = translations[lang];

  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('7:30 PM');
  const [guestsCount, setGuestsCount] = useState(4);
  const [seatingArea, setSeatingArea] = useState<Reservation['seatingArea']>('Family Hall');
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [bookingResult, setBookingResult] = useState<Reservation | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const timeSlots = [
    '12:30 PM', '1:30 PM', '2:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:15 PM'
  ];

  const seatingOptions: Reservation['seatingArea'][] = [
    'Family Hall',
    'Standard Dining',
    'VIP Private Cabin',
    'Rooftop Terrace'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your name' : 'অনুগ্রহ করে আপনার নাম দিন');
      return;
    }
    if (!phone.trim() || phone.trim().length < 11) {
      setErrorMsg(lang === 'en' ? 'Please enter a valid phone number' : 'সঠিক মোবাইল নম্বর দিন');
      return;
    }

    setErrorMsg('');

    const res = createReservation({
      guestName: guestName.trim(),
      phone: phone.trim(),
      date,
      time,
      guestsCount,
      seatingArea,
      specialRequest: specialRequest.trim() || undefined
    });

    setBookingResult(res);
  };

  const handleClose = () => {
    setBookingResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-brand-border flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-brand-border flex items-center justify-between bg-brand-cream/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-brand-primary">
                {bookingResult ? (lang === 'en' ? 'Booking Confirmed!' : 'বুকিং সফল হয়েছে!') : t.reserveTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-brand-charcoal/70 hover:bg-brand-cream transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {bookingResult ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-leaf flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                  {lang === 'en' ? 'Table Reserved' : 'টেবিল সংরক্ষিত'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-primary">
                  Ref: #{bookingResult.id}
                </h3>
                <p className="text-xs text-brand-muted mt-1">
                  {lang === 'en'
                    ? 'Your table reservation request has been received. Our floor manager will call shortly to confirm.'
                    : 'আপনার টেবিল বুকিং অনুরোধ গৃহীত হয়েছে। আমাদের ফ্লোর ম্যানেজার দ্রুত কল করে নিশ্চিত করবেন।'}
                </p>
              </div>

              {/* Reservation card info */}
              <div className="bg-brand-cream/40 rounded-2xl p-4 border border-brand-border text-left space-y-2 text-xs">
                <div className="flex justify-between pb-1.5 border-b border-brand-border">
                  <span className="text-brand-muted">{lang === 'en' ? 'Guest Name' : 'অতিথির নাম'}:</span>
                  <span className="font-bold text-brand-charcoal">{bookingResult.guestName}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-brand-border">
                  <span className="text-brand-muted">{lang === 'en' ? 'Date & Time' : 'তারিখ ও সময়'}:</span>
                  <span className="font-bold text-brand-primary">{bookingResult.date} at {bookingResult.time}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-brand-border">
                  <span className="text-brand-muted">{lang === 'en' ? 'Guests' : 'অতিথির সংখ্যা'}:</span>
                  <span className="font-bold text-brand-charcoal">{bookingResult.guestsCount} Persons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">{lang === 'en' ? 'Seating' : 'বসার স্থান'}:</span>
                  <span className="font-bold text-brand-leaf">{bookingResult.seatingArea}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="w-full py-3.5 rounded-2xl bg-brand-primary text-white font-bold text-sm shadow-md hover:bg-brand-dark transition cursor-pointer"
                >
                  {lang === 'en' ? 'Done' : 'সম্পন্ন'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Date and Guests row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                    {t.date} *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                    {t.guests} *
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'} {num >= 6 ? '(Family/Group)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1.5">
                  {t.timeSlot} *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition cursor-pointer ${
                        time === slot
                          ? 'bg-brand-primary text-white shadow-xs'
                          : 'bg-brand-cream/40 text-brand-charcoal border border-brand-border hover:bg-brand-cream'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1.5">
                  {t.seatingPreference}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {seatingOptions.map((area) => (
                    <button
                      type="button"
                      key={area}
                      onClick={() => setSeatingArea(area)}
                      className={`p-2.5 rounded-xl text-xs font-bold text-left transition border cursor-pointer ${
                        seatingArea === area
                          ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                          : 'bg-white border-brand-border text-brand-charcoal hover:bg-brand-cream'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Mahbubul Alam"
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

              {/* Special Request */}
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                  {t.specialRequests}
                </label>
                <input
                  type="text"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g. Birthday decor or high chair needed' : 'যেমন: জন্মদিনের আয়োজন বা বেবি চেয়ার দরকার'}
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-cream/40 border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer"
              >
                {t.confirmBooking}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
