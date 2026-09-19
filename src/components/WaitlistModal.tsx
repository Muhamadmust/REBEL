import React, { useState } from 'react';
import { X, CheckCircle2, Bell } from 'lucide-react';
import { Product } from '../types';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSubscribe: (email: string, source: string) => Promise<{ success: boolean; message: string }>;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubscribe,
}) => {
  const [email, setEmail] = useState('');
  const [selectedSize, setSelectedSize] = useState(product?.details?.sizes?.[0] || 'M');
  const [selectedColorway, setSelectedColorway] = useState(product?.colorways?.[0] || 'Black');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      const res = await onSubscribe(email, `notify_${product.slug}_${selectedColorway}_${selectedSize}`);
      setStatus('success');
      setMessage(res.message || 'You are on the list. We will email you the moment this item drops.');
    } catch {
      setStatus('error');
      setMessage('Failed to register notification. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#141810]/85 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#141810] text-[#F2F0E2] border border-[#3B4A2F] max-w-lg w-full p-8 shadow-2xl z-10">
        <button
          id="close-waitlist-modal-btn"
          onClick={onClose}
          className="absolute top-6 right-6 text-[#C7CBA9] hover:text-[#8DA05C] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8DA05C] font-semibold flex items-center gap-1.5">
              <Bell size={12} />
              Early Access Notification
            </span>
            <h3 className="font-serif-heading text-2xl font-normal text-[#F2F0E2]">
              {product.name}
            </h3>
            <p className="text-xs text-[#C7CBA9] leading-relaxed">
              This piece is part of our upcoming drop. Enter your email to get early access before public release.
            </p>
          </div>

          {status === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#8DA05C] mx-auto flex items-center justify-center text-[#8DA05C]">
                <CheckCircle2 size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif-heading text-lg text-[#F2F0E2]">
                  You're On The List
                </h4>
                <p className="text-xs text-[#C7CBA9] max-w-sm mx-auto">
                  {message}
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.2em] font-medium"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product preview */}
              <div className="flex gap-4 items-center p-3 bg-[#1C2217] border border-[#3B4A2F]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-16 object-cover"
                />
                <div>
                  <p className="font-serif-heading text-sm text-[#F2F0E2]">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-[#C7CBA9]">
                    {product.category} • {product.colorways.join(' / ')}
                  </p>
                </div>
              </div>

              {/* Colorway preference */}
              {product.colorways.length > 1 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#C7CBA9] block">
                    Preferred Colorway
                  </label>
                  <div className="flex gap-2">
                    {product.colorways.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setSelectedColorway(c)}
                        className={`flex-1 py-2 text-xs uppercase font-mono tracking-wider border transition-colors ${
                          selectedColorway === c
                            ? 'border-[#8DA05C] bg-[#8DA05C] text-[#141810] font-semibold'
                            : 'border-[#3B4A2F] text-[#C7CBA9] hover:border-[#8DA05C]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size preference */}
              {product.details?.sizes && (
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#C7CBA9] block">
                    Preferred Size
                  </label>
                  <div className="flex gap-2">
                    {product.details.sizes.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`flex-1 py-2 text-xs font-mono border transition-colors ${
                          selectedSize === s
                            ? 'border-[#8DA05C] bg-[#8DA05C] text-[#141810] font-semibold'
                            : 'border-[#3B4A2F] text-[#C7CBA9] hover:border-[#8DA05C]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Email field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="waitlist-email"
                  className="text-[11px] uppercase tracking-[0.15em] text-[#C7CBA9] block"
                >
                  Your Email Address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full px-4 py-3 bg-transparent border border-[#3B4A2F] text-sm text-[#F2F0E2] placeholder-[#C7CBA9]/60 focus:outline-none focus:border-[#8DA05C]"
                />
              </div>

              <button
                id="submit-waitlist-btn"
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.2em] font-medium transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Saving...' : 'Notify Me Upon Drop'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
