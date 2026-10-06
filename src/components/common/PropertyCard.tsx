import React, { useState } from 'react';
import { Home, MapPin, Maximize2, Phone, MessageCircle, Calendar, ShieldCheck } from 'lucide-react';
import { PropertyItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface PropertyCardProps {
  property: PropertyItem;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { showToast } = useApp();
  const [scheduled, setScheduled] = useState(false);

  const handleScheduleVisit = () => {
    setScheduled(true);
    showToast(`Site visit request sent for "${property.title}"! Broker will call you.`, 'success');
  };

  const handleWhatsapp = () => {
    const text = encodeURIComponent(`Hi, I am interested in property "${property.title}" priced at ${property.price} on AaplaBoisar. Please share more photos and details.`);
    window.open(`https://wa.me/${property.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Image & Price Overlay */}
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="bg-red-600 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              For {property.transactionType}
            </span>
            {property.verified && (
              <span className="bg-blue-600/90 backdrop-blur-md text-white font-medium text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified</span>
              </span>
            )}
          </div>

          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-baseline justify-between text-white">
            <span className="text-xl font-black text-amber-300 drop-shadow-xs">
              {property.price}
            </span>
            <span className="text-xs bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-slate-200 font-medium">
              {property.propertyType}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-red-600 transition-colors mb-1.5">
            {property.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mb-3">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100 mb-3">
            <div className="flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.area}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 mb-2">
            {property.description}
          </p>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="p-4 pt-0 grid grid-cols-3 gap-2">
        <button
          onClick={() => window.open(`tel:${property.phone}`, '_self')}
          className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-blue-600" />
          <span>Call</span>
        </button>

        <button
          onClick={handleWhatsapp}
          className="py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border border-emerald-200 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleScheduleVisit}
          className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
            scheduled
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{scheduled ? 'Booked' : 'Visit'}</span>
        </button>
      </div>
    </div>
  );
};
