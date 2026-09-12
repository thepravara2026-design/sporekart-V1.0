import React from 'react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const { title, category, price, mrp, rating, reviewsCount, imageUrl, inStock } = product;

  const discountPercent = mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <article className="card-base group flex flex-col justify-between h-full bg-white hover:border-[#234D3C]/40">
      {/* Product Image Area - 4:3 Aspect Ratio */}
      <div className="relative aspect-[4/3] bg-[#F4F4EF] overflow-hidden">
        <img
          src={imageUrl || 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge variant="brand">{category}</Badge>
          {discountPercent > 0 && (
            <Badge variant="success">{discountPercent}% OFF</Badge>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-[#536057] mb-1">
            <Star className="w-3.5 h-3.5 fill-[#C89B3C] text-[#C89B3C]" />
            <span className="font-semibold text-[#17231D]">{rating || '4.9'}</span>
            <span>({reviewsCount || 42})</span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-base text-[#17231D] group-hover:text-[#234D3C] transition line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Price & Action Area */}
        <div className="mt-4 pt-3 border-t border-[#DDE2DC]">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-[#17231D]">
              ₹{price.toLocaleString('en-IN')}
            </span>
            {mrp && (
              <span className="text-sm text-[#7A847D] line-through">
                ₹{mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={ShoppingCart}
              onClick={() => onAddToCart(product)}
            >
              Add
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onBuyNow(product)}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
