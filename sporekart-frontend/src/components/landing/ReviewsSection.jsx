import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, UserCheck } from 'lucide-react';
import Badge from '../ui/Badge';
import { landingService } from '../../services/landingService';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function loadReviews() {
      const data = await landingService.getReviews();
      if (data && data.length > 0) {
        setReviews(data);
      } else {
        setReviews([
          {
            id: 1,
            reviewerName: 'Ramesh Kumar',
            reviewerLocation: 'Bengaluru, Karnataka',
            rating: 5,
            title: 'Exceptional Liquid Culture Viability',
            comment: 'The Oyster mushroom liquid culture syringe had 100% colonization speed in my grain spawn bags within 6 days. Best sterile lab quality in India.',
            isVerifiedGrower: true,
          },
          {
            id: 2,
            reviewerName: 'Dr. Anita Deshmukh',
            reviewerLocation: 'Pune, Maharashtra',
            rating: 5,
            title: 'Top Tier Commercial Training',
            comment: 'Attended the 3-Day Advanced Mycology & Tissue Culture workshop. The practical lab training and PDF certificate were invaluable for setting up my commercial farm.',
            isVerifiedGrower: true,
          },
          {
            id: 3,
            reviewerName: 'Siddharth Patel',
            reviewerLocation: 'Ahmedabad, Gujarat',
            rating: 5,
            title: 'Reliable Shiprocket Logistics',
            comment: 'Ordered laminar flow filters and spawn bags. Delivered via Shiprocket in perfect condition in 3 days. Extremely satisfied.',
            isVerifiedGrower: true,
          },
        ]);
      }
    }
    loadReviews();
  }, []);

  return (
    <section id="reviews" className="py-20 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider text-[#7A8F5A] uppercase block">VERIFIED GROWER REVIEWS</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231D] mt-2">
            Trusted by Commercial Mycologists & Home Growers
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#C89B3C] text-[#C89B3C]" />
            ))}
            <span className="text-sm font-bold text-[#17231D] ml-2">4.9 / 5.0 Rating Across 500+ Orders</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="card-base p-6 bg-white border-[#DDE2DC] flex flex-col justify-between hover:border-[#234D3C]/40 transition">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C89B3C] text-[#C89B3C]" />
                    ))}
                  </div>
                  {r.isVerifiedGrower && (
                    <Badge variant="success">
                      <UserCheck className="w-3 h-3 inline" /> Verified Grower
                    </Badge>
                  )}
                </div>

                <h4 className="font-bold text-base text-[#17231D] mb-2">{r.title}</h4>
                <p className="text-xs text-[#536057] leading-relaxed italic mb-6">"{r.comment}"</p>
              </div>

              <div className="pt-3 border-t border-[#DDE2DC] flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-sm text-[#17231D]">{r.reviewerName}</h5>
                  <span className="text-[11px] text-[#7A847D]">{r.reviewerLocation}</span>
                </div>
                <ShieldCheck className="w-5 h-5 text-[#234D3C]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
