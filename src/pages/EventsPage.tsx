import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Ticket, Share2, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EventsPage: React.FC = () => {
  const { events, showToast } = useApp();
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  const handleRegister = (id: string, title: string) => {
    setRegisteredIds(prev => [...prev, id]);
    showToast(`Registered successfully for "${title}"! E-Pass confirmed.`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-rose-700 to-pink-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
              What's Happening in Boisar
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Events, Exhibitions & Festivals 🎉
            </h1>
            <p className="text-xs sm:text-sm text-pink-100 max-w-xl font-medium">
              Discover Tarapur Industrial Expos, Chinchani Beach Garba nights, college tech fests, sports tournaments, and community health camps.
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => {
            const isRegistered = registeredIds.includes(event.id);
            return (
              <div
                key={event.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {event.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-amber-300 text-xs font-black px-2.5 py-1 rounded-xl">
                      {event.ticketPrice}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                      {event.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="font-semibold text-slate-900">{event.date}</span>
                        <span className="text-slate-400">•</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>By {event.organizer}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 mt-2">
                  <span className="text-xs font-semibold text-emerald-600">
                    {event.seatsLeft} Passes Left
                  </span>

                  <button
                    onClick={() => handleRegister(event.id, event.title)}
                    disabled={isRegistered}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                      isRegistered
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
                    }`}
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{isRegistered ? 'Pass Booked' : 'Book Ticket / Pass'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
