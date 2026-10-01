import React from 'react';
import { useStore } from './context/StoreContext';

// Restaurant Components (Existing Feature Complete)
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustIndicators } from './components/TrustIndicators';
import { SarindaAiBanner } from './components/SarindaAiBanner';
import { PopularHorizontal } from './components/PopularHorizontal';
import { SignatureHighlight } from './components/SignatureHighlight';
import { MenuSection } from './components/MenuSection';
import { OffersSection } from './components/OffersSection';
import { StorySection } from './components/StorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Sarinda Group Hub Components
import { GroupHeader } from './components/group/GroupHeader';
import { GroupHero } from './components/group/GroupHero';
import { VenturesGrid } from './components/group/VenturesGrid';
import { ResortFeatureSection } from './components/group/ResortFeatureSection';
import { RestaurantBridgeSection } from './components/group/RestaurantBridgeSection';
import { BakeryFeatureSection } from './components/group/BakeryFeatureSection';
import { SorgoromFeatureSection } from './components/group/SorgoromFeatureSection';
import { LightsFeatureSection } from './components/group/LightsFeatureSection';
import { GroupTimelineSection } from './components/group/GroupTimelineSection';
import { GroupLeadershipSection } from './components/group/GroupLeadershipSection';
import { GroupBranchesSection } from './components/group/GroupBranchesSection';
import { GroupFooter } from './components/group/GroupFooter';
import { GroupInquiryModal } from './components/group/GroupInquiryModal';

// Dedicated Concern Sub-pages
import { SobariResortPage } from './components/group/views/SobariResortPage';
import { BakeryPage } from './components/group/views/BakeryPage';
import { SorgoromPage } from './components/group/views/SorgoromPage';
import { LightsPage } from './components/group/views/LightsPage';

// Shared Modals and Overlays
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { SearchModal } from './components/SearchModal';
import { AiAssistant } from './components/AiAssistant';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileStickyBar } from './components/MobileStickyBar';
import { AdminPortal } from './components/AdminPortal';

export const App: React.FC = () => {
  const { 
    activeTab, 
    currentView, 
    isReservationOpen, 
    setIsReservationOpen, 
    isCheckoutOpen, 
    setIsCheckoutOpen 
  } = useStore();

  // If Admin portal is activated
  if (activeTab === 'admin') {
    return <AdminPortal />;
  }

  // Dedicated Concern Sub-Pages
  if (currentView === 'resort') {
    return (
      <>
        <SobariResortPage />
        <GroupFooter />
        <GroupInquiryModal />
        <WhatsAppButton />
      </>
    );
  }

  if (currentView === 'bakery') {
    return (
      <>
        <BakeryPage />
        <GroupFooter />
        <GroupInquiryModal />
        <WhatsAppButton />
      </>
    );
  }

  if (currentView === 'sorgorom') {
    return (
      <>
        <SorgoromPage />
        <GroupFooter />
        <GroupInquiryModal />
        <WhatsAppButton />
      </>
    );
  }

  if (currentView === 'lights') {
    return (
      <>
        <LightsPage />
        <GroupFooter />
        <GroupInquiryModal />
        <WhatsAppButton />
      </>
    );
  }

  // If Restaurant View is selected (The complete interactive ordering app)
  if (currentView === 'restaurant') {
    return (
      <div className="min-h-screen flex flex-col relative pb-16 md:pb-0">
        
        {/* Restaurant Header */}
        <Header />

        {/* Restaurant Main Content Areas */}
        <main className="flex-1">
          <Hero />
          <TrustIndicators />
          <SarindaAiBanner />
          <PopularHorizontal />
          <SignatureHighlight />
          <MenuSection />
          <OffersSection />
          <StorySection />
          <ReviewsSection />
          <GallerySection />
          <ContactSection />
        </main>

        {/* Restaurant Footer */}
        <Footer />

        {/* Global Interactive Overlays */}
        <CartDrawer onProceedCheckout={() => setIsCheckoutOpen(true)} />
        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        <ProductDetailModal />
        <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />
        <SearchModal />
        <AiAssistant />
        <WhatsAppButton />
        <MobileStickyBar />
        <GroupInquiryModal />

      </div>
    );
  }

  // Default: SARINDA GROUP Corporate & Multi-Concern Portal
  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* Group Corporate Header */}
      <GroupHeader />

      {/* Group Hub Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <GroupHero />

        {/* Sister Concerns Portfolio Grid */}
        <VenturesGrid />

        {/* Deep Feature: Sarinda Sobari Resort */}
        <ResortFeatureSection />

        {/* Deep Feature: Sarinda Restaurant & Catering */}
        <RestaurantBridgeSection />

        {/* Deep Feature: Sarinda Bakery & Confectionery */}
        <BakeryFeatureSection />

        {/* Deep Feature: Sorgorom Restaurant & Cafe */}
        <SorgoromFeatureSection />

        {/* Deep Feature: Sarinda Lights & Interior Décor */}
        <LightsFeatureSection />

        {/* Group Timeline & Heritage */}
        <GroupTimelineSection />

        {/* Group Leadership & Values */}
        <GroupLeadershipSection />

        {/* All Locations & Branches Directory */}
        <GroupBranchesSection />
      </main>

      {/* Group Footer */}
      <GroupFooter />

      {/* Global Interactive Overlays */}
      <GroupInquiryModal />
      <CartDrawer onProceedCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <ProductDetailModal />
      <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />
      <SearchModal />
      <AiAssistant />
      <WhatsAppButton />

    </div>
  );
};

export default App;
