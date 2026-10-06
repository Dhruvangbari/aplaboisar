import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, MessageCircle, Heart, Tag } from 'lucide-react';
import { BusinessItem } from '../../types';
import { TrustBadgeComponent } from './Badge';
import { useApp } from '../../context/AppContext';

interface BusinessCardProps {
  business: BusinessItem;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const { savedItemIds, toggleFavourite } = useApp();
  const isSaved = savedItemIds.includes(business.id);

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`tel:${business.phone}`, '_self');
  };

  const handleWhatsapp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = encodeURIComponent(`Hello ${business.name}, I found your business on AaplaBoisar. I would like to inquire about your services.`);
    window.open(`https://wa.me/${business.whatsapp}?text=${text}`, '_blank');
  };

  const handleHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(business.id);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Cover Image & Badges */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
        <Link to={`/business/${business.slug}`}>
          <img
            src={business.coverImage}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
          <TrustBadgeComponent type={business.trustBadge} />
          {business.subscriptionTier === 'gold' && (
            <span className="bg-amber-500 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              GOLD
            </span>
          )}
        </div>

        {/* Heart / Favourite button */}
        <button
          onClick={handleHeart}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-red-600 shadow-md transition-all active:scale-90"
          aria-label="Save to favourites"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'text-red-500 fill-red-500' : ''}`} />
        </button>

        {/* Open/Closed & Offers Pill */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs">
          <span
            className={`px-2 py-0.5 rounded-md font-medium backdrop-blur-md ${
              business.isOpen
                ? 'bg-emerald-600/90 text-white'
                : 'bg-slate-800/90 text-slate-200'
            }`}
          >
            {business.isOpen ? 'Open Now' : 'Closed'}
          </span>
          {business.offersCount > 0 && (
            <span className="flex items-center gap-1 bg-red-600/90 backdrop-blur-md text-white px-2 py-0.5 rounded-md font-medium text-[11px]">
              <Tag className="w-3 h-3" />
              <span>{business.offersCount} Active Offer</span>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Distance */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-md">{business.category}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {business.distance}
            </span>
          </div>

          {/* Business Title */}
          <Link to={`/business/${business.slug}`}>
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-red-600 transition-colors line-clamp-1">
              {business.name}
            </h3>
          </Link>

          {/* Marathi Name subtitle */}
          {business.marathiName && (
            <div className="text-xs text-slate-500 font-medium">
              {business.marathiName}
            </div>
          )}

          {/* Rating & Address */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 bg-emerald-600 text-white px-1.5 py-0.5 rounded-md text-xs font-bold shadow-xs">
              <span>{business.rating}</span>
              <Star className="w-3 h-3 fill-white" />
            </div>
            <span className="text-xs text-slate-500 font-medium">
              ({business.reviewCount} reviews)
            </span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs text-slate-600 truncate max-w-[130px]">
              {business.area}
            </span>
          </div>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {business.tagline || business.about}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
          <button
            onClick={handleCall}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold border border-slate-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>Call</span>
          </button>

          <button
            onClick={handleWhatsapp}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </button>

          <Link
            to={`/business/${business.slug}`}
            className="flex items-center justify-center py-1.5 px-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
