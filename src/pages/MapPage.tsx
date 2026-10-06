import React, { useState } from 'react';
import { MapPin, Navigation, Layers, Compass, Star, Phone, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MapPage: React.FC = () => {
  const { businesses, iconicPlaces, emergencyContacts } = useApp();
  const [activeLayer, setActiveLayer] = useState<'All' | 'Iconic Places' | 'Restaurants' | 'Hospitals' | 'Businesses'>('All');
  const [selectedPin, setSelectedPin] = useState<any>(businesses[0]);

  const mapPins = [
    { id: 'p1', title: 'Hotel Sai Palace', type: 'Restaurants', coords: '19.8021, 72.7562', area: 'Boisar West (Near Station)', rating: 4.8, phone: '+91 98230 45671' },
    { id: 'p2', title: 'Apex Multispeciality Hospital', type: 'Hospitals', coords: '19.8101, 72.7650', area: 'Tarapur Road', rating: 4.9, phone: '02525-272890' },
    { id: 'p3', title: 'Chinchani Beach', type: 'Iconic Places', coords: '19.7935, 72.7612', area: 'Chinchani, Boisar', rating: 4.9, dist: '15 mins' },
    { id: 'p4', title: 'FitZone Gym', type: 'Businesses', coords: '19.8055, 72.7601', area: 'Mahavir Nagar', rating: 4.9, phone: '+91 97654 32109' },
    { id: 'p5', title: 'Kelve Beach & Fort', type: 'Iconic Places', coords: '19.6200, 72.7300', area: 'Kelve Coast', rating: 4.8, dist: '25 mins' },
    { id: 'p6', title: 'Tarapur MIDC Main Gate', type: 'Businesses', coords: '19.8150, 72.7710', area: 'Industrial Area', rating: 4.7 }
  ];

  const filteredPins = activeLayer === 'All'
    ? mapPins
    : mapPins.filter(p => p.type === activeLayer);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Top Map Control Bar */}
      <div className="bg-slate-950/90 border-b border-slate-800 p-4 px-6 flex flex-wrap items-center justify-between gap-4 z-20">
        <div>
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-red-500 animate-spin" />
            <span>Smart Boisar Interactive Map</span>
          </h1>
          <p className="text-xs text-slate-400">
            Center: Boisar Railway Station (19.8028° N, 72.7554° E) • Palghar District
          </p>
        </div>

        {/* Layer Switches */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(['All', 'Iconic Places', 'Restaurants', 'Hospitals', 'Businesses'] as const).map(layer => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeLayer === layer
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map View Area */}
      <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden min-h-[600px]">
        {/* Interactive Map Visual Simulator */}
        <div className="flex-1 relative bg-[#1a2332] overflow-hidden flex items-center justify-center">
          {/* Simulated satellite / vector road grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Simulated Coastline of Arabian Sea & Boisar Main Lines */}
          <div className="absolute left-4 top-0 bottom-0 w-24 bg-sky-950/40 border-r border-sky-800/40" />
          <div className="absolute left-8 top-12 text-[10px] text-sky-400 font-bold uppercase tracking-widest rotate-90 origin-top-left">
            Arabian Sea (Chinchani Beach Coast)
          </div>

          {/* Railway Line overlay */}
          <div className="absolute top-0 bottom-0 left-1/3 w-2 border-r-2 border-dashed border-amber-500/50" />
          <div className="absolute top-6 left-[35%] text-[10px] text-amber-400 font-mono font-bold bg-black/60 px-2 py-0.5 rounded">
            Western Railway Line 🚆
          </div>

          {/* Map Pins Display */}
          <div className="relative w-full h-full p-8 max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-8">
            {filteredPins.map((pin, index) => (
              <div
                key={pin.id}
                onClick={() => setSelectedPin(pin)}
                className="group cursor-pointer flex flex-col items-center transform hover:scale-110 transition-all z-10"
              >
                <div
                  className={`p-3 rounded-2xl shadow-xl flex items-center justify-center border-2 ${
                    selectedPin?.id === pin.id
                      ? 'bg-red-600 text-white border-white scale-110 ring-4 ring-red-500/30'
                      : pin.type === 'Hospitals'
                      ? 'bg-rose-500 text-white border-rose-300'
                      : pin.type === 'Iconic Places'
                      ? 'bg-amber-500 text-slate-900 border-amber-300'
                      : 'bg-blue-600 text-white border-blue-300'
                  }`}
                >
                  <MapPin className="w-5 h-5 fill-current" />
                </div>
                <div className="mt-1.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-bold text-white shadow-md border border-white/10 text-center max-w-[130px] truncate">
                  {pin.title}
                </div>
              </div>
            ))}
          </div>

          {/* Floating Compass / Geolocation trigger */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
            <button
              onClick={() => alert('Geolocation permission granted: Centered to current user location in Boisar.')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white shadow-xl border border-slate-700 transition-colors flex items-center gap-2 text-xs font-bold"
            >
              <Navigation className="w-4 h-4 text-red-500" />
              <span>Locate Me</span>
            </button>
          </div>
        </div>

        {/* Selected Location Card Sidebar */}
        {selectedPin && (
          <div className="w-full md:w-80 bg-slate-950 p-6 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between shadow-2xl z-20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">
                  {selectedPin.type}
                </span>
                {selectedPin.rating && (
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{selectedPin.rating}</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-black text-xl text-white">{selectedPin.title}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{selectedPin.area}</span>
                </p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                  GPS: {selectedPin.coords}
                </p>
              </div>

              {selectedPin.dist && (
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-amber-300 font-semibold">
                  🚗 Approx. {selectedPin.dist} travel from Boisar Railway Station
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              {selectedPin.phone && (
                <a
                  href={`tel:${selectedPin.phone}`}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {selectedPin.phone}</span>
                </a>
              )}
              <button
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPin.title + ' Boisar')}`, '_blank')}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigate in Google Maps</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
