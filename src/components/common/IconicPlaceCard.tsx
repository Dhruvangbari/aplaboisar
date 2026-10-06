import React from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { IconicPlace } from '../../types';

interface IconicPlaceCardProps {
  place: IconicPlace;
  onClick?: () => void;
}

export const IconicPlaceCard: React.FC<IconicPlaceCardProps> = ({ place, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex-none w-64 md:w-72 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-slate-900"
    >
      {/* Background Image */}
      <div className="h-44 md:h-48 w-full overflow-hidden">
        <img
          src={place.coverImage}
          alt={place.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out brightness-90 group-hover:brightness-95"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      {/* Floating Distance Badge */}
      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-xs">
        <Clock className="w-3 h-3 text-amber-400" />
        <span>{place.distance}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 inset-x-0 p-4 text-white">
        <h3 className="font-bold text-base md:text-lg tracking-tight group-hover:text-red-400 transition-colors">
          {place.title}
        </h3>
        {place.marathiTitle && (
          <div className="text-xs text-slate-300 font-medium mb-1">
            {place.marathiTitle}
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-slate-300 mt-1">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="truncate max-w-[170px]">{place.location}</span>
          </span>
          <span className="flex items-center gap-0.5 text-red-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
