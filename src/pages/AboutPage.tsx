import React from 'react';
import { ArrowRight, Layers, Scissors, ShieldAlert, Mail } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* ========================================================= */}
      {/* ZONE 1: HERO BAND (Void #141810, Bone #F2F0E2, Moss #8DA05C) */}
      {/* ========================================================= */}
      <section className="bg-[#141810] text-[#F2F0E2] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#3B4A2F]/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#8DA05C] block">
            The Brand
          </span>

          <h1 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] text-[#F2F0E2]">
            Less Noise. <br />
            <span className="italic font-light">Better Pieces.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#C7CBA9] max-w-2xl leading-relaxed font-light">
            Rebel is a fashion design brand built around a simple idea: your everyday pieces should feel considered, not thrown together.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ZONE 2: BODY CONTENT (Bone #F2F0E2, Void #141810, Pine #3B4A2F) */}
      {/* ========================================================= */}
      <div className="bg-[#F2F0E2] text-[#141810] py-16 sm:py-24 space-y-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Main Story Narrative */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-base sm:text-lg leading-relaxed text-[#141810]">
              <p>
                We started with a frustration most people have but rarely name: the clothes you reach for every day — your go-to tee, your favourite hoodie, the trousers that just work — are usually the ones made with the least thought. Rebel flips that. We design the staples first, with the same care and precision that typically gets reserved for statement pieces.
              </p>
              <p className="text-[#3B4A2F]">
                Every garment in Collection 01 is built from heavyweight, durable fabrics chosen to hold their shape through daily wear and repeated washes. The silhouettes are relaxed but intentional — cut to move with you, not hang off you. We don't do seasonal churn. We release small, focused drops of pieces you'll wear until they fall apart (which won't be soon).
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/5] bg-[#141810] border border-[#3B4A2F]/30 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop"
                  alt="Rebel Model Editorial Portrait"
                  className="w-full h-full object-cover filter contrast-105"
                />
              </div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-[#3B4A2F] mt-2">
                Rebel Street-Cast Campaign • Lagos, Nigeria
              </p>
            </div>
          </section>

          {/* Three Core Brand Pillars */}
          <section className="space-y-8 pt-8 border-t border-[#3B4A2F]/20">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#3B4A2F] font-semibold block">
                Design Principles
              </span>
              <h2 className="font-serif-heading text-3xl font-normal text-[#141810]">
                How We Build Rebel Garments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="p-8 bg-[#EDE7DC] border border-[#3B4A2F]/30 space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#141810] text-[#8DA05C] flex items-center justify-center">
                  <Layers size={18} />
                </div>
                <h3 className="font-serif-heading text-xl font-normal text-[#141810]">
                  Fabric first
                </h3>
                <p className="text-sm text-[#3B4A2F] leading-relaxed">
                  Heavyweight cottons, custom ribs, and durable weaves that feel substantial the moment you pick them up.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-8 bg-[#EDE7DC] border border-[#3B4A2F]/30 space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#141810] text-[#8DA05C] flex items-center justify-center">
                  <Scissors size={18} />
                </div>
                <h3 className="font-serif-heading text-xl font-normal text-[#141810]">
                  Cut for real life
                </h3>
                <p className="text-sm text-[#3B4A2F] leading-relaxed">
                  Relaxed fits with structure. Pieces that look good without needing to be styled within an inch of their life.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-8 bg-[#EDE7DC] border border-[#3B4A2F]/30 space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#141810] text-[#8DA05C] flex items-center justify-center">
                  <ShieldAlert size={18} />
                </div>
                <h3 className="font-serif-heading text-xl font-normal text-[#141810]">
                  Small runs, always
                </h3>
                <p className="text-sm text-[#3B4A2F] leading-relaxed">
                  We produce in limited quantities to keep quality consistent and avoid the excess that clutters fashion.
                </p>
              </div>
            </div>
          </section>

          {/* Press / Stockist / Contact Note */}
          <section className="bg-[#141810] text-[#F2F0E2] p-8 sm:p-12 border border-[#3B4A2F] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8DA05C] font-semibold block">
                Origin & Partnerships
              </span>
              <h3 className="font-serif-heading text-2xl font-normal text-[#F2F0E2]">
                Based in Lagos, Nigeria.
              </h3>
              <p className="text-sm text-[#C7CBA9] max-w-lg">
                Available online and through select stockists. For press loans, wholesale line-sheets, and collaboration inquiries:
              </p>
              <p className="font-mono text-xs text-[#8DA05C] pt-1">
                hello@rebelclothing.com
              </p>
            </div>

            <button
              onClick={() => onNavigate({ name: 'contact' })}
              className="px-8 py-3.5 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.2em] font-medium transition-colors shrink-0 flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowRight size={14} />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
