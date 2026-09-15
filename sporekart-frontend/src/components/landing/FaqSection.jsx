import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { landingService } from '../../services/landingService';

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [openIdx, setOpenIdx] = useState(0);

  const defaultFaqs = [
    {
      id: 1,
      question: 'Which mushroom products do you sell?',
      answer: 'We sell fresh farm-harvested mushrooms, dehydrated dry mushroom pouches, ISO HEPA certified liquid culture syringes (Oyster, Shiitake, Button, Reishi), autoclaved grain spawn bags, and ready-to-fruit home growing kits.',
    },
    {
      id: 2,
      question: 'What is mushroom spawn?',
      answer: 'Mushroom spawn is a carrier substrate (such as sterilized rye or wheat grain) colonized by pure mushroom mycelium. It acts as the "seed" used to inoculate larger bulk growing substrates.',
    },
    {
      id: 3,
      question: 'How should spawn and liquid cultures be stored?',
      answer: 'Liquid culture syringes should be stored in a clean refrigerator at 2°C to 4°C. Autoclaved grain spawn bags should be kept in a cool, dark room and used within 14 days of receipt for best colonization speed.',
    },
    {
      id: 4,
      question: 'Do you provide cultivation training?',
      answer: 'Yes! We host 2-day and 3-day practical hands-on mycology workshops covering liquid culture preparation, sterile lab techniques, farm setup, and harvest management with digital PDF certificates.',
    },
    {
      id: 5,
      question: 'Can beginners join the training workshops?',
      answer: 'Absolutely. Our Starter Cultivation 101 workshops are specifically designed for beginners with zero prior experience in mycology or farming.',
    },
    {
      id: 6,
      question: 'Do you deliver across India?',
      answer: 'Yes. We ship temperature-controlled, shock-resistant packaged cultures and kits to over 19,000 pincodes across India via Shiprocket Express Logistics within 2-4 business days.',
    },
    {
      id: 7,
      question: 'How can I get cultivation support during my grow?',
      answer: 'All SporeKart customers receive access to our WhatsApp grower advisory desk. You can send photos of your growing bags or setup for real-time guidance from our lab team.',
    },
    {
      id: 8,
      question: 'How do I track my order?',
      answer: 'Once dispatched, you will receive a WhatsApp message and email containing your Shiprocket AWB tracking link to monitor live shipment status.',
    },
  ];

  useEffect(() => {
    async function loadFaqs() {
      const data = await landingService.getFaqs();
      if (data && data.length > 0) {
        setFaqs(data);
      } else {
        setFaqs(defaultFaqs);
      }
    }
    loadFaqs();
  }, []);

  return (
    <section id="faq" className="bg-[#F6F2E8] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E1E5DA]">
      <div className="max-w-[800px] mx-auto">
        <SectionHeader
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Questions & Answers"
          subtitle="Everything you need to know about our products, delivery, and training workshops."
        />

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id || idx}
                className="card-base bg-white border-[#E1E5DA] rounded-[14px] transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-[16px] text-[#172019] hover:bg-[#FCFCF8] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#1F4D35] shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#7C857D] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#1F4D35]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-[14px] sm:text-[15px] text-[#59645B] leading-[1.6] border-t border-[#F3F4ED] bg-[#FCFCF8]">
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
