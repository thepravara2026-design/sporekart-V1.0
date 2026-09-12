import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProductCard from './features/catalog/components/ProductCard';
import TrainingCard from './features/training/components/TrainingCard';
import CartDrawer from './features/cart/components/CartDrawer';
import DeferredAuthModal from './features/auth/components/DeferredAuthModal';
import Button from './components/ui/Button';
import Badge from './components/ui/Badge';

import { Sprout, ShieldCheck, Truck, Award, Lock, Trash2, ArrowRight, CheckCircle2, User, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog'); // catalog | training | profile
  const [user, setUser] = useState(null); // null = Guest, object = Authenticated User
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTriggerSource, setAuthTriggerSource] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Product Catalog
  const products = [
    {
      id: 1,
      title: 'Oyster Mushroom Liquid Culture Syringe (10ml)',
      category: 'Spores',
      price: 499,
      mrp: 699,
      rating: 4.9,
      reviewsCount: 128,
      imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80',
      inStock: true,
    },
    {
      id: 2,
      title: 'Autoclaved Grain Spawn Bag with Injection Port (1.5 kg)',
      category: 'Substrates',
      price: 299,
      mrp: 399,
      rating: 4.8,
      reviewsCount: 94,
      imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80',
      inStock: true,
    },
    {
      id: 3,
      title: 'Sterile Laminar Flow Hood Filter Unit H14',
      category: 'Lab Equipment',
      price: 12499,
      mrp: 14999,
      rating: 5.0,
      reviewsCount: 31,
      imageUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=600&q=80',
      inStock: true,
    },
    {
      id: 4,
      title: 'Complete Shiitake Mushroom Growing Kit (Fruit in 7 Days)',
      category: 'Kits',
      price: 899,
      mrp: 1199,
      rating: 4.7,
      reviewsCount: 210,
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
      inStock: true,
    },
  ];

  // Training Batches
  const trainingBatches = [
    {
      id: 101,
      title: 'Advanced Mycology & Tissue Culture Mastery',
      status: 'FEATURED',
      startDate: '2026-10-01',
      duration: '3 Days',
      mode: 'Sterile Lab Workshop',
      seatsRemaining: '8 remaining',
      fee: 4999,
      level: 'Intermediate to Advanced',
    },
    {
      id: 102,
      title: 'Commercial Shiitake & Button Farming Workshop',
      status: 'ACTIVE',
      startDate: '2026-09-20',
      duration: '2 Days',
      mode: 'Farm Field & Practical',
      seatsRemaining: '3 remaining',
      fee: 3499,
      level: 'All Levels',
    },
    {
      id: 103,
      title: 'Basic Mushroom Cultivation & Spawn Setup 101',
      status: 'COMPLETED',
      startDate: '2026-08-15',
      duration: '2 Days',
      mode: 'Online Live & Kit',
      seatsRemaining: 'Completed',
      fee: 1999,
      level: 'Beginner',
    },
  ];

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product);
    if (!user) {
      setAuthTriggerSource(`Checkout: ${product.title}`);
      setIsAuthModalOpen(true);
    }
  };

  const handleRegisterBatch = (batch) => {
    if (!user) {
      setAuthTriggerSource(`Enrollment: ${batch.title}`);
      setIsAuthModalOpen(true);
    } else {
      alert(`Successfully registered for ${batch.title}! Payment link dispatched.`);
    }
  };

  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#17231D]">
      {/* Header Layout Component */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        user={user}
        onLogout={() => setUser(null)}
        onOpenAuthModal={() => { setAuthTriggerSource('Sign In Button'); setIsAuthModalOpen(true); }}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      {/* Main Body Content */}
      <main className="flex-1">
        {/* HERO SECTION (Section 17 Design System) */}
        {activeTab === 'catalog' && (
          <section className="bg-gradient-to-b from-[#F6F1E7] to-[#FAFAF7] border-b border-[#DDE2DC] py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[#234D3C]/10 text-[#234D3C] border border-[#234D3C]/20 rounded-full inline-block">
                  SPOREKART CULTIVATION & COMMERCE
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#17231D] leading-tight">
                  Grow Better. <br />
                  <span className="text-[#234D3C]">Harvest Smarter.</span>
                </h1>
                <p className="text-base sm:text-lg text-[#536057] leading-relaxed max-w-xl">
                  Certified sterile mycelium liquid cultures, autoclaved grain spawn, growing kits, and expert cultivation training for Indian growers.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button variant="primary" size="lg" icon={ArrowRight} onClick={() => setActiveTab('catalog')}>
                    Shop Products
                  </Button>
                  <Button variant="secondary" size="lg" icon={Sprout} onClick={() => setActiveTab('training')}>
                    Explore Training
                  </Button>
                </div>
              </div>

              {/* Hero Feature Visual */}
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#DDE2DC]">
                <img
                  src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=80"
                  alt="Mushroom Cultivation"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111713]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs font-semibold text-[#7A8F5A] block">100% Sterile Lab Guarantee</span>
                    <p className="font-bold text-lg">Tested Cultivation Cultures & Kits</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TRUST STRIP (Section 18 Design System) */}
        <section className="bg-white border-b border-[#DDE2DC] py-6 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs text-[#536057]">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#234D3C]" />
              <span className="font-semibold">Lab Certified Spores</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-5 h-5 text-[#234D3C]" />
              <span className="font-semibold">Shiprocket Express Logistics</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#234D3C]" />
              <span className="font-semibold">Razorpay Verified Payments</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-[#234D3C]" />
              <span className="font-semibold">PDF Certificate Generation</span>
            </div>
          </div>
        </section>

        {/* CATALOG CONTENT */}
        {activeTab === 'catalog' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#7A8F5A] uppercase block">Product Catalog</span>
                <h2 className="font-serif text-3xl font-bold text-[#17231D] mt-1">Cultivation Supplies & Kits</h2>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {['ALL', 'Spores', 'Substrates', 'Kits', 'Lab Equipment'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${
                      selectedCategory === cat
                        ? 'bg-[#234D3C] text-white border-[#234D3C]'
                        : 'bg-white text-[#536057] border-[#DDE2DC] hover:border-[#234D3C]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid (4 columns desktop, 2 columns mobile Section 42) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                />
              ))}
            </div>
          </section>
        )}

        {/* TRAINING CONTENT */}
        {activeTab === 'training' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="mb-8">
              <span className="text-xs font-bold tracking-wider text-[#7A8F5A] uppercase block">Practical Workshops</span>
              <h2 className="font-serif text-3xl font-bold text-[#17231D] mt-1">Cultivation & Biotech Training Batches</h2>
              <p className="text-sm text-[#536057] mt-1">Hands-on cultivation workshops led by experienced mycologists. Authentication deferred until batch selection.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trainingBatches.map((b) => (
                <TrainingCard key={b.id} batch={b} onRegister={handleRegisterBatch} />
              ))}
            </div>
          </section>
        )}

        {/* USER PROFILE CONTENT */}
        {activeTab === 'profile' && user && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#7A8F5A] uppercase block">Account Dashboard</span>
              <h2 className="font-serif text-3xl font-bold text-[#17231D] mt-1">User Profile & Settings</h2>
            </div>

            {/* Immutable Identity Card */}
            <div className="card-base p-6 border-[#234D3C]/30 bg-white">
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#DDE2DC]">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#234D3C]" />
                  <h3 className="font-bold text-lg text-[#17231D]">Immutable User Identity</h3>
                </div>
                <Badge variant="warning">
                  <Lock className="w-3 h-3 inline" /> Locked Attribute Guard
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-[#FAFAF7] p-4 rounded-md border border-[#DDE2DC]">
                <div>
                  <span className="text-xs text-[#7A847D] block">First & Last Name</span>
                  <p className="font-semibold text-[#17231D]">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <span className="text-xs text-[#7A847D] block">Assigned Role</span>
                  <p className="font-semibold text-[#234D3C]">{user.role}</p>
                </div>
                <div>
                  <span className="text-xs text-[#7A847D] block">Mobile Phone</span>
                  <p className="font-semibold text-[#17231D]">{user.phoneNumber}</p>
                </div>
                <div>
                  <span className="text-xs text-[#7A847D] block">Email ID</span>
                  <p className="font-semibold text-[#17231D]">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Certificate Card */}
            <div className="card-base p-6 bg-white">
              <h3 className="font-bold text-lg text-[#17231D] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#234D3C]" /> Training History & Certificates
              </h3>
              <div className="bg-[#FAFAF7] p-4 rounded-md border border-[#DDE2DC] flex items-center justify-between gap-4">
                <div>
                  <Badge variant="neutral" className="mb-1">COMPLETED</Badge>
                  <h4 className="font-semibold text-sm text-[#17231D]">Basic Mushroom Cultivation 101</h4>
                  <span className="text-xs text-[#536057]">Completed on 2026-08-30</span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => alert("Downloading PDF Certificate from SporeKart Backend...")}
                >
                  Download PDF Certificate
                </Button>
              </div>
            </div>

            {/* Self-Service Account Deletion */}
            <div className="card-base p-6 border-[#C44747]/30 bg-[#FCEBEC]/30">
              <h3 className="font-bold text-lg text-[#C44747] mb-1 flex items-center gap-2">
                <Trash2 className="w-5 h-5" /> Delete Account (Self-Service)
              </h3>
              <p className="text-xs text-[#536057] mb-4">
                Direct account deletion under Settings. Admins have zero deletion override control over user accounts.
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to permanently delete your SporeKart account?")) {
                    setUser(null);
                    setActiveTab('catalog');
                    alert("Account permanently self-deleted.");
                  }
                }}
              >
                Permanently Delete Account
              </Button>
            </div>
          </section>
        )}
      </main>

      {/* Footer Layout Component */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(id, qty) => {
          setCartItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity: qty } : item));
        }}
        onRemoveItem={(id) => {
          setCartItems((prev) => prev.filter((item) => item.id !== id));
        }}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          if (!user) {
            setAuthTriggerSource('Checkout Cart Summary');
            setIsAuthModalOpen(true);
          } else {
            alert("Proceeding to Razorpay payment gateway...");
          }
        }}
      />

      {/* Passwordless Deferred Auth Modal */}
      <DeferredAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        triggerSource={authTriggerSource}
        onSuccessLogin={(loggedInUser) => {
          setUser(loggedInUser);
        }}
      />
    </div>
  );
}
