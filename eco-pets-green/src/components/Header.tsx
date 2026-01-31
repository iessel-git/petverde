import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Search, ShoppingCart, Heart, User, Menu, X, Leaf, ChevronDown, LogOut } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCategorySelect: (category: string) => void;
  onOpenAuthModal: () => void;
  onOpenAccount: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  onCategorySelect,
  onOpenAuthModal,
  onOpenAccount
}) => {
  const { cartCount, setIsCartOpen, wishlist } = useCart();
  const { user, profile, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navCategories = [
    { name: 'Dogs', id: 'Dog' },
    { name: 'Cats', id: 'Cat' },
    { name: 'Birds', id: 'Bird' },
    { name: 'Fish', id: 'Fish' },
    { name: 'Small Animals', id: 'Small Animal' },
    { name: 'Reptiles', id: 'Reptile' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    setIsShopDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleAccountClick = () => {
    if (user) {
      setIsUserDropdownOpen(!isUserDropdownOpen);
    } else {
      onOpenAuthModal();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
          <Leaf className="w-4 h-4" />
          <span>Free carbon-neutral shipping on orders over $50 | </span>
          <span className="font-semibold">Green Paws Points: Earn 2x this week!</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-emerald-800">PetVerde</h1>
              <p className="text-[10px] text-gray-500 -mt-1">by KC Retail Group</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search eco-friendly products for your pet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-5 pr-12 rounded-full border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition-colors bg-gray-50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Account Button */}
            <div className="relative">
              <button 
                onClick={handleAccountClick}
                className="hidden sm:flex items-center gap-1 text-gray-600 hover:text-emerald-700 transition-colors p-2"
              >
                {user ? (
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-700 font-semibold text-sm">
                      {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <User className="w-6 h-6" />
                )}
                <span className="hidden lg:inline text-sm">
                  {user ? (profile?.full_name?.split(' ')[0] || 'Account') : 'Sign In'}
                </span>
                {user && <ChevronDown className="w-4 h-4" />}
              </button>

              {/* User Dropdown */}
              {user && isUserDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-lg py-2 min-w-[220px] border border-gray-100 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">{profile?.full_name || 'Pet Parent'}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    <div className="flex items-center gap-1 mt-1 text-emerald-600 text-sm">
                      <Leaf className="w-4 h-4" />
                      <span className="font-medium">{profile?.green_paws_points || 0} points</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onOpenAccount();
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      onOpenAccount();
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    My Pets
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            
            <button className="relative text-gray-600 hover:text-emerald-700 transition-colors p-2">
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-600 hover:text-emerald-700 transition-colors p-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-full border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none bg-gray-50"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden md:block border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1">
            <li className="relative">
              <button 
                onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                className="flex items-center gap-1 px-4 py-3 text-gray-700 hover:text-emerald-700 font-medium transition-colors"
              >
                Shop by Pet
                <ChevronDown className={`w-4 h-4 transition-transform ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isShopDropdownOpen && (
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 min-w-[200px] border border-gray-100">
                  {navCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('eco')}
                className="flex items-center gap-1 px-4 py-3 text-emerald-700 font-medium hover:bg-emerald-50 rounded transition-colors"
              >
                <Leaf className="w-4 h-4" />
                Eco-Certified
              </button>
            </li>
            <li>
              <button className="px-4 py-3 text-gray-700 hover:text-emerald-700 font-medium transition-colors">
                Deals
              </button>
            </li>
            <li>
              <button className="px-4 py-3 text-gray-700 hover:text-emerald-700 font-medium transition-colors">
                Subscribe & Save
              </button>
            </li>
            <li>
              <button className="px-4 py-3 text-gray-700 hover:text-emerald-700 font-medium transition-colors">
                Pet Care Blog
              </button>
            </li>
            <li className="ml-auto">
              <button className="px-4 py-3 text-emerald-700 font-medium hover:underline transition-colors">
                Our Green Promise
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Account Section */}
            {user ? (
              <div className="p-3 bg-emerald-50 rounded-lg mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{profile?.full_name || 'Pet Parent'}</p>
                    <div className="flex items-center gap-1 text-emerald-600 text-sm">
                      <Leaf className="w-3 h-3" />
                      <span>{profile?.green_paws_points || 0} points</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      onOpenAccount();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium"
                  >
                    My Account
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium mb-4"
              >
                Sign In / Sign Up
              </button>
            )}

            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Shop by Pet</p>
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded transition-colors"
              >
                {cat.name}
              </button>
            ))}
            <hr className="my-3" />
            <button 
              onClick={() => handleCategoryClick('eco')}
              className="flex items-center gap-2 w-full py-2 px-3 text-emerald-700 font-medium hover:bg-emerald-50 rounded"
            >
              <Leaf className="w-4 h-4" />
              Eco-Certified Products
            </button>
            <button className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded">
              Deals
            </button>
            <button className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded">
              Subscribe & Save
            </button>
            <button className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded">
              Pet Care Blog
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(isShopDropdownOpen || isUserDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsShopDropdownOpen(false);
            setIsUserDropdownOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
