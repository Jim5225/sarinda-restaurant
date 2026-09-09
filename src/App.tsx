import React, { useState } from 'react';
import { useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustIndicators } from './components/TrustIndicators';
import { PopularHorizontal } from './components/PopularHorizontal';
import { SignatureHighlight } from './components/SignatureHighlight';
import { MenuSection } from './components/MenuSection';
import { OffersSection } from './components/OffersSection';
import { StorySection } from './components/StorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals and Overlays
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { SearchModal } from './components/SearchModal';
import { AiAssistant } from './components/AiAssistant';
import { MobileStickyBar } from './components/MobileStickyBar';
import { AdminPortal } from './components/AdminPortal';

export const App: React.FC = () => {
  const { activeTab, isReservationOpen, setIsReservationOpen } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // If Admin portal is activated
  if (activeTab === 'admin') {
    return <AdminPortal />;
  }

  return (
    <div className="min-h-screen flex flex-col relative pb-16 md:pb-0">
      
      {/* Main Header */}
      <Header />

      {/* Main Content Areas */}
      <main className="flex-1">
        <Hero />
        <TrustIndicators />
        <PopularHorizontal />
        <SignatureHighlight />
        <MenuSection />
        <OffersSection />
        <StorySection />
        <ReviewsSection />
        <GallerySection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer onProceedCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <ProductDetailModal />
      <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />
      <SearchModal />
      <AiAssistant />
      <MobileStickyBar />

    </div>
  );
};
export default App;
