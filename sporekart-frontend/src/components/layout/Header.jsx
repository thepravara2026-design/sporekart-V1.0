import React, { useState } from 'react';
import { ShoppingBag, GraduationCap, Search, User, Menu, X, Sprout } from 'lucide-react';

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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDE2DC] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#234D3C] text-white text-xs py-1.5 px-4 text-center font-medium">
        🌱 Free Shipping across India on orders over ₹1,999 | Certified Sterile Mycelium Spores
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('catalog')}>
          <div className="w-10 h-10 rounded-md bg-[#234D3C] flex items-center justify-center text-white shadow-xs">
            <Sprout className="w-6 h-6 text-[#C89B3C]" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-[#17231D] tracking-tight block leading-none">
              Spore<span className="text-[#234D3C]">Kart</span>
            </span>
            <span className="text-[10px] tracking-widest text-[#7A8F5A] font-bold uppercase block mt-0.5">
              Cultivation & Biotech
            </span>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-6 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search spawn bags, liquid cultures, kits, or training..."
            className="w-full bg-[#F4F4EF] border border-[#DDE2DC] focus:border-[#234D3C] rounded-md py-2.5 pl-10 pr-4 text-sm text-[#17231D] placeholder-[#7A847D] outline-none focus:ring-2 focus:ring-[#234D3C]/20 transition"
          />
          <Search className="w-4 h-4 text-[#7A847D] absolute left-3.5 top-3" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onTabChange('catalog')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
              activeTab === 'catalog'
                ? 'bg-[#F6F1E7] text-[#234D3C] border border-[#234D3C]/30'
                : 'text-[#536057] hover:text-[#17231D] hover:bg-[#F4F4EF]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 inline mr-1.5" /> E-Store
          </button>

          <button
            onClick={() => onTabChange('training')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
              activeTab === 'training'
                ? 'bg-[#F6F1E7] text-[#234D3C] border border-[#234D3C]/30'
                : 'text-[#536057] hover:text-[#17231D] hover:bg-[#F4F4EF]'
            }`}
          >
            <GraduationCap className="w-4 h-4 inline mr-1.5" /> Training
          </button>

          {user && (
            <button
              onClick={() => onTabChange('profile')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                activeTab === 'profile'
                  ? 'bg-[#F6F1E7] text-[#234D3C] border border-[#234D3C]/30'
                  : 'text-[#536057] hover:text-[#17231D] hover:bg-[#F4F4EF]'
              }`}
            >
              <User className="w-4 h-4 inline mr-1.5" /> Account
            </button>
          )}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Cart Icon Button */}
          <button
            onClick={onToggleCart}
            aria-label="View Shopping Cart"
            className="w-11 h-11 rounded-md border border-[#DDE2DC] hover:border-[#234D3C] bg-white flex items-center justify-center relative text-[#17231D] hover:bg-[#F4F4EF] transition"
          >
            <ShoppingBag className="w-5 h-5 text-[#234D3C]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C44747] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth Action */}
          {user ? (
            <button
              onClick={onLogout}
              className="hidden sm:inline-flex text-xs font-semibold text-[#536057] hover:text-[#C44747] px-3 py-2 border border-[#DDE2DC] rounded-md hover:bg-[#FCEBEC] transition"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="hidden sm:inline-flex text-xs font-semibold bg-[#234D3C] text-white px-3.5 py-2.5 rounded-md hover:bg-[#1B3D30] transition shadow-xs"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center border border-[#DDE2DC] rounded-md text-[#17231D]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#DDE2DC] bg-white px-4 py-4 space-y-3">
          <button
            onClick={() => { onTabChange('catalog'); setMobileMenuOpen(false); }}
            className="w-full text-left font-semibold py-2.5 px-3 rounded-md hover:bg-[#F4F4EF] flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5 text-[#234D3C]" /> E-Commerce Catalog
          </button>
          <button
            onClick={() => { onTabChange('training'); setMobileMenuOpen(false); }}
            className="w-full text-left font-semibold py-2.5 px-3 rounded-md hover:bg-[#F4F4EF] flex items-center gap-2"
          >
            <GraduationCap className="w-5 h-5 text-[#234D3C]" /> Cultivation Training
          </button>

          {user ? (
            <button
              onClick={() => { onTabChange('profile'); setMobileMenuOpen(false); }}
              className="w-full text-left font-semibold py-2.5 px-3 rounded-md hover:bg-[#F4F4EF] flex items-center gap-2"
            >
              <User className="w-5 h-5 text-[#234D3C]" /> User Profile ({user.firstName})
            </button>
          ) : (
            <button
              onClick={() => { onOpenAuthModal(); setMobileMenuOpen(false); }}
              className="w-full btn-primary mt-2"
            >
              Sign In / Register
            </button>
          )}
        </div>
      )}
    </header>
  );
}
