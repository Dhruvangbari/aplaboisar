import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Grid, List, MapPin, Star, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BusinessCard } from '../components/common/BusinessCard';

export const BusinessesPage: React.FC = () => {
  const { businesses } = useApp();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedArea, setSelectedArea] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'popular' | 'distance'>('rating');

  const categories = ['All', 'Restaurants & Food', 'Doctors & Hospitals', 'Gyms & Fitness', 'Salon & Beauty', 'Automobile', 'Shopping', 'Education', 'Home Services', 'Real Estate', 'Finance'];
  const areas = ['All', 'Boisar West', 'Boisar East', 'Tarapur MIDC', 'Ostwal Empire', 'Mahavir Nagar', 'Betegaon'];

  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter(b => {
        if (selectedCategory !== 'All' && !b.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
        if (selectedArea !== 'All' && !b.area.toLowerCase().includes(selectedArea.toLowerCase())) {
          return false;
        }
        if (minRating > 0 && b.rating < minRating) return false;
        if (onlyOpenNow && !b.isOpen) return false;
        if (onlyVerified && b.trustBadge === 'listed') return false;
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = b.name.toLowerCase().includes(q);
          const matchCat = b.category.toLowerCase().includes(q);
          const matchArea = b.area.toLowerCase().includes(q);
          const matchAbout = b.about.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchArea && !matchAbout) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'popular') return (b.viewsCount || 0) - (a.viewsCount || 0);
        return a.distance.localeCompare(b.distance);
      });
  }, [businesses, selectedCategory, selectedArea, minRating, onlyOpenNow, onlyVerified, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Boisar Business Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Discover verified shops, clinics, showrooms, services and restaurants in Boisar & Tarapur.
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search business name, category..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-red-500 outline-hidden font-medium"
            />
          </div>
        </div>

        {/* Filters and Category Pills */}
        <div className="space-y-3">
          {/* Category Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filter Toolbar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Area select */}
              <select
                value={selectedArea}
                onChange={e => setSelectedArea(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 outline-hidden"
              >
                {areas.map(a => (
                  <option key={a} value={a}>Area: {a}</option>
                ))}
              </select>

              {/* Min Rating */}
              <select
                value={minRating}
                onChange={e => setMinRating(Number(e.target.value))}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 outline-hidden"
              >
                <option value={0}>All Ratings</option>
                <option value={4}>4.0+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.8}>4.8+ Top Rated</option>
              </select>

              {/* Open Now toggle */}
              <button
                onClick={() => setOnlyOpenNow(!onlyOpenNow)}
                className={`px-3 py-1.5 rounded-lg font-semibold border transition-colors flex items-center gap-1 ${
                  onlyOpenNow
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <Check className={`w-3 h-3 ${onlyOpenNow ? 'opacity-100' : 'opacity-0'}`} />
                <span>Open Now</span>
              </button>

              {/* Verified Only */}
              <button
                onClick={() => setOnlyVerified(!onlyVerified)}
                className={`px-3 py-1.5 rounded-lg font-semibold border transition-colors flex items-center gap-1 ${
                  onlyVerified
                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Verified Only</span>
              </button>
            </div>

            {/* Sort & Count */}
            <div className="flex items-center gap-2 text-slate-500 font-medium ml-auto">
              <span>{filteredBusinesses.length} results</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 outline-hidden"
              >
                <option value="rating">Sort: Highest Rated</option>
                <option value="popular">Sort: Most Popular</option>
                <option value="distance">Sort: Nearest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredBusinesses.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">No businesses match your filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try clearing some filters or searching for another term like “Hotel”, “Gym”, or “Clinic”.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedArea('All');
                setMinRating(0);
                setOnlyOpenNow(false);
                setOnlyVerified(false);
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-red-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
