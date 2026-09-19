import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Product, PageRoute } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  products: Product[];
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onNotifyMe: (product: Product) => void;
  onNavigate: (route: PageRoute) => void;
  useColorBlockImages: boolean;
  onToggleImageMode: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory = 'All',
  onSelectProduct,
  onQuickAdd,
  onNotifyMe,
  onNavigate,
  useColorBlockImages,
  onToggleImageMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = [
    'All',
    'Vests',
    'T-Shirts',
    'Sweaters',
    'Trousers',
    'Sweatpants',
    'Headwear',
    'Hoodies'
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, selectedCategory, sortBy]);

  return (
    <div>
      {/* ========================================================= */}
      {/* ZONE 1: HERO BAND (Void #141810, Bone #F2F0E2, Moss #8DA05C) */}
      {/* ========================================================= */}
      <section className="bg-[#141810] text-[#F2F0E2] pt-12 sm:pt-16 pb-14 sm:pb-20 border-b border-[#3B4A2F]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8DA05C] font-semibold block">
              Collection 01
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-[#F2F0E2]">
              The Essentials
            </h1>
            <p className="text-sm sm:text-base text-[#C7CBA9] leading-relaxed">
              Vests, tees, sweaters, trousers, sweatpants, caps and hoodies — built to be worn on repeat.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ZONE 2: BODY CONTENT (Bone #F2F0E2, Void #141810, Pine #3B4A2F) */}
      {/* ========================================================= */}
      <div className="bg-[#F2F0E2] text-[#141810] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Controls: Filter Pills & Sort */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#3B4A2F]/20">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#3B4A2F] mr-2 flex items-center gap-1 font-semibold">
                <Filter size={12} />
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`cat-filter-${cat.toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 uppercase text-[11px] tracking-[0.15em] transition-colors border ${
                    selectedCategory === cat
                      ? 'border-[#141810] bg-[#141810] text-[#F2F0E2] font-medium'
                      : 'border-[#3B4A2F]/30 text-[#3B4A2F] hover:border-[#141810]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort & Image Mode */}
            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={onToggleImageMode}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#3B4A2F]/30 text-[#3B4A2F] hover:border-[#141810] transition-colors"
                title="Toggle between Photography and Color Blocks"
              >
                <SlidersHorizontal size={12} />
                <span className="text-[11px] uppercase tracking-wider">
                  {useColorBlockImages ? 'Block Mode' : 'Photo Mode'}
                </span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#3B4A2F]">
                  Sort:
                </span>
                <select
                  id="shop-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border border-[#3B4A2F]/30 px-2 py-1 text-[11px] uppercase tracking-wider text-[#141810] focus:outline-none"
                >
                  <option value="featured" className="bg-[#F2F0E2] text-[#141810]">Curated</option>
                  <option value="price-asc" className="bg-[#F2F0E2] text-[#141810]">Price: Low to High</option>
                  <option value="price-desc" className="bg-[#F2F0E2] text-[#141810]">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="font-serif-heading text-xl text-[#141810]">
                No pieces found in this category
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-xs uppercase tracking-[0.2em] underline text-[#3B4A2F]"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
              {filteredProducts.map((product) => (
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
          )}

          {/* Stockist / Wholesale Banner */}
          <div className="mt-16 p-8 bg-[#EDE7DC] border border-[#3B4A2F]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#3B4A2F] font-semibold block">
                Wholesale & Stockists
              </span>
              <p className="font-serif-heading text-lg text-[#141810]">
                Interested in carrying Rebel in your store?
              </p>
              <p className="text-xs text-[#3B4A2F]">
                We partner with select retailers who understand considered everyday dressing.
              </p>
            </div>

            <button
              onClick={() => onNavigate({ name: 'contact' })}
              className="px-6 py-3 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-[11px] uppercase tracking-[0.2em] font-medium transition-colors shrink-0"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
