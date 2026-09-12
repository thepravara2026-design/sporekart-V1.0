import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { landingService } from '../../services/landingService';

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    async function loadFaqs() {
      const data = await landingService.getFaqs();
      if (data && data.length > 0) {
        setFaqs(data);
      } else {
        setFaqs([
          {
            id: 1,
            question: 'Are SporeKart liquid cultures and spawn bags sterile certified?',
            answer: 'Yes. All liquid culture syringes and grain spawn bags are processed in ISO-certified H14 Laminar Flow Hood environments (99.99% HEPA filtration) and autoclaved at 15 PSI for 120 minutes.',
          },
          {
            id: 2,
            question: 'How does SporeKart ship sterile biotech products across India?',
            answer: 'We partner with Shiprocket Express to deliver temperature-controlled, shock-resistant packaged cultures directly to your address within 2-4 business days.',
          },
          {
            id: 3,
            question: 'What payment methods are supported for products and training?',
            answer: 'We accept all major UPI apps (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and Razorpay PayLater.',
          },
          {
            id: 4,
            question: 'How do I verify and download my Training Completion Certificate?',
            answer: 'Upon batch completion, your digital PDF certificate is issued under your Trainee Profile and can be downloaded anytime directly from your dashboard.',
          },
        ]);
      }
    }
    loadFaqs();
  }, []);

  return (
    <section id="faq" className="py-20 bg-[#F6F1E7]/40 border-t border-[#DDE2DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-wider text-[#7A8F5A] uppercase block">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231D] mt-2">
            Everything You Need to Know
          </h2>
          <p className="text-sm text-[#536057] mt-1">Got questions about ordering, sterile lab standards, Shiprocket shipping, or training workshops?</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id}
                className="card-base bg-white border-[#DDE2DC] rounded-lg transition overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-base text-[#17231D] hover:bg-[#FAFAF7] transition"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#234D3C] shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#536057] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#234D3C]' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#536057] leading-relaxed border-t border-[#F4F4EF] bg-[#FAFAF7]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
