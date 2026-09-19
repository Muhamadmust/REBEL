import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Instagram, Mail, MapPin } from 'lucide-react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onSubscribe: (email: string, source: string) => Promise<{ success: boolean; message: string }>;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await onSubscribe(email, 'footer');
      setStatus(res.success ? 'success' : 'error');
      setFeedback(res.message);
      if (res.success) setEmail('');
    } catch {
      setStatus('error');
      setFeedback('Unable to subscribe at this moment.');
    }
  };

  const categories = [
    'Vests',
    'T-Shirts',
    'Sweaters',
    'Trousers',
    'Sweatpants',
    'Headwear',
    'Hoodies'
  ];

  return (
    <footer className="bg-[#141810] text-[#F2F0E2] border-t border-[#3B4A2F]/60 transition-colors">
      {/* Top Footer: Early Access Signup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-b border-[#3B4A2F]/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8DA05C] font-semibold block">
              Early Access
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal leading-tight text-[#F2F0E2]">
              Get early access to the next drop.
            </h3>
            <p className="text-sm text-[#C7CBA9] max-w-lg leading-relaxed">
              Every drop stays small on purpose. Be the first to know when the next run of everyday essentials goes live.
            </p>
          </div>

          <div className="lg:col-span-6 lg:pl-10">
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative flex items-center">
                <input
                  id="footer-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  disabled={status === 'loading'}
                  className="w-full bg-transparent border-b border-[#F2F0E2]/40 py-3.5 pr-12 text-sm text-[#F2F0E2] placeholder-[#C7CBA9]/60 focus:outline-none focus:border-[#8DA05C] transition-colors"
                />
                <button
                  id="footer-subscribe-btn"
                  type="submit"
                  disabled={status === 'loading'}
                  aria-label="Submit email"
                  className="absolute right-0 p-2 text-[#8DA05C] hover:text-[#C7CBA9] transition-colors disabled:opacity-50"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-xs text-[#8DA05C] pt-1">
                  <CheckCircle2 size={14} />
                  <span>{feedback}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-xs text-[#C7CBA9] pt-1">
                  <AlertCircle size={14} />
                  <span>{feedback}</span>
                </div>
              )}
              <p className="text-[11px] text-[#C7CBA9]/70 pt-1">
                Zero spam. You can unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Col 1: Wordmark & Statement */}
          <div className="col-span-2 space-y-4 pr-6">
            <span className="font-serif-heading text-2xl tracking-[0.18em] block text-[#F2F0E2]">
              REBEL
            </span>
            <p className="text-xs text-[#C7CBA9] leading-relaxed max-w-sm">
              A streetwear label built around a simple idea: your everyday pieces should feel considered, not thrown together. Based in Lagos, Nigeria.
            </p>
            <div className="pt-2 text-xs text-[#C7CBA9] space-y-1.5 font-mono">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#8DA05C]" />
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#8DA05C]" />
                <a href="mailto:hello@rebelclothing.com" className="hover:text-[#8DA05C] transition-colors">
                  hello@rebelclothing.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram size={13} className="text-[#8DA05C]" />
                <a href="https://instagram.com/wearrebel" target="_blank" rel="noreferrer" className="hover:text-[#8DA05C] transition-colors">
                  @wearrebel
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8DA05C]">
              Collection 01
            </h4>
            <ul className="space-y-2 text-xs text-[#C7CBA9]">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onNavigate({ name: 'shop', category: cat })}
                    className="hover:text-[#8DA05C] transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: More Categories & Essentials */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8DA05C]">
              Essentials
            </h4>
            <ul className="space-y-2 text-xs text-[#C7CBA9]">
              {categories.slice(4).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onNavigate({ name: 'shop', category: cat })}
                    className="hover:text-[#8DA05C] transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate({ name: 'lookbook' })}
                  className="hover:text-[#8DA05C] transition-colors"
                >
                  Lookbook
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Brand & Contact */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8DA05C]">
              Rebel
            </h4>
            <ul className="space-y-2 text-xs text-[#C7CBA9]">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'about' })}
                  className="hover:text-[#8DA05C] transition-colors"
                >
                  About the Label
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'contact' })}
                  className="hover:text-[#8DA05C] transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'contact' })}
                  className="hover:text-[#8DA05C] transition-colors"
                >
                  Wholesale & Stockists
                </button>
              </li>
              <li>
                <span className="text-[#C7CBA9]/60">Lagos Courier & Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-[#3B4A2F]/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#C7CBA9] gap-4">
          <p>© {new Date().getFullYear()} REBEL CLOTHING. WORN ON YOUR TERMS.</p>
          <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider text-[#8DA05C]">
            <span>Lagos</span>
            <span>•</span>
            <span>Accra</span>
            <span>•</span>
            <span>London</span>
            <span>•</span>
            <span>Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
