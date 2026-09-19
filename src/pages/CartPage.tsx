import React, { useState } from 'react';
import { Plus, Minus, Trash2, ArrowRight, ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { CartItem, PageRoute } from '../types';
import { formatPrice } from '../utils/format';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, colorway: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string, colorway: string) => void;
  onCheckout: () => void;
  onNavigate: (route: PageRoute) => void;
  isCheckingOut: boolean;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onNavigate,
  isCheckingOut,
}) => {
  const [orderNote, setOrderNote] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#F2F0E2] text-[#141810] py-12 sm:py-18">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="pb-6 border-b border-[#3B4A2F]/20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#3B4A2F] font-semibold block">
              Cart Overview
            </span>
            <h1 className="font-serif-heading text-3xl sm:text-4xl font-normal text-[#141810] mt-1">
              Your Items ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h1>
          </div>

          <button
            onClick={() => onNavigate({ name: 'shop' })}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#3B4A2F] hover:text-[#141810] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Continue Shopping</span>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 space-y-6 border border-[#3B4A2F]/20 bg-[#EDE7DC] p-8">
            <div className="space-y-2">
              <h2 className="font-serif-heading text-2xl text-[#141810]">
                Your Cart is Empty
              </h2>
              <p className="text-xs text-[#3B4A2F] max-w-sm mx-auto">
                Explore Collection 01 everyday staples built to be worn on your terms.
              </p>
            </div>
            <button
              onClick={() => onNavigate({ name: 'shop' })}
              className="px-8 py-3.5 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.2em] font-semibold"
            >
              Shop Collection 01
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Line Items list */}
            <div className="lg:col-span-7 divide-y divide-[#3B4A2F]/20">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColorway}-${item.selectedSize}`}
                  className="py-6 flex gap-6 items-start"
                >
                  {/* Thumbnail */}
                  <div className="w-24 aspect-[3/4] bg-[#141810] border border-[#3B4A2F]/25 shrink-0 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif-heading text-base font-normal text-[#141810]">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-[#3B4A2F] mt-0.5">
                          {item.selectedColorway} • Size: <span className="font-mono">{item.selectedSize}</span>
                        </p>
                      </div>
                      <span className="font-mono text-sm font-medium text-[#141810]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>

                    {/* Quantity and removal */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#3B4A2F]/40 bg-[#EDE7DC]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColorway, -1)}
                          className="p-1.5 hover:bg-[#F2F0E2] text-[#3B4A2F] hover:text-[#141810]"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-4 text-xs font-mono text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColorway, 1)}
                          className="p-1.5 hover:bg-[#F2F0E2] text-[#3B4A2F] hover:text-[#141810]"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColorway)}
                        className="text-xs text-[#3B4A2F] hover:text-red-700 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={13} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Order Notes Field */}
              <div className="pt-6">
                <label className="text-[11px] uppercase tracking-[0.15em] text-[#3B4A2F] block mb-2 font-semibold">
                  Delivery Notes / Instructions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Special instructions for Lagos or nationwide courier..."
                  className="w-full p-3 bg-[#EDE7DC] border border-[#3B4A2F]/30 text-xs text-[#141810] placeholder-[#3B4A2F]/60 focus:outline-none focus:border-[#141810]"
                />
              </div>
            </div>

            {/* Right: Order Summary Card */}
            <div className="lg:col-span-5 bg-[#EDE7DC] border border-[#3B4A2F]/30 p-6 sm:p-8 space-y-6">
              <h2 className="font-serif-heading text-xl font-normal pb-4 border-b border-[#3B4A2F]/20 text-[#141810]">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#3B4A2F]">
                  <span>Items Subtotal</span>
                  <span className="font-mono text-[#141810]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[#3B4A2F]">
                  <span>Delivery</span>
                  <span className="font-mono uppercase text-[#3B4A2F]">
                    Calculated at Checkout
                  </span>
                </div>

                <div className="pt-4 border-t border-[#3B4A2F]/20 flex justify-between text-base font-semibold">
                  <span className="font-serif-heading text-[#141810]">Estimated Total</span>
                  <span className="font-mono text-[#141810]">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3">
                <button
                  id="cart-page-checkout-btn"
                  onClick={onCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
                >
                  {isCheckingOut ? (
                    <span>Processing Checkout...</span>
                  ) : (
                    <>
                      <Lock size={14} />
                      <span>Proceed to Checkout</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-[#3B4A2F] leading-normal flex items-center justify-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#3B4A2F]" />
                  <span>Encrypted Stripe checkout. Ships from Lagos, Nigeria.</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
