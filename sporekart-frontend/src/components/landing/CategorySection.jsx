import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import CategoryCard from './CategoryCard';

export default function CategorySection({ categories = [], onSelectCategory }) {
  const defaultCategories = [
    {
      id: 1,
      name: 'Fresh Mushrooms',
      description: 'Farm-fresh mushroom varieties for your kitchen and culinary dishes.',
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      name: 'Dry Mushrooms',
      description: 'Dehydrated gourmet mushrooms with intense flavor and long shelf life.',
      imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      name: 'Spawn Seeds',
      description: 'Sterile grain spawn bags and liquid culture syringes for high yield.',
      imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      name: 'Mushroom Growing Kits',
      description: 'All-in-one ready-to-fruit growing kits for home and commercial growers.',
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      name: 'Training & Support',
      description: 'Practical workshops, hands-on masterclasses and expert advice.',
      imageUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const list = categories.length > 0 ? categories : defaultCategories;

  return (
    <section id="product-categories" className="bg-[#F6F2E8] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E1E5DA]">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          eyebrow="SHOP SPOREKART"
          title="Product Categories"
          subtitle="Quality products for growing, cooking and exploring mushrooms."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {list.map((cat) => (
            <CategoryCard
              key={cat.id || cat.name}
              category={cat}
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
