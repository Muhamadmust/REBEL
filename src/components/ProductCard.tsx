import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/format';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
  onNotifyMe?: (product: Product) => void;
  useColorBlockImages?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  onNotifyMe,
  useColorBlockImages = false,
}) => {
  return (
    <div
      id={`product-card-${product.slug}`}
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
      onClick={() => onSelect(product)}
    >
      {/* Product Visual Container (Aspect Ratio 3:4) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#141810] border border-[#3B4A2F]/30 transition-colors">
        {useColorBlockImages ? (
          /* Solid-color block placeholder */
          <div
            className="w-full h-full flex flex-col justify-between p-6 transition-transform duration-700 group-hover:scale-[1.02]"
            style={{
              backgroundColor: product.editorialColor || '#141810',
              color: '#F2F0E2'
            }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#8DA05C]">
                REBEL
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C7CBA9]">
                {product.category}
              </span>
            </div>
            
            <div className="text-center my-auto px-4">
              <span className="font-serif-heading text-lg sm:text-xl font-medium tracking-tight block text-[#F2F0E2]">
                {product.name}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] mt-2 block font-mono text-[#8DA05C]">
                {product.available ? formatPrice(product.price) : 'Coming Soon'}
              </span>
              <span className="text-[10px] uppercase tracking-widest mt-1 block text-[#C7CBA9]">
                {product.colorways.join(' / ')}
              </span>
            </div>

            <div className="text-[9px] uppercase font-mono tracking-widest text-[#C7CBA9]/60 flex justify-between">
              <span>LAGOS</span>
              <span>DROP 01</span>
            </div>
          </div>
        ) : (
          /* High-res street/editorial imagery */
          <div className="w-full h-full relative bg-[#141810]">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-105"
              loading="lazy"
            />
            {product.images[1] && (
              <img
                src={product.images[1]}
                alt={`${product.name} detail view`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 opacity-0 group-hover:opacity-100 filter contrast-105"
                loading="lazy"
              />
            )}
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {!product.available && (
            <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] bg-[#141810] text-[#8DA05C] border border-[#8DA05C]/40 font-medium">
              Coming soon
            </span>
          )}
          {product.available && (
            <span className="hidden group-hover:inline-block px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] bg-[#141810]/90 text-[#F2F0E2] backdrop-blur-xs border border-[#3B4A2F]">
              {product.colorways.join(' / ')}
            </span>
          )}
        </div>

        {/* Quick Action Overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {product.available ? (
            <button
              id={`quick-add-${product.slug}`}
              onClick={(e) => {
                e.stopPropagation();
                if (onQuickAdd) onQuickAdd(product);
              }}
              className="w-full py-2.5 px-4 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-[11px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Quick Select</span>
              <ArrowUpRight size={14} />
            </button>
          ) : (
            <button
              id={`notify-me-${product.slug}`}
              onClick={(e) => {
                e.stopPropagation();
                if (onNotifyMe) onNotifyMe(product);
              }}
              className="w-full py-2.5 px-4 bg-[#141810] hover:bg-[#1C2217] text-[#8DA05C] text-[11px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 border border-[#8DA05C]/50 transition-colors"
            >
              <span>Notify When Available</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Metadata Strip (In light zone Bone #F2F0E2) */}
      <div className="pt-3 pb-2 space-y-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif-heading text-base font-normal tracking-tight text-[#141810] group-hover:text-[#3B4A2F] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <span className="text-xs font-mono font-medium text-[#141810] shrink-0">
            {product.available ? formatPrice(product.price) : (
              <span className="text-[#3B4A2F] text-[11px] italic">Coming soon</span>
            )}
          </span>
        </div>

        <div className="flex justify-between items-center text-xs text-[#3B4A2F]">
          <span>{product.category}</span>
          <span className="text-[11px] uppercase font-mono text-[#3B4A2F]/80">
            {product.colorways.join(' • ')}
          </span>
        </div>
      </div>
    </div>
  );
};
