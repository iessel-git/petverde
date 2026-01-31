import React, { useState, useRef } from 'react';
import { CartProvider } from '../contexts/CartContext';
import { AuthProvider } from '../contexts/AuthContext';
import Header from './Header';
import Hero from './Hero';
import CategorySection from './CategorySection';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import GreenPromise from './GreenPromise';
import SubscribeSection from './SubscribeSection';
import LoyaltySection from './LoyaltySection';
import BlogPreview from './BlogPreview';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';
import AccountPage from './AccountPage';

const AppLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPetType, setSelectedPetType] = useState('All');
  const [showEcoOnly, setShowEcoOnly] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const productGridRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategorySelect = (category: string) => {
    if (category === 'eco') {
      setShowEcoOnly(true);
      setSelectedPetType('All');
    } else {
      setShowEcoOnly(false);
      setSelectedPetType(category);
    }
    scrollToProducts();
  };

  const handleShopNow = () => {
    setSelectedPetType('All');
    setShowEcoOnly(false);
    scrollToProducts();
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          {/* Header */}
          <Header 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onCategorySelect={handleCategorySelect}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onOpenAccount={() => setIsAccountOpen(true)}
          />

          {/* Hero Section */}
          <Hero onShopNow={handleShopNow} />

          {/* Shop by Pet Categories */}
          <CategorySection onCategorySelect={handleCategorySelect} />

          {/* Featured/Bestselling Products */}
          <FeaturedProducts onViewAll={handleShopNow} />

          {/* Green Promise Section */}
          <GreenPromise />

          {/* All Products Grid with Filters */}
          <div ref={productGridRef}>
            <ProductGrid 
              searchQuery={searchQuery}
              initialPetType={selectedPetType}
              showEcoOnly={showEcoOnly}
            />
          </div>

          {/* Subscribe & Save Section */}
          <SubscribeSection />

          {/* Loyalty Program */}
          <LoyaltySection />

          {/* Testimonials */}
          <Testimonials />

          {/* Blog Preview */}
          <BlogPreview />

          {/* Newsletter */}
          <Newsletter />

          {/* Footer */}
          <Footer />

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Auth Modal */}
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
          />

          {/* Account Page */}
          {isAccountOpen && (
            <AccountPage onClose={() => setIsAccountOpen(false)} />
          )}
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default AppLayout;
