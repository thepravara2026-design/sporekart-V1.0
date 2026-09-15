import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/landing/AnnouncementBar';
import Header from './components/layout/Header';
import HeroSection from './components/landing/HeroSection';
import TrustStrip from './components/landing/TrustStrip';
import CategorySection from './components/landing/CategorySection';
import FeaturedProducts from './components/landing/FeaturedProducts';
import WhySporeKartSection from './components/landing/WhySporeKartSection';
import MushroomJourneySection from './components/landing/MushroomJourneySection';
import TrainingSection from './components/landing/TrainingSection';
import HowItWorksSection from './components/landing/HowItWorksSection';
import QualityStorySection from './components/landing/QualityStorySection';
import ReviewsSection from './components/landing/ReviewsSection';
import EducationSection from './components/landing/EducationSection';
import FaqSection from './components/landing/FaqSection';
import FinalCTASection from './components/landing/FinalCTASection';
import ContactSection from './components/landing/ContactSection';
import Footer from './components/layout/Footer';

import CartDrawer from './features/cart/components/CartDrawer';
import DeferredAuthModal from './features/auth/components/DeferredAuthModal';
import Button from './components/ui/Button';
import Badge from './components/ui/Badge';
import MediaUploader from './components/ui/MediaUploader';
import { landingService } from './services/landingService';
import { User, Lock, FileText, Trash2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog'); // catalog | training | profile
  const [user, setUser] = useState(null); // null = Guest, object = Authenticated User
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTriggerSource, setAuthTriggerSource] = useState('');

  // Dynamic Data from Backend API with Clean Initial Fallbacks
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'Oyster Mushroom Liquid Culture Syringe (10ml)',
      category: 'Spawn Seeds',
      price: 399,
      mrp: 599,
      rating: 4.9,
      reviewsCount: 128,
      imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80',
      inStock: true,
      badge: 'BESTSELLER',
      benefit: 'Isolated high-yielding mycelium strain in 10ml sterile syringe.',
    },
    {
      id: 2,
      title: 'Autoclaved Grain Spawn Bag with Injection Port (1.5 kg)',
      category: 'Spawn Seeds',
      price: 299,
      mrp: 399,
      rating: 4.8,
      reviewsCount: 94,
      imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80',
      inStock: true,
      badge: 'POPULAR',
      benefit: 'Hydrated rye grain autoclaved at 15 PSI for 120 minutes.',
    },
    {
      id: 3,
      title: 'Complete Shiitake Mushroom Growing Kit',
      category: 'Mushroom Growing Kits',
      price: 899,
      mrp: 1199,
      rating: 4.7,
      reviewsCount: 210,
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
      inStock: true,
      badge: 'SALE',
      benefit: 'Ready-to-fruit block. Harvest fresh Shiitake in 7 days.',
    },
    {
      id: 4,
      title: 'Farm Fresh White Button Mushrooms (250g)',
      category: 'Fresh Mushrooms',
      price: 149,
      mrp: 199,
      rating: 4.9,
      reviewsCount: 65,
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
      inStock: true,
      badge: 'IN STOCK',
      benefit: 'Hand-harvested organic farm fresh daily for gourmet cooking.',
    },
    {
      id: 5,
      title: 'Premium Dried Reishi Slice Pouch (100g)',
      category: 'Dry Mushrooms',
      price: 699,
      mrp: 899,
      rating: 5.0,
      reviewsCount: 42,
      imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80',
      inStock: true,
      badge: 'NEW',
      benefit: 'Sun-dried organic Ganoderma lucidum slices for tea infusions.',
    },
    {
      id: 6,
      title: 'Sterile Laminar Flow Hood Filter Unit H14',
      category: 'Training & Support',
      price: 12499,
      mrp: 14999,
      rating: 5.0,
      reviewsCount: 31,
      imageUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=600&q=80',
      inStock: true,
      badge: 'PREMIUM',
      benefit: 'ISO-certified 99.99% HEPA unit for clean culture transfers.',
    },
  ]);
  const [educationalGuides, setEducationalGuides] = useState([]);
  const [trainingBatches, setTrainingBatches] = useState([]);

  useEffect(() => {
    async function loadBackendData() {
      const cats = await landingService.getCategories();
      if (cats && cats.length > 0) setCategories(cats);

      const prods = await landingService.getProducts();
      if (prods && prods.length > 0) setProducts(prods);

      const guides = await landingService.getEducationalGuides();
      if (guides && guides.length > 0) setEducationalGuides(guides);

      const batches = await landingService.getTrainingBatches();
      if (batches && batches.length > 0) setTrainingBatches(batches);
    }
    loadBackendData();
  }, []);

  // Cart & Checkout Handlers
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
      alert(`Successfully registered for ${batch.title}! Payment details dispatched.`);
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveTab('catalog');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCF8] text-[#172019] selection:bg-[#173B2A] selection:text-white">
      {/* 01. ANNOUNCEMENT / UTILITY BAR */}
      <AnnouncementBar />

      {/* 02. HEADER / NAVIGATION */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        user={user}
        onLogout={() => setUser(null)}
        onOpenAuthModal={() => { setAuthTriggerSource('Sign In Button'); setIsAuthModalOpen(true); }}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      <main className="flex-1">
        {activeTab !== 'profile' ? (
          <>
            {/* 03. HERO SECTION */}
            <HeroSection
              onShopClick={() => scrollToSection('featured-products')}
              onTrainingClick={() => {
                setActiveTab('training');
                scrollToSection('training-section');
              }}
            />

            {/* 04. TRUST STRIP */}
            <TrustStrip />

            {/* 05. PRODUCT CATEGORIES */}
            <CategorySection
              categories={categories}
              onSelectCategory={(catName) => scrollToSection('featured-products')}
            />

            {/* 06. FEATURED PRODUCTS */}
            <FeaturedProducts
              products={products}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />

            {/* 07. WHY SPOREKART */}
            <WhySporeKartSection
              onAboutClick={() => scrollToSection('quality-story')}
            />

            {/* 08. MUSHROOM JOURNEY */}
            <MushroomJourneySection />

            {/* 09. TRAINING & SUPPORT */}
            <TrainingSection
              batches={trainingBatches}
              onRegisterBatch={handleRegisterBatch}
            />

            {/* 10. HOW IT WORKS */}
            <HowItWorksSection />

            {/* 11. QUALITY / CULTIVATION STORY */}
            <div id="quality-story">
              <QualityStorySection />
            </div>

            {/* 12. TESTIMONIALS */}
            <ReviewsSection />

            {/* 13. EDUCATIONAL CONTENT */}
            <EducationSection articles={educationalGuides} />

            {/* 14. FAQ (ACCORDION) */}
            <FaqSection />

            {/* 15. FINAL CTA */}
            <FinalCTASection
              onShopClick={() => scrollToSection('featured-products')}
              onTrainingClick={() => {
                setActiveTab('training');
                scrollToSection('training-section');
              }}
            />

            {/* ADDITIONAL SUPPORTING CONTACT SECTION */}
            <ContactSection />
          </>
        ) : (
          /* USER PROFILE TAB VIEW */
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
            <div>
              <span className="text-[12px] font-bold tracking-widest text-[#607D52] uppercase block">
                ACCOUNT DASHBOARD
              </span>
              <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#172019] mt-1">
                User Profile & Settings
              </h2>
            </div>

            <div className="card-base p-6 border-[#173B2A]/30 bg-white">
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E1E5DA]">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#1F4D35]" />
                  <h3 className="font-bold text-lg text-[#172019]">Immutable User Identity</h3>
                </div>
                <Badge variant="warning">
                  <Lock className="w-3.5 h-3.5 inline" /> Locked Attribute Guard
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-[#FCFCF8] p-4 rounded-[12px] border border-[#E1E5DA]">
                <div>
                  <span className="text-xs text-[#7C857D] block">First & Last Name</span>
                  <p className="font-semibold text-[#172019]">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <span className="text-xs text-[#7C857D] block">Assigned Role</span>
                  <p className="font-semibold text-[#1F4D35]">{user.role}</p>
                </div>
                <div>
                  <span className="text-xs text-[#7C857D] block">Mobile Phone</span>
                  <p className="font-semibold text-[#172019]">{user.phoneNumber}</p>
                </div>
                <div>
                  <span className="text-xs text-[#7C857D] block">Email ID</span>
                  <p className="font-semibold text-[#172019]">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Supabase Media Storage Uploader Card */}
            <div className="card-base p-6 bg-white">
              <h3 className="font-bold text-lg text-[#172019] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1F4D35]" /> Media & Asset Uploader
              </h3>
              <MediaUploader
                entityType="PRODUCT"
                entityId={1}
                onUploadSuccess={(asset) => {
                  console.log("Uploaded media asset to Supabase Storage:", asset);
                }}
              />
            </div>

            <div className="card-base p-6 bg-white">
              <h3 className="font-bold text-lg text-[#172019] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1F4D35]" /> Training History & Certificates
              </h3>
              <div className="bg-[#FCFCF8] p-4 rounded-[12px] border border-[#E1E5DA] flex items-center justify-between gap-4">
                <div>
                  <Badge variant="brand" className="mb-1">COMPLETED</Badge>
                  <h4 className="font-semibold text-sm text-[#172019]">Basic Mushroom Cultivation 101</h4>
                  <span className="text-xs text-[#59645B]">Completed on 2026-08-30</span>
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

            <div className="card-base p-6 border-[#C44747]/30 bg-[#FCEBEC]/30">
              <h3 className="font-bold text-lg text-[#C44747] mb-1 flex items-center gap-2">
                <Trash2 className="w-5 h-5" /> Delete Account (Self-Service)
              </h3>
              <p className="text-xs text-[#59645B] mb-4">
                Direct account deletion under Settings. Admins have zero deletion override control.
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to permanently delete your SporeKart account?")) {
                    setUser(null);
                    setActiveTab('catalog');
                    alert("Account permanently deleted.");
                  }
                }}
              >
                Permanently Delete Account
              </Button>
            </div>
          </section>
        )}
      </main>

      {/* 16. FOOTER */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />

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
