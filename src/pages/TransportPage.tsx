import React, { useState } from 'react';
import { Bus, Car, Phone, Navigation, Clock, ShieldCheck, Plus, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TransportPage: React.FC = () => {
  const { transportOptions, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Auto' | 'Shared Cab' | 'Mumbai Express' | 'School Van'>('All');

  const filtered = activeTab === 'All'
    ? transportOptions
    : transportOptions.filter(t => t.type.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
              Boisar Commuter Hub
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Transport & Local Travel 🚖
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl font-medium">
              Verified Station Auto Stands, Boisar-Palghar Shared Eeco Cabs, Borivali & Mumbai Airport Cabs, and trusted School Vans.
            </p>
          </div>

          <button
            onClick={() => alert('Post Ride / Driver listing form opened!')}
            className="px-5 py-3 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-xs transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>List Driver / Have a Seat</span>
          </button>
        </div>

        {/* Transport Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                    {item.type}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {item.fareEstimate}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {item.name}
                </h3>

                <div className="text-xs text-slate-600 space-y-1.5 my-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-900 truncate">Route: {item.route}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Timings: {item.availableTime}</span>
                  </div>
                  {item.vehicleNumber && (
                    <div className="text-[11px] font-mono text-slate-500">
                      Vehicle: {item.vehicleNumber}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  Verified Local Operator
                </span>
                <a
                  href={`tel:${item.contact}`}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {item.contact}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
