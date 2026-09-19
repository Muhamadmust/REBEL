import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem, PageRoute } from '../types';
import { formatPrice } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, colorway: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string, colorway: string) => void;
  onCheckout: () => void;
  onNavigate: (route: PageRoute) => void;
  isCheckingOut: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onNavigate,
  isCheckingOut,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#141810]/80 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#141810] text-[#F2F0E2] border-l border-[#3B4A2F] flex flex-col shadow-2xl transition-all">
          {/* Header */}
          <div className="px-6 py-6 border-b border-[#3B4A2F] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8DA05C] font-semibold block">
                Your Selection
              </span>
              <h2 className="font-serif-heading text-xl font-normal text-[#F2F0E2]">
                Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-2 text-[#C7CBA9] hover:text-[#8DA05C] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#3B4A2F]/50">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-14 h-14 rounded-full border border-[#3B4A2F] flex items-center justify-center text-[#8DA05C]">
                  <span className="font-serif-heading text-2xl">0</span>
                </div>
                <div className="space-y-1">
                  <p className="font-serif-heading text-lg text-[#F2F0E2]">
                    Your cart is empty
                  </p>
                  <p className="text-xs text-[#C7CBA9] max-w-xs">
                    Explore Collection 01 everyday essentials.
                  </p>
                </div>
                <button
                  id="browse-collection-from-cart-btn"
                  onClick={() => {
                    onClose();
                    onNavigate({ name: 'shop' });
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#8DA05C] text-[#141810] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#9cb06a] transition-colors"
                >
                  Shop Essentials
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColorway}-${item.selectedSize}`}
                  className="py-5 flex gap-4 items-start"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#1C2217] border border-[#3B4A2F] shrink-0 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-24">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif-heading text-sm font-normal text-[#F2F0E2] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-xs font-mono font-medium text-[#8DA05C] ml-2">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#C7CBA9] mt-0.5">
                        {item.selectedColorway} • Size: {item.selectedSize}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#3B4A2F]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColorway, -1)}
                          className="p-1 hover:bg-[#1C2217] text-[#C7CBA9] hover:text-[#8DA05C] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-mono text-center text-[#F2F0E2]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColorway, 1)}
                          className="p-1 hover:bg-[#1C2217] text-[#C7CBA9] hover:text-[#8DA05C] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColorway)}
                        className="text-[#C7CBA9] hover:text-[#8DA05C] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#3B4A2F] bg-[#1C2217] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#C7CBA9]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#F2F0E2]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[#C7CBA9]">
                  <span>Delivery</span>
                  <span className="font-mono uppercase text-[#8DA05C]">
                    Calculated at checkout
                  </span>
                </div>
                <div className="pt-2 border-t border-[#3B4A2F] flex justify-between text-sm font-semibold">
                  <span className="font-serif-heading text-base text-[#F2F0E2]">Total</span>
                  <span className="font-mono text-base text-[#8DA05C]">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  id="cart-checkout-btn"
                  onClick={onCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3.5 px-4 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span>Initiating Checkout...</span>
                  ) : (
                    <>
                      <span>Proceed to Checkout</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>

                <button
                  id="view-full-cart-page-btn"
                  onClick={() => {
                    onClose();
                    onNavigate({ name: 'cart' });
                  }}
                  className="w-full py-2 text-[11px] uppercase tracking-[0.2em] text-[#C7CBA9] hover:text-[#8DA05C] text-center block transition-colors"
                >
                  Review Cart Page
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#C7CBA9] pt-1">
                <ShieldCheck size={13} className="text-[#8DA05C]" />
                <span>Secure Checkout • Verified Orders</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
