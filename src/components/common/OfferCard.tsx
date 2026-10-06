import React from 'react';
import { Tag, Clock, Copy, Check, MessageCircle } from 'lucide-react';
import { OfferItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface OfferCardProps {
  offer: OfferItem;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const { claimOffer, showToast } = useApp();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    showToast(`Coupon code ${offer.code} copied!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    claimOffer(offer.id);
  };

  const handleWhatsapp = () => {
    const text = encodeURIComponent(`Hi, I saw your offer "${offer.title}" with coupon code ${offer.code} on AaplaBoisar. I want to redeem it!`);
    window.open(`https://wa.me/919823045671?text=${text}`, '_blank');
  };

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 hover:border-red-300 shadow-xs hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between overflow-hidden">
      {/* Decorative top ribbon */}
      <div className="absolute top-0 right-0 bg-linear-to-l from-red-600 to-rose-500 text-white font-extrabold text-xs px-3 py-1 rounded-bl-xl shadow-xs">
        {offer.discountText}
      </div>

      <div>
        {/* Business Header */}
        <div className="flex items-center gap-2.5 mb-3 pr-16">
          <img
            src={offer.businessLogo}
            alt={offer.businessName}
            className="w-10 h-10 rounded-xl object-cover border border-slate-200"
          />
          <div>
            <h4 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">
              {offer.businessName}
            </h4>
            <span className="text-[11px] text-red-600 font-medium bg-red-50 px-1.5 py-0.5 rounded">
              {offer.category}
            </span>
          </div>
        </div>

        {/* Offer Title */}
        <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug mb-2">
          {offer.title}
        </h3>

        {/* Pricing if present */}
        {offer.discountedPrice && (
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-extrabold text-slate-900">
              ₹{offer.discountedPrice}
            </span>
            {offer.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{offer.originalPrice}
              </span>
            )}
            <span className="text-xs font-semibold text-emerald-600">
              Save ₹{(offer.originalPrice || 0) - offer.discountedPrice}
            </span>
          </div>
        )}

        {/* Validity */}
        <div className="flex items-center gap-1 text-xs text-amber-700 font-medium mb-3 bg-amber-50 px-2 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>{offer.validUntil}</span>
          <span className="text-slate-400 ml-auto text-[11px] font-normal">
            {offer.claimedCount} people claimed
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-3 line-clamp-2">
          {offer.terms}
        </p>
      </div>

      {/* Coupon & Action row */}
      <div className="pt-3 border-t border-dashed border-slate-200 flex flex-col gap-2">
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1.5 px-2.5">
          <span className="font-mono font-bold text-xs text-slate-800 tracking-wider">
            {offer.code}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            onClick={handleClaim}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Claim Offer</span>
          </button>
          <button
            onClick={handleWhatsapp}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
