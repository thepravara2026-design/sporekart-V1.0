import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      alert("Thank you for contacting SporeKart Support Desk! We will respond within 24 hours.");
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-[#DDE2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Info Column */}
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-wider text-[#7A8F5A] uppercase block">GET IN TOUCH</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17231D]">
              We're Here to Assist Your Cultivation Journey
            </h2>
            <p className="text-sm sm:text-base text-[#536057] leading-relaxed">
              Have inquiries regarding bulk spawn orders, laminar flow filter custom sizes, or upcoming cultivation workshops? Connect directly with our lab advisory team.
            </p>

            <div className="space-y-4 pt-4 text-sm text-[#17231D]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#F6F1E7] text-[#234D3C] flex items-center justify-center border border-[#234D3C]/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#7A847D] block">Headquarters</span>
                  <span className="font-semibold">Shriyap Enterprise, Industrial Estate, Bengaluru, Karnataka</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#F6F1E7] text-[#234D3C] flex items-center justify-center border border-[#234D3C]/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#7A847D] block">Phone & WhatsApp Support</span>
                  <span className="font-semibold">+91 80 4567 8900</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#F6F1E7] text-[#234D3C] flex items-center justify-center border border-[#234D3C]/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#7A847D] block">Email Support Desk</span>
                  <span className="font-semibold">support@sporekart.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="card-base p-8 bg-[#FAFAF7] border-[#DDE2DC]">
            <h3 className="font-bold text-xl text-[#17231D] mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#234D3C]" /> Send Message to Advisory Team
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full bg-white border border-[#DDE2DC] focus:border-[#234D3C] rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-[#234D3C]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17231D] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rajesh@example.com"
                    className="w-full bg-white border border-[#DDE2DC] focus:border-[#234D3C] rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-[#234D3C]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17231D] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-[#DDE2DC] focus:border-[#234D3C] rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-[#234D3C]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Message / Inquiry</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your cultivation inquiry or bulk supply requirement..."
                  className="w-full bg-white border border-[#DDE2DC] focus:border-[#234D3C] rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-[#234D3C]/20 resize-none"
                />
              </div>

              <Button variant="primary" size="lg" type="submit" icon={Send} className="w-full">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
