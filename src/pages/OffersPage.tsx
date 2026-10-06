import React, { useState } from 'react';
import { Tag, Sparkles, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OfferCard } from '../components/common/OfferCard';

export const OffersPage: React.FC = () => {
  const { offers } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Food & Dining', 'Fitness & Gym', 'Salon & Spa', 'Electronics', 'Automobile'];

  const filteredOffers = selectedCategory === 'All'
    ? offers
    : offers.filter(o => o.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full inline-flex items-center gap-1.5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Exclusive for Boisar Residents</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Smart Local Offers & Deals 🏷️
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 max-w-xl font-medium">
              Save big at your favorite local restaurants, salons, electronic shops, and fitness centers across Boisar.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center shrink-0">
            <div className="text-2xl font-black text-amber-300">+{offers.length * 20}</div>
            <div className="text-xs font-semibold text-white">Active Discounts Today</div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOffers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  );
};
