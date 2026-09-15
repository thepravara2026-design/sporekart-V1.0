import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import ArticleCard from './ArticleCard';

export default function EducationSection({ articles = [] }) {
  const defaultArticles = [
    {
      id: 1,
      title: 'How to Start Mushroom Cultivation at Home',
      summary: 'A beginner-friendly step-by-step roadmap to setting up your first sterile growing space.',
      category: 'BEGINNER GUIDE',
      readTime: '5 min read',
      imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      title: 'How to Choose Between Liquid Culture & Grain Spawn',
      summary: 'Learn the difference between mycelium culture syringes and grain spawn bags for optimal yield.',
      category: 'CULTIVATION',
      readTime: '7 min read',
      imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      title: 'Common Mushroom Growing Mistakes & Fixes',
      summary: 'Diagnose green mold, cobweb, over-hydration, and air flow issues before they destroy your flush.',
      category: 'TROUBLESHOOTING',
      readTime: '6 min read',
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      title: 'Setting Up a Budget Still Air Box (SAB) & Clean Space',
      summary: 'Build a sterile working environment for liquid culture inoculation without high lab equipment cost.',
      category: 'LAB SETUP',
      readTime: '8 min read',
      imageUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const list = articles.length > 0 ? articles : defaultArticles;

  return (
    <section id="educational-content" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E1E5DA]">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          eyebrow="LEARN & GROW"
          title="Educational Content & Guides"
          subtitle="Practical mushroom cultivation knowledge, growing tips, and troubleshooting guides."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
