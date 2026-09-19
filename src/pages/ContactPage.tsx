import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle2, ArrowRight, Instagram } from 'lucide-react';
import { PageRoute } from '../types';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFeedback('Thank you for getting in touch. The Rebel team has received your message and will respond shortly.');
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 500);
  };

  return (
    <div>
      {/* ========================================================= */}
      {/* ZONE 1: HERO BAND (Void #141810, Bone #F2F0E2, Moss #8DA05C) */}
      {/* ========================================================= */}
      <section className="bg-[#141810] text-[#F2F0E2] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#3B4A2F]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#8DA05C] block">
            Contact
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-[#F2F0E2]">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-[#C7CBA9] max-w-2xl leading-relaxed">
            Press, stockists, collaborations, or general questions — reach us here.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ZONE 2: BODY CONTENT (Bone #F2F0E2, Void #141810, Pine #3B4A2F) */}
      {/* ========================================================= */}
      <div className="bg-[#F2F0E2] text-[#141810] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <h2 className="font-serif-heading text-2xl font-normal text-[#141810]">
                  Send a Message
                </h2>
                <p className="text-xs text-[#3B4A2F]">
                  We typically reply within one business day.
                </p>
              </div>

              {status === 'success' ? (
                <div className="p-8 border border-[#3B4A2F]/30 bg-[#EDE7DC] space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full border border-[#8DA05C] mx-auto flex items-center justify-center text-[#8DA05C] bg-[#141810]">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="font-serif-heading text-xl text-[#141810]">
                    Message Sent
                  </h3>
                  <p className="text-xs text-[#3B4A2F] max-w-md mx-auto">
                    {feedback}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-6 py-2.5 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.2em] font-medium"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#3B4A2F] block font-semibold">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-3 bg-[#EDE7DC] border border-[#3B4A2F]/40 text-xs text-[#141810] placeholder-[#3B4A2F]/60 focus:outline-none focus:border-[#141810]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#3B4A2F] block font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-3.5 py-3 bg-[#EDE7DC] border border-[#3B4A2F]/40 text-xs text-[#141810] placeholder-[#3B4A2F]/60 focus:outline-none focus:border-[#141810]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#3B4A2F] block font-semibold">
                      Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#EDE7DC] border border-[#3B4A2F]/40 text-xs text-[#141810] focus:outline-none focus:border-[#141810]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Stockist / Wholesale">Stockist / Wholesale</option>
                      <option value="Press / Editorial">Press / Editorial</option>
                      <option value="Order Question">Order Question</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#3B4A2F] block font-semibold">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full p-3 bg-[#EDE7DC] border border-[#3B4A2F]/40 text-xs text-[#141810] placeholder-[#3B4A2F]/60 focus:outline-none focus:border-[#141810]"
                    />
                  </div>

                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.25em] font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>

            {/* Direct Channels */}
            <div className="lg:col-span-5 space-y-6 lg:pl-6">
              <div className="p-8 bg-[#EDE7DC] border border-[#3B4A2F]/30 space-y-6">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#3B4A2F] block">
                  Direct Inquiries
                </span>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-[#3B4A2F] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#3B4A2F] block">Email</span>
                      <a href="mailto:hello@rebelclothing.com" className="font-mono text-sm text-[#141810] hover:text-[#8DA05C] transition-colors">
                        hello@rebelclothing.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Instagram size={18} className="text-[#3B4A2F] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#3B4A2F] block">Instagram</span>
                      <a href="https://instagram.com/wearrebel" target="_blank" rel="noreferrer" className="font-mono text-sm text-[#141810] hover:text-[#8DA05C] transition-colors">
                        @wearrebel
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#3B4A2F] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#3B4A2F] block">Studio & Logistics</span>
                      <span className="text-sm text-[#141810] block">
                        Lagos, Nigeria
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#3B4A2F]/20 text-xs text-[#3B4A2F] space-y-2">
                  <p className="font-medium text-[#141810]">
                    Wholesale & Press Loans
                  </p>
                  <p className="leading-relaxed">
                    Physical line-sheets, retail margins, and lookbook samples are dispatched on request for verified retail partners and publications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
