import React from 'react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { ShoppingCart, Star, Bell } from 'lucide-react';

export default function ProductCard({ product = {}, onAddToCart, onBuyNow }) {
  const title = product.title || 'Mushroom Product';
  const category = product.category || 'Spores';
  const price = product.price ?? 0;
  const mrp = product.mrp;
  const rating = product.rating ?? 4.8;
  const reviewsCount = product.reviewsCount ?? 42;
  const imageUrl = product.imageUrl || 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80';
  const inStock = product.inStock !== false;
  const badge = product.badge;
  const benefit = product.benefit || 'Certified sterile culture with high colonization speed.';

  const discountPercent = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <article className="card-base group flex flex-col justify-between h-full bg-white border-[#E1E5DA] hover:border-[#1F4D35] transition-all duration-200">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-[#F3F4ED] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Single Meaningful Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {!inStock ? (
            <Badge variant="warning">OUT OF STOCK</Badge>
          ) : badge ? (
            <Badge variant="gold">{badge}</Badge>
          ) : discountPercent > 0 ? (
            <Badge variant="success">SALE {discountPercent}% OFF</Badge>
          ) : (
            <Badge variant="brand">{category}</Badge>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-[16px] text-[#172019] group-hover:text-[#1F4D35] transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>

          {/* Short Product Benefit */}
          <p className="text-[13px] text-[#59645B] mt-1.5 line-clamp-2 leading-relaxed">
            {benefit}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-[13px] text-[#59645B] mt-2.5">
            <Star className="w-4 h-4 fill-[#C79A4A] text-[#C79A4A]" />
            <span className="font-bold text-[#172019]">{rating}</span>
            <span className="text-[#7C857D]">({reviewsCount})</span>
          </div>
        </div>

        {/* Price & Primary Action */}
        <div className="mt-4 pt-3 border-t border-[#E1E5DA]">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-[22px] font-bold text-[#172019]">
              ₹{Number(price).toLocaleString('en-IN')}
            </span>
            {mrp && mrp > price && (
              <span className="text-[14px] text-[#7C857D] line-through font-normal">
                ₹{Number(mrp).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {inStock ? (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon={ShoppingCart}
                onClick={() => onAddToCart && onAddToCart(product)}
              >
                Add
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onBuyNow && onBuyNow(product)}
              >
                Buy Now
              </Button>
            </div>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              icon={Bell}
              onClick={() => alert(`We will notify you when ${title} is back in stock!`)}
              className="w-full"
            >
              Notify Me
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
