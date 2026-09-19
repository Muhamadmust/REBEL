import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronDown, Bell, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, PageRoute } from '../types';
import { formatPrice } from '../utils/format';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBackToShop: () => void;
  onAddToCart: (product: Product, size: string, colorway: string, quantity: number) => void;
  onNotifyMe: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  useColorBlockImages: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBackToShop,
  onAddToCart,
  onNotifyMe,
  onSelectProduct,
  useColorBlockImages,
}) => {
  const sizes = product.details?.sizes || ['S', 'M', 'L', 'XL'];
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);
  const [selectedColorway, setSelectedColorway] = useState<string>(product.colorways[0] || 'Black');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Accordion state
  const [openSection, setOpenSection] = useState<'fabric' | 'fit' | 'delivery' | null>('fabric');

  const handleAdd = () => {
    if (!product.available) {
      onNotifyMe(product);
      return;
    }

    onAddToCart(product, selectedSize, selectedColorway, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  // Related products
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(allProducts.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 3);

  return (
    <div className="bg-[#F2F0E2] text-[#141810] py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back button */}
        <div>
          <button
            id="back-to-shop-btn"
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#3B4A2F] hover:text-[#141810] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Collection</span>
          </button>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Gallery (Thumbnails + Primary Image) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] w-full bg-[#141810] border border-[#3B4A2F]/30 overflow-hidden">
              {useColorBlockImages ? (
                <div
                  className="w-full h-full flex flex-col justify-between p-10"
                  style={{
                    backgroundColor: product.editorialColor || '#141810',
                    color: '#F2F0E2'
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#8DA05C]">
                      REBEL • ESSENTIAL
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#C7CBA9]">
                      {product.category}
                    </span>
                  </div>
                  <div className="text-center my-auto">
                    <h2 className="font-serif-heading text-3xl sm:text-4xl font-normal text-[#F2F0E2]">
                      {product.name}
                    </h2>
                    <p className="text-sm font-mono tracking-widest uppercase mt-3 text-[#8DA05C]">
                      {selectedColorway}
                    </p>
                  </div>
                  <div className="flex justify-between items-end font-mono text-[10px] uppercase text-[#C7CBA9]/70">
                    <span>LAGOS, NIGERIA</span>
                    <span>DROP 01</span>
                  </div>
                </div>
              ) : (
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-500 filter contrast-105"
                />
              )}

              {!product.available && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] bg-[#141810] text-[#8DA05C] border border-[#8DA05C]/40 font-medium">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {!useColorBlockImages && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 aspect-[3/4] bg-[#141810] border transition-all overflow-hidden ${
                      activeImageIndex === idx
                        ? 'border-[#141810] ring-2 ring-[#8DA05C]'
                        : 'border-[#3B4A2F]/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Purchase Matrix */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 pb-6 border-b border-[#3B4A2F]/20">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#3B4A2F] font-semibold block">
                {product.category} • Drop 01
              </span>

              <h1 className="font-serif-heading text-3xl sm:text-4xl font-normal text-[#141810] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-mono text-2xl font-medium text-[#141810]">
                  {product.available ? formatPrice(product.price) : 'Price announced upon release'}
                </span>
                {product.available && (
                  <span className="text-[11px] uppercase tracking-wider text-[#3B4A2F]">
                    Lagos Delivery & Worldwide Shipping
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="text-sm text-[#141810] leading-relaxed">
              {product.description}
            </div>

            {/* Colorway Selector */}
            {product.colorways.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#141810] block">
                  Colorway: <span className="font-mono font-normal text-[#3B4A2F]">{selectedColorway}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colorways.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColorway(c)}
                      className={`px-4 py-2 text-xs uppercase font-mono tracking-wider border transition-all ${
                        selectedColorway === c
                          ? 'border-[#141810] bg-[#141810] text-[#F2F0E2] font-semibold'
                          : 'border-[#3B4A2F]/40 text-[#3B4A2F] hover:border-[#141810]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <label className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#141810]">
                  Size:
                </label>
                <span className="text-[11px] text-[#3B4A2F]">
                  Relaxed Structured Cut
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    id={`size-btn-${size}`}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs font-mono border transition-all text-center ${
                      selectedSize === size
                        ? 'border-[#141810] bg-[#141810] text-[#F2F0E2] font-semibold'
                        : 'border-[#3B4A2F]/40 text-[#3B4A2F] hover:border-[#141810]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            {product.available && (
              <div className="flex items-center gap-4 pt-2">
                <label className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#141810]">
                  Quantity:
                </label>
                <div className="flex items-center border border-[#3B4A2F]/40">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm hover:bg-[#EDE7DC] text-[#3B4A2F] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-mono">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm hover:bg-[#EDE7DC] text-[#3B4A2F] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* CTA Button: Moss #8DA05C in both zones for consistency */}
            <div className="space-y-3 pt-4">
              {product.available ? (
                <button
                  id="add-to-cart-btn"
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-4 px-6 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.25em] font-semibold transition-colors flex items-center justify-center gap-3 shadow-sm"
                >
                  {addedAnimation ? (
                    <>
                      <Check size={16} />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Add to Cart — {formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  id="notify-me-btn"
                  type="button"
                  onClick={() => onNotifyMe(product)}
                  className="w-full py-4 px-6 bg-[#141810] hover:bg-[#1C2217] text-[#8DA05C] border border-[#8DA05C]/50 text-xs uppercase tracking-[0.25em] font-medium transition-colors flex items-center justify-center gap-3"
                >
                  <Bell size={16} />
                  <span>Notify Me When Available</span>
                </button>
              )}
            </div>

            {/* Accordion Specs */}
            <div className="pt-6 border-t border-[#3B4A2F]/20 divide-y divide-[#3B4A2F]/15">
              {/* Accordion 1: Fabric */}
              <div className="py-4">
                <button
                  onClick={() => setOpenSection(openSection === 'fabric' ? null : 'fabric')}
                  className="w-full flex justify-between items-center text-xs uppercase tracking-[0.2em] font-medium text-left text-[#141810]"
                >
                  <span>Fabric & Build</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${openSection === 'fabric' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSection === 'fabric' && (
                  <div className="pt-3 text-xs text-[#3B4A2F] space-y-1.5 leading-relaxed">
                    <p><strong className="text-[#141810]">Material:</strong> {product.details?.material}</p>
                    <p><strong className="text-[#141810]">Origin:</strong> {product.details?.origin}</p>
                    <p><strong className="text-[#141810]">Finishing:</strong> Reinforced neckband and double-needle seams.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fit */}
              <div className="py-4">
                <button
                  onClick={() => setOpenSection(openSection === 'fit' ? null : 'fit')}
                  className="w-full flex justify-between items-center text-xs uppercase tracking-[0.2em] font-medium text-left text-[#141810]"
                >
                  <span>Fit & Sizing</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${openSection === 'fit' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSection === 'fit' && (
                  <div className="pt-3 text-xs text-[#3B4A2F] space-y-1.5 leading-relaxed">
                    <p>{product.details?.fit}</p>
                    <p>Designed with a relaxed drape that sits comfortably on shoulders and chest without excess bagginess.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care & Delivery */}
              <div className="py-4">
                <button
                  onClick={() => setOpenSection(openSection === 'delivery' ? null : 'delivery')}
                  className="w-full flex justify-between items-center text-xs uppercase tracking-[0.2em] font-medium text-left text-[#141810]"
                >
                  <span>Care & Dispatch</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${openSection === 'delivery' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSection === 'delivery' && (
                  <div className="pt-3 text-xs text-[#3B4A2F] space-y-1.5 leading-relaxed">
                    <p><strong className="text-[#141810]">Care:</strong> {product.details?.care}</p>
                    <p><strong className="text-[#141810]">Delivery:</strong> Nationwide dispatch across Nigeria. Standard delivery 2–4 business days.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Pairings */}
        <div className="pt-16 border-t border-[#3B4A2F]/20 space-y-6">
          <div className="flex justify-between items-baseline">
            <h3 className="font-serif-heading text-2xl font-normal text-[#141810]">
              More Essentials
            </h3>
            <button
              onClick={onBackToShop}
              className="text-xs uppercase tracking-[0.2em] text-[#3B4A2F] flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="cursor-pointer group space-y-3"
              >
                <div className="aspect-[3/4] bg-[#141810] border border-[#3B4A2F]/20 overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  />
                </div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-serif-heading text-sm text-[#141810] group-hover:text-[#3B4A2F] transition-colors">
                    {p.name}
                  </h4>
                  <span className="text-xs font-mono font-medium text-[#141810]">
                    {p.available ? formatPrice(p.price) : 'Coming soon'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
