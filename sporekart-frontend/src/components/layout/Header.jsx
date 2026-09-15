import React, { useState } from 'react';
import { ShoppingBag, GraduationCap, Search, User, Menu, X, Sprout, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

export default function Header({
  activeTab,
  onTabChange,
  cartCount = 0,
  user,
  onLogout,
  onOpenAuthModal,
  onToggleCart,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (sectionId, tabName) => {
    onTabChange(tabName);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E1E5DA] shadow-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavClick(null, 'catalog')}>
          <div className="w-9 h-9 rounded-[10px] bg-[#173B2A] flex items-center justify-center text-white shadow-xs">
            <Sprout className="w-5 h-5 text-[#C79A4A]" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-[#172019] tracking-tight block leading-none">
              Spore<span className="text-[#1F4D35]">Kart</span>
            </span>
            <span className="text-[10px] tracking-widest text-[#607D52] font-bold uppercase block mt-0.5">
              Mushroom Ecosystem
            </span>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-6 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search spawn, fresh mushrooms, kits, or training..."
            className="w-full bg-[#F3F4ED] border border-[#E1E5DA] focus:border-[#1F4D35] rounded-[12px] py-2 pl-9 pr-4 text-sm text-[#172019] placeholder-[#7C857D] outline-none focus:ring-2 focus:ring-[#1F4D35]/15 transition-all"
          />
          <Search className="w-4 h-4 text-[#7C857D] absolute left-3 top-2.5" />
        </div>

        {/* Desktop Navigation Links (Section 10 Design System) */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-[#59645B]">
          <button
            onClick={() => handleNavClick('featured-products', 'catalog')}
            className="px-3 py-2 rounded-[8px] hover:text-[#172019] hover:bg-[#F3F4ED] transition"
          >
            Shop
          </button>
          <button
            onClick={() => handleNavClick('product-categories', 'catalog')}
            className="px-3 py-2 rounded-[8px] hover:text-[#172019] hover:bg-[#F3F4ED] transition"
          >
            Mushrooms
          </button>
          <button
            onClick={() => handleNavClick('product-categories', 'catalog')}
            className="px-3 py-2 rounded-[8px] hover:text-[#172019] hover:bg-[#F3F4ED] transition"
          >
            Spawn
          </button>
          <button
            onClick={() => handleNavClick('product-categories', 'catalog')}
            className="px-3 py-2 rounded-[8px] hover:text-[#172019] hover:bg-[#F3F4ED] transition"
          >
            Kits
          </button>
          <button
            onClick={() => handleNavClick('training-section', 'training')}
            className={`px-3 py-2 rounded-[8px] transition ${
              activeTab === 'training'
                ? 'text-[#1F4D35] font-semibold bg-[#F6F2E8]'
                : 'hover:text-[#172019] hover:bg-[#F3F4ED]'
            }`}
          >
            Training
          </button>
          <button
            onClick={() => handleNavClick('why-sporekart', 'catalog')}
            className="px-3 py-2 rounded-[8px] hover:text-[#172019] hover:bg-[#F3F4ED] transition"
          >
            About
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Cart Counter */}
          <button
            onClick={onToggleCart}
            aria-label="View Shopping Cart"
            className="w-10 h-10 rounded-[10px] border border-[#E1E5DA] hover:border-[#1F4D35] bg-white flex items-center justify-center relative text-[#172019] hover:bg-[#F3F4ED] transition shadow-xs"
          >
            <ShoppingBag className="w-4 h-4 text-[#1F4D35]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#1F4D35] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth / Account */}
          {user ? (
            <button
              onClick={() => handleNavClick(null, 'profile')}
              className="hidden sm:inline-flex text-xs font-semibold text-[#173B2A] bg-[#F6F2E8] border border-[#173B2A]/20 px-3 py-2 rounded-[10px] hover:bg-[#EBDCC5] transition"
            >
              Account ({user.firstName})
            </button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenAuthModal}
              className="hidden sm:inline-flex"
            >
              Login
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center border border-[#E1E5DA] rounded-[10px] text-[#172019]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E1E5DA] bg-white px-4 py-4 space-y-2 font-medium text-sm text-[#172019]">
          <button
            onClick={() => handleNavClick('featured-products', 'catalog')}
            className="w-full text-left py-2.5 px-3 rounded-[8px] hover:bg-[#F3F4ED] flex items-center justify-between"
          >
            <span>Shop Products</span>
            <ChevronRight className="w-4 h-4 text-[#7C857D]" />
          </button>
          <button
            onClick={() => handleNavClick('product-categories', 'catalog')}
            className="w-full text-left py-2.5 px-3 rounded-[8px] hover:bg-[#F3F4ED] flex items-center justify-between"
          >
            <span>Product Categories</span>
            <ChevronRight className="w-4 h-4 text-[#7C857D]" />
          </button>
          <button
            onClick={() => handleNavClick('training-section', 'training')}
            className="w-full text-left py-2.5 px-3 rounded-[8px] hover:bg-[#F3F4ED] flex items-center justify-between"
          >
            <span>Mushroom Training & Workshops</span>
            <ChevronRight className="w-4 h-4 text-[#7C857D]" />
          </button>
          <button
            onClick={() => handleNavClick('why-sporekart', 'catalog')}
            className="w-full text-left py-2.5 px-3 rounded-[8px] hover:bg-[#F3F4ED] flex items-center justify-between"
          >
            <span>About SporeKart</span>
            <ChevronRight className="w-4 h-4 text-[#7C857D]" />
          </button>

          <div className="pt-2 border-t border-[#E1E5DA]">
            {user ? (
              <button
                onClick={() => handleNavClick(null, 'profile')}
                className="w-full btn-secondary text-left py-2.5 px-3"
              >
                My Profile ({user.firstName})
              </button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => { onOpenAuthModal(); setMobileMenuOpen(false); }}
                className="w-full"
              >
                Sign In / Register
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
