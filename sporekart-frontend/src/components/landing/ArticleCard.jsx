import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export default function ArticleCard({ article }) {
  const { title, summary, category, readTime, imageUrl } = article;

  return (
    <article className="card-base group flex flex-col justify-between h-full bg-white border-[#E1E5DA] hover:border-[#1F4D35] transition">
      <div>
        {/* Cover Image */}
        <div className="relative h-[180px] overflow-hidden bg-[#F3F4ED]">
          <img
            src={imageUrl || 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-[#173B2A] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {category || 'GUIDE'}
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-[12px] text-[#7C857D] mb-2">
            <Clock className="w-3.5 h-3.5 text-[#1F4D35]" />
            <span>{readTime || '5 min read'}</span>
          </div>

          <h3 className="font-bold text-[17px] text-[#172019] group-hover:text-[#1F4D35] transition-colors leading-snug line-clamp-2">
            {title}
          </h3>

          <p className="text-[14px] text-[#59645B] mt-2 leading-[1.5] line-clamp-2">
            {summary}
          </p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="px-5 pb-5 pt-2 border-t border-[#E1E5DA]/60">
        <button
          onClick={() => alert(`Opening guide: "${title}"`)}
          className="btn-text"
        >
          <span>Read Guide</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}
