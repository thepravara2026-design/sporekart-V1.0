import React, { useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import ProductCard from '../../features/catalog/components/ProductCard';

export default function FeaturedProducts({ products = [], onAddToCart, onBuyNow }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filterCategories = [
    'ALL',
    'Fresh Mushrooms',
    'Dry Mushrooms',
    'Spawn Seeds',
    'Mushroom Growing Kits',
    'Training & Support',
  ];

  const filtered = selectedCategory === 'ALL'
    ? products
    : products.filter((p) => p.category === selectedCategory || (p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase())));

  return (
    <section id="featured-products" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E1E5DA]">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          eyebrow="POPULAR FROM SPOREKART"
          title="Featured Products"
          subtitle="Everything you need to grow, cook and explore mushrooms."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-150 border ${
                selectedCategory === cat
                  ? 'bg-[#1F4D35] text-white border-[#1F4D35] shadow-xs'
                  : 'bg-[#FCFCF8] text-[#59645B] border-[#E1E5DA] hover:border-[#1F4D35] hover:text-[#172019]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
