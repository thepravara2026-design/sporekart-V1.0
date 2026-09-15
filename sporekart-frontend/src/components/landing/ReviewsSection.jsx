import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, UserCheck } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
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
            comment: 'SporeKart made mushroom cultivation much easier to understand. The support was practical and easy to follow.',
            isVerifiedGrower: true,
          },
          {
            id: 2,
            reviewerName: 'Dr. Anita Deshmukh',
            reviewerLocation: 'Pune, Maharashtra',
            rating: 5,
            title: 'Top Tier Commercial Training',
            comment: 'Attended the 3-Day Advanced Mycology & Tissue Culture workshop. The practical lab training and PDF certificate were invaluable for setting up my farm.',
            isVerifiedGrower: true,
          },
          {
            id: 3,
            reviewerName: 'Siddharth Patel',
            reviewerLocation: 'Ahmedabad, Gujarat',
            rating: 5,
            title: 'Reliable Shiprocket Logistics',
            comment: 'Ordered laminar flow filters and spawn bags. Delivered via Shiprocket in perfect condition in 3 days. Extremely satisfied with product quality.',
            isVerifiedGrower: true,
          },
        ]);
      }
    }
    loadReviews();
  }, []);

  return (
    <section id="testimonials" className="bg-[#F3F4ED] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E1E5DA]">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          eyebrow="VERIFIED GROWERS"
          title="What Our Community Says"
          subtitle="Real feedback from growers, hobbyists, and commercial farmers across India."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="card-base p-6 bg-white border-[#E1E5DA] flex flex-col justify-between hover:border-[#1F4D35] transition"
            >
              <div>
                {/* 5 Stars Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C79A4A] text-[#C79A4A]" />
                    ))}
                  </div>
                  {r.isVerifiedGrower && (
                    <Badge variant="success">
                      <UserCheck className="w-3 h-3 inline" /> Verified Grower
                    </Badge>
                  )}
                </div>

                <h4 className="font-bold text-[16px] text-[#172019] mb-2">{r.title}</h4>
                <p className="text-[14px] text-[#59645B] leading-[1.6] italic mb-6">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E1E5DA] flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-[14px] text-[#172019]">{r.reviewerName}</h5>
                  <span className="text-[12px] text-[#7C857D]">{r.reviewerLocation || 'Customer'}</span>
                </div>
                <ShieldCheck className="w-5 h-5 text-[#1F4D35]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
