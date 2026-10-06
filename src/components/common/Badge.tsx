import React from 'react';
import { ShieldCheck, Award, CheckCircle, Sparkles } from 'lucide-react';
import { TrustBadge } from '../../types';

interface BadgeProps {
  type: TrustBadge | 'sponsored' | 'category' | 'gold' | 'urgent';
  label?: string;
  className?: string;
}

export const TrustBadgeComponent: React.FC<BadgeProps> = ({ type, label, className = '' }) => {
  switch (type) {
    case 'trusted':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-300 shadow-xs ${className}`}
          title="AaplaBoisar Trusted Business"
        >
          <Award className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
          <span>{label || 'Trusted 🟡'}</span>
        </span>
      );

    case 'verified':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-300 shadow-xs ${className}`}
          title="Identity & Location Verified"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 fill-blue-100" />
          <span>{label || 'Verified 🔵'}</span>
        </span>
      );

    case 'listed':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}
          title="Listed on AaplaBoisar"
        >
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>{label || 'Listed 🟢'}</span>
        </span>
      );

    case 'sponsored':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 ${className}`}
        >
          <Sparkles className="w-3 h-3 text-purple-600" />
          <span>Sponsored</span>
        </span>
      );

    case 'gold':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-linear-to-r from-amber-400 to-yellow-500 text-slate-900 shadow-sm ${className}`}
        >
          <Award className="w-3.5 h-3.5 text-slate-900" />
          <span>GOLD PARTNER</span>
        </span>
      );

    case 'urgent':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200 animate-pulse ${className}`}
        >
          <span>🔥 URGENT</span>
        </span>
      );

    default:
      return null;
  }
};
