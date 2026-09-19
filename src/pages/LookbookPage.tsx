import React, { useState } from 'react';
import { ArrowUpRight, X, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface LookbookPageProps {
  onNavigate: (route: PageRoute) => void;
}

interface LookItem {
  id: string;
  lookNumber: string;
  headline: string;
  image: string;
  garments: string[];
  aspectRatio: string;
  slugTarget?: string;
}

export const LookbookPage: React.FC<LookbookPageProps> = ({ onNavigate }) => {
  const [selectedLook, setSelectedLook] = useState<LookItem | null>(null);

  const looks: LookItem[] = [
    {
      id: 'look-01',
      lookNumber: 'LOOK 01',
      headline: 'Core Ribbed Vest in Chalk White with Straight-Leg Utility Trouser in Washed Olive',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
      garments: [
        'Core Ribbed Vest (280gsm Custom Rib)',
        'Straight-Leg Utility Trouser in Washed Olive'
      ],
      aspectRatio: 'aspect-[3/4]',
      slugTarget: 'core-ribbed-vest'
    },
    {
      id: 'look-02',
      lookNumber: 'LOOK 02',
      headline: 'Heavyweight Hoodie in Void Black with Relaxed Heavyweight Sweatpants',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
      garments: [
        'Heavyweight Hoodie (450gsm French Terry)',
        'Relaxed Heavyweight Sweatpants in Void Black'
      ],
      aspectRatio: 'aspect-[4/5]',
      slugTarget: 'heavyweight-hoodie'
    },
    {
      id: 'look-03',
      lookNumber: 'LOOK 03',
      headline: 'Rebel Signature Tee in Void Black with Structured Heavyweight Cap',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      garments: [
        'Rebel Signature Tee (240gsm Combed Cotton)',
        'Structured Heavyweight Cap in Washed Olive'
      ],
      aspectRatio: 'aspect-[3/4]',
      slugTarget: 'signature-tee'
    },
    {
      id: 'look-04',
      lookNumber: 'LOOK 04',
      headline: 'Oversized Crewneck Sweater in Pine Green with Raw Utility Trouser',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
      garments: [
        'Oversized Crewneck Sweater in Washed Pine (400gsm)',
        'Straight-Leg Utility Trouser in Void Black'
      ],
      aspectRatio: 'aspect-[4/5]',
      slugTarget: 'oversized-crewneck'
    },
    {
      id: 'look-05',
      lookNumber: 'LOOK 05',
      headline: 'Heavyweight Hoodie in Slate Grey with Relaxed Sweatpants',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      garments: [
        'Heavyweight Hoodie in Slate Grey',
        'Relaxed Heavyweight Sweatpants in Heather Grey'
      ],
      aspectRatio: 'aspect-[3/4]',
      slugTarget: 'heavyweight-hoodie'
    },
    {
      id: 'look-06',
      lookNumber: 'LOOK 06',
      headline: 'Core Ribbed Vest in Void Black with Minimal Everyday Styling',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop',
      garments: [
        'Core Ribbed Vest in Void Black',
        'Structured Heavyweight Cap in Void Black'
      ],
      aspectRatio: 'aspect-[4/5]',
      slugTarget: 'core-ribbed-vest'
    }
  ];

  return (
    <div>
      {/* ========================================================= */}
      {/* ZONE 1: HERO BAND (Void #141810, Bone #F2F0E2, Moss #8DA05C) */}
      {/* ========================================================= */}
      <section className="bg-[#141810] text-[#F2F0E2] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#3B4A2F]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#8DA05C] block">
            Campaign 01
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-[#F2F0E2]">
              Worn On Repeat
            </h1>
            <p className="text-sm sm:text-base text-[#C7CBA9] max-w-md leading-relaxed">
              Editorial street portraits and styling reference captured on location in Lagos, Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ZONE 2: BODY CONTENT (Bone #F2F0E2, Void #141810, Pine #3B4A2F) */}
      {/* ========================================================= */}
      <div className="bg-[#F2F0E2] text-[#141810] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
            {looks.map((look) => (
              <div
                key={look.id}
                id={`lookbook-card-${look.id}`}
                onClick={() => setSelectedLook(look)}
                className="group cursor-pointer space-y-4 flex flex-col"
              >
                {/* Image Container */}
                <div className={`relative ${look.aspectRatio} w-full overflow-hidden bg-[#141810] border border-[#3B4A2F]/30`}>
                  <img
                    src={look.image}
                    alt={look.headline}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141810]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#F2F0E2] flex items-center gap-1.5 font-medium">
                      <span>Inspect Look Details</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Minimal Caption */}
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-mono tracking-widest text-[#3B4A2F] font-semibold">
                      {look.lookNumber}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#3B4A2F]">
                      Lagos Drop 01
                    </span>
                  </div>
                  <h3 className="font-serif-heading text-sm sm:text-base font-normal text-[#141810] group-hover:text-[#3B4A2F] transition-colors leading-snug">
                    {look.headline}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Look Modal / Lightbox */}
      {selectedLook && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#141810]/85 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedLook(null)}
          />

          <div className="relative bg-[#141810] text-[#F2F0E2] border border-[#3B4A2F] max-w-3xl w-full p-8 sm:p-10 shadow-2xl z-10">
            <button
              onClick={() => setSelectedLook(null)}
              className="absolute top-6 right-6 text-[#C7CBA9] hover:text-[#8DA05C] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              <div className="aspect-[3/4] bg-[#1C2217] border border-[#3B4A2F] overflow-hidden">
                <img
                  src={selectedLook.image}
                  alt={selectedLook.headline}
                  className="w-full h-full object-cover filter contrast-105"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-[#8DA05C] font-semibold">
                    {selectedLook.lookNumber}
                  </span>
                  <h2 className="font-serif-heading text-2xl font-normal text-[#F2F0E2] mt-1">
                    {selectedLook.headline}
                  </h2>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8DA05C]">
                    Garments in this Look:
                  </h4>
                  <ul className="space-y-2 text-xs divide-y divide-[#3B4A2F]">
                    {selectedLook.garments.map((g, idx) => (
                      <li key={idx} className="pt-2 text-[#C7CBA9]">
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => {
                      const slug = selectedLook.slugTarget || 'core-ribbed-vest';
                      setSelectedLook(null);
                      onNavigate({ name: 'product', slug });
                    }}
                    className="w-full py-3.5 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <span>View Garment in Shop</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedLook(null);
                      onNavigate({ name: 'shop' });
                    }}
                    className="w-full py-2 text-[11px] uppercase tracking-[0.2em] text-[#C7CBA9] hover:text-[#8DA05C] text-center"
                  >
                    Back to All Pieces
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
