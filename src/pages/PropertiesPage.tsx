import React, { useState } from 'react';
import { Home, Search, PlusCircle, Building, Filter, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/common/PropertyCard';

export const PropertiesPage: React.FC = () => {
  const { properties } = useApp();
  const [activeTxType, setActiveTxType] = useState<'All' | 'Buy' | 'Rent'>('All');
  const [selectedType, setSelectedType] = useState('All');

  const propertyTypes = ['All', 'Flats', 'Shops', 'Plots', 'Commercial'];

  const filteredProperties = properties.filter(prop => {
    if (activeTxType !== 'All' && prop.transactionType !== activeTxType) return false;
    if (selectedType !== 'All' && prop.propertyType !== selectedType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-amber-400 text-slate-900 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              RERA Verified Listings
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Boisar Real Estate & Rentals 🏠
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
              Discover ready-to-move 1 & 2 BHK flats in Ostwal Empire, Tata Housing, commercial shops on Station Road, and CIDCO NA plots.
            </p>
          </div>

          <button
            onClick={() => alert('Post Property Listing form opened!')}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-md shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Your Property Free</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          {/* Buy vs Rent pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {(['All', 'Buy', 'Rent'] as const).map(tx => (
              <button
                key={tx}
                onClick={() => setActiveTxType(tx)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTxType === tx
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tx === 'All' ? 'All Listings' : tx === 'Buy' ? 'Buy Property' : 'Rent / Lease'}
              </button>
            ))}
          </div>

          {/* Types */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {propertyTypes.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedType === t
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};
