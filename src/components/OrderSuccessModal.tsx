import React from 'react';
import { CheckCircle2, X, Package, ShieldCheck } from 'lucide-react';
import { Order } from '../types';
import { formatPrice } from '../utils/format';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#141810]/85 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#141810] text-[#F2F0E2] border border-[#3B4A2F] max-w-xl w-full p-8 sm:p-10 shadow-2xl z-10">
        <button
          id="close-order-success-modal-btn"
          onClick={onClose}
          className="absolute top-6 right-6 text-[#C7CBA9] hover:text-[#8DA05C] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="space-y-6">
          {/* Status Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-full border border-[#8DA05C] mx-auto flex items-center justify-center text-[#8DA05C]">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8DA05C] font-semibold block">
                Order Confirmed
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-normal mt-1 text-[#F2F0E2]">
                Worn On Your Terms
              </h2>
            </div>
            <p className="text-xs text-[#C7CBA9] max-w-md mx-auto">
              Your order has been logged with the Rebel dispatch team in Lagos. A confirmation email and tracking link will be sent to your inbox.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-[#1C2217] border border-[#3B4A2F] p-6 space-y-4">
            <div className="flex justify-between items-center text-xs pb-3 border-b border-[#3B4A2F]">
              <div>
                <span className="text-[#C7CBA9] uppercase text-[10px] tracking-wider block">
                  Order Reference
                </span>
                <span className="font-mono font-medium text-[#F2F0E2]">{order.id}</span>
              </div>
              <div className="text-right">
                <span className="text-[#C7CBA9] uppercase text-[10px] tracking-wider block">
                  Status
                </span>
                <span className="font-mono text-xs uppercase px-2 py-0.5 bg-[#8DA05C]/20 text-[#8DA05C]">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs">
                  <div>
                    <p className="font-serif-heading font-medium text-[#F2F0E2]">{item.name}</p>
                    <p className="text-[11px] text-[#C7CBA9]">
                      {item.colorway ? `${item.colorway} • ` : ''}Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono font-medium text-[#8DA05C]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#3B4A2F] flex justify-between items-center text-sm font-semibold">
              <span className="text-[#F2F0E2]">Total</span>
              <span className="font-mono text-base text-[#8DA05C]">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Delivery Note */}
          <div className="grid grid-cols-2 gap-4 text-[11px] text-[#C7CBA9] pt-2">
            <div className="flex items-start gap-2">
              <Package size={15} className="shrink-0 mt-0.5 text-[#8DA05C]" />
              <span>Shipped in branded matte packaging. Tracking emailed automatically.</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck size={15} className="shrink-0 mt-0.5 text-[#8DA05C]" />
              <span>Heavyweight cotton construction. Built to be worn on repeat.</span>
            </div>
          </div>

          <button
            id="finish-order-btn"
            onClick={onClose}
            className="w-full py-3.5 bg-[#8DA05C] hover:bg-[#9cb06a] text-[#141810] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
          >
            Continue to Collection
          </button>
        </div>
      </div>
    </div>
  );
};
