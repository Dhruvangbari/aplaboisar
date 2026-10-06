import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Tag, Briefcase, Home, Wrench, Utensils, Stethoscope, Scissors, Car, Landmark, ShoppingBag, GraduationCap, Grid } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BusinessCard } from '../components/common/BusinessCard';
import { JobCard } from '../components/common/JobCard';
import { PropertyCard } from '../components/common/PropertyCard';
import { OfferCard } from '../components/common/OfferCard';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const { businesses, jobs, properties, offers } = useApp();

  const q = searchTerm.toLowerCase();

  const matchedBusinesses = businesses.filter(b =>
    !q || b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.area.toLowerCase().includes(q) || b.about.toLowerCase().includes(q)
  );

  const matchedJobs = jobs.filter(j =>
    !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.tags.some(t => t.toLowerCase().includes(q))
  );

  const matchedProperties = properties.filter(p =>
    !q || p.title.toLowerCase().includes(q) || p.bedrooms.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
  );

  const matchedOffers = offers.filter(o =>
    !q || o.title.toLowerCase().includes(o.title) || o.businessName.toLowerCase().includes(q)
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Search Input Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search businesses, jobs, properties, offers in Boisar..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 focus:bg-white rounded-2xl border border-slate-200 focus:border-red-500 outline-hidden text-sm sm:text-base font-semibold"
            />
          </div>
          {searchTerm && (
            <div className="text-xs text-slate-500 mt-2 font-medium">
              Showing results for: <span className="text-red-600 font-bold">"{searchTerm}"</span>
            </div>
          )}
        </div>

        {/* Results Sections */}
        {matchedBusinesses.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center justify-between">
              <span>Matching Businesses ({matchedBusinesses.length})</span>
              <Link to="/businesses" className="text-xs text-red-600">View All</Link>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {matchedBusinesses.slice(0, 4).map(b => (
                <BusinessCard key={b.id} business={b} />
              ))}
            </div>
          </div>
        )}

        {matchedJobs.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center justify-between">
              <span>Matching Jobs ({matchedJobs.length})</span>
              <Link to="/jobs" className="text-xs text-red-600">View All</Link>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedJobs.slice(0, 3).map(j => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          </div>
        )}

        {matchedProperties.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center justify-between">
              <span>Matching Properties ({matchedProperties.length})</span>
              <Link to="/properties" className="text-xs text-red-600">View All</Link>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedProperties.slice(0, 3).map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

        {matchedOffers.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center justify-between">
              <span>Matching Offers ({matchedOffers.length})</span>
              <Link to="/offers" className="text-xs text-red-600">View All</Link>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedOffers.slice(0, 3).map(o => (
                <OfferCard key={o.id} offer={o} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CategoriesPage: React.FC = () => {
  const categoriesList = [
    { title: 'Restaurants & Food', icon: Utensils, count: '65+ listings', color: 'bg-orange-50 text-orange-600' },
    { title: 'Doctors & Hospitals', icon: Stethoscope, count: '34+ listings', color: 'bg-blue-50 text-blue-600' },
    { title: 'Salon & Beauty', icon: Scissors, count: '48+ listings', color: 'bg-rose-50 text-rose-600' },
    { title: 'Automobile & Garages', icon: Car, count: '29+ listings', color: 'bg-emerald-50 text-emerald-600' },
    { title: 'Real Estate & Rentals', icon: Home, count: '85+ listings', color: 'bg-indigo-50 text-indigo-600' },
    { title: 'Finance, Loans & CA', icon: Landmark, count: '22+ listings', color: 'bg-amber-50 text-amber-600' },
    { title: 'Shopping & Malls', icon: ShoppingBag, count: '74+ listings', color: 'bg-purple-50 text-purple-600' },
    { title: 'Education & Classes', icon: GraduationCap, count: '38+ listings', color: 'bg-teal-50 text-teal-600' },
    { title: 'Home Services', icon: Wrench, count: '52+ listings', color: 'bg-cyan-50 text-cyan-600' },
    { title: 'Industrial & MIDC', icon: Briefcase, count: '120+ units', color: 'bg-slate-100 text-slate-800' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Browse All Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore businesses, services, and amenities catalogued in Boisar.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoriesList.map(cat => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                to={`/businesses?category=${encodeURIComponent(cat.title.split(' ')[0])}`}
                className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-red-300 shadow-2xs hover:shadow-lg transition-all flex flex-col items-center text-center group"
              >
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xs`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-red-600 leading-snug">
                  {cat.title}
                </h3>
                <span className="text-[11px] text-slate-400 mt-1 font-medium">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
