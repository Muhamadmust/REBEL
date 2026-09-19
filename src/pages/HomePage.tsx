import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Product, PageRoute } from '../types';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
  onNavigate: (route: PageRoute) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onNotifyMe: (product: Product) => void;
  onSubscribe: (email: string, source: string) => Promise<{ success: boolean; message: string }>;
  useColorBlockImages: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onNavigate,
  onSelectProduct,
  onQuickAdd,
  onNotifyMe,
  onSubscribe,
  useColorBlockImages,
}) => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [waitlistMsg, setWaitlistMsg] = useState('');

  // Pull 4-6 featured items from the catalog
  const featuredProducts = products.slice(0, 6);

  const handleHeroWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistEmail.includes('@')) return;

    setWaitlistStatus('loading');
    try {
      const res = await onSubscribe(waitlistEmail, 'homepage_waitlist');
      setWaitlistStatus(res.success ? 'success' : 'error');
      setWaitlistMsg(res.message);
      if (res.success) setWaitlistEmail('');
    } catch {
      setWaitlistStatus('error');
      setWaitlistMsg('Failed to join waitlist. Please try again.');
    }
  };

  return (
    <div>
      {/* ========================================================= */}
      {/* ZONE 1: HERO BAND (Top section under nav: Void #141810, Bone #F2F0E2, Moss #8DA05C) */}
      {/* ========================================================= */}
      <section className="bg-[#141810] text-[#F2F0E2] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#3B4A2F]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#8DA05C] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8DA05C] inline-block" />
                  New Collection
                </span>

                <h1 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-[#F2F0E2]">
                  Worn On Your Terms
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#C7CBA9] max-w-xl leading-relaxed">
                Rebel makes everyday essentials — vests, tees, hoodies, sweats — built for people who dress on their own terms. No noise, just pieces you'll actually wear.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  id="hero-explore-btn"
                  onClick={() => onNavigate({ name: 'shop' })}
                  className="px-8 py-4 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.25em] font-medium transition-colors flex items-center justify-center gap-3 group"
                >
                  <span>Shop the Collection</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  id="hero-lookbook-btn"
                  onClick={() => onNavigate({ name: 'lookbook' })}
                  className="px-8 py-4 border border-[#3B4A2F] text-[#F2F0E2] hover:bg-[#1C2217] hover:border-[#8DA05C] text-xs uppercase tracking-[0.25em] font-medium transition-colors text-center"
                >
                  View Lookbook
                </button>
              </div>

              {/* Brand Essentials Strip */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#3B4A2F] text-[11px] text-[#C7CBA9]">
                <div>
                  <span className="font-mono text-xs text-[#F2F0E2] block">ESSENTIALS</span>
                  <span>Vests, Tees, Hoodies</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#F2F0E2] block">HEAVYWEIGHT</span>
                  <span>Durable 280-450gsm</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#F2F0E2] block">LAGOS, NG</span>
                  <span>Worn On Repeat</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Editorial Nigerian Street-cast model */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] w-full bg-[#1C2217] border border-[#3B4A2F] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop"
                  alt="Rebel Heavyweight Hoodie on Model"
                  className="w-full h-full object-cover filter contrast-105 transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#141810]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-[#F2F0E2]">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#8DA05C]">
                    COLLECTION 01 • LAGOS
                  </span>
                  <h3 className="font-serif-heading text-lg sm:text-xl font-normal">
                    Heavyweight Hoodie in Black
                  </h3>
                  <button
                    onClick={() => {
                      const hoodie = products.find(p => p.slug === 'heavyweight-hoodie') || products[0];
                      onSelectProduct(hoodie);
                    }}
                    className="text-[11px] uppercase tracking-wider text-[#8DA05C] hover:underline mt-1 flex items-center gap-1"
                  >
                    <span>View Garment</span>
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ZONE 2: BODY CONTENT (Bone #F2F0E2, Void #141810 text, Pine #3B4A2F secondary) */}
      {/* ========================================================= */}
      <div className="bg-[#F2F0E2] text-[#141810] py-16 sm:py-24 space-y-24 sm:space-y-32">
        {/* SECTION 2: FEATURED PRODUCTS GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#3B4A2F]/20 gap-4">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#3B4A2F] font-semibold">
                Collection 01
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-normal text-[#141810]">
                Featured Essentials
              </h2>
            </div>

            <button
              id="view-all-shop-link"
              onClick={() => onNavigate({ name: 'shop' })}
              className="text-xs uppercase tracking-[0.2em] text-[#141810] hover:text-[#3B4A2F] flex items-center gap-2 transition-colors self-start sm:self-auto font-medium"
            >
              <span>View All Pieces ({products.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Grid of Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickAdd={onQuickAdd}
                onNotifyMe={onNotifyMe}
                useColorBlockImages={useColorBlockImages}
              />
            ))}
          </div>
        </section>

        {/* SECTION 3: BRAND TEASER */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#3B4A2F] font-medium block">
            About Rebel
          </span>

          <blockquote className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug tracking-tight text-[#141810]">
            “Rebel started as a small run of pieces made for people who wanted less noise in their wardrobe. Every drop stays small on purpose.”
          </blockquote>

          <div className="pt-2">
            <button
              id="read-our-story-link"
              onClick={() => onNavigate({ name: 'about' })}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#141810] hover:text-[#3B4A2F] underline underline-offset-4"
            >
              <span>Learn More About the Brand</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* SECTION 4: WAITLIST / EARLY ACCESS */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#3B4A2F]/30 bg-[#EDE7DC] p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#3B4A2F] font-semibold block">
                  Next Drop
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl font-normal text-[#141810]">
                  Get early access to the next drop.
                </h2>
                <p className="text-sm text-[#3B4A2F] max-w-md leading-relaxed">
                  We release in tight, considered runs. Join the list to get notification and private access before the public release.
                </p>
              </div>

              <div className="lg:col-span-5">
                <form onSubmit={handleHeroWaitlist} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      id="homepage-waitlist-input"
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="Enter your email..."
                      disabled={waitlistStatus === 'loading'}
                      className="flex-1 px-4 py-3 bg-[#F2F0E2] border border-[#3B4A2F]/40 text-sm text-[#141810] placeholder-[#3B4A2F]/60 focus:outline-none focus:border-[#141810]"
                    />
                    <button
                      id="homepage-waitlist-submit"
                      type="submit"
                      disabled={waitlistStatus === 'loading'}
                      className="px-6 py-3 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.2em] font-medium transition-colors shrink-0 disabled:opacity-50"
                    >
                      {waitlistStatus === 'loading' ? 'Joining...' : 'Get Access'}
                    </button>
                  </div>

                  {waitlistStatus === 'success' && (
                    <div className="flex items-center gap-2 text-xs text-[#3B4A2F] pt-1">
                      <CheckCircle2 size={15} />
                      <span>{waitlistMsg}</span>
                    </div>
                  )}
                  {waitlistStatus === 'error' && (
                    <p className="text-xs text-[#C1502E] pt-1">
                      {waitlistMsg}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
