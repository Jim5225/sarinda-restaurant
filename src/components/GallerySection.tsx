import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { GALLERY_IMAGES } from '../data/initialData';
import { Sparkles, Camera } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { lang } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Food' | 'Ambiance' | 'Dessert'>('All');

  const filteredImages = selectedFilter === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === selectedFilter);

  return (
    <section id="gallery" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5 text-brand-accent" />
            <span>{lang === 'en' ? 'Visual Experience' : 'ফটোগ্রাফি ও স্মৃতি'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary">
            {lang === 'en' ? 'Sarinda Through The Lens' : 'সারিন্দার এক ঝলক'}
          </h2>
          <p className="text-sm sm:text-base text-brand-muted mt-2">
            {lang === 'en'
              ? 'Mouthwatering dishes, elegant dining halls, and joyful moments captured at our restaurant.'
              : 'আসল খাবারের রূপ, আরামদায়ক পরিবেশ এবং প্রিয়জনদের সাথে কাটানো বিশেষ মুহূর্তসমূহ।'}
          </p>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2 mt-6">
            {(['All', 'Food', 'Ambiance', 'Dessert'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'bg-brand-cream text-brand-charcoal hover:bg-brand-border'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition duration-500 cursor-pointer"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-gold">
                    {img.category}
                  </span>
                  <h4 className="font-serif text-white font-bold text-lg mt-0.5">
                    {img.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
