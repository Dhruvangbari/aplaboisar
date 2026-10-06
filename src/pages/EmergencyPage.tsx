import React, { useState } from 'react';
import { Phone, AlertTriangle, Shield, HeartPulse, Flame, Droplets, Users, Siren } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmergencyPage: React.FC = () => {
  const { emergencyContacts } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Ambulance' | 'Hospitals' | 'Police' | 'Fire Brigade' | 'Blood Requirements'>('All');

  const filtered = activeTab === 'All'
    ? emergencyContacts
    : emergencyContacts.filter(c => c.category === activeTab);

  const directDials = [
    { name: 'Ambulance 108', number: '108', icon: HeartPulse, color: 'bg-rose-600 hover:bg-rose-700' },
    { name: 'Police Control 112', number: '112', icon: Shield, color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Fire Brigade 101', number: '101', icon: Flame, color: 'bg-amber-600 hover:bg-amber-700' },
    { name: 'Boisar Police MIDC', number: '02525272100', icon: Siren, color: 'bg-indigo-600 hover:bg-indigo-700' }
  ];

  return (
    <div className="min-h-screen bg-rose-50/50 py-6 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Mandatory Official Emergency Disclaimer (Requirement 28) */}
        <div className="p-4 bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-2xl flex items-center gap-3 border-2 border-amber-600 shadow-md">
          <AlertTriangle className="w-5 h-5 text-slate-950 shrink-0" />
          <span>Always verify emergency contact information. For immediate emergencies in India, call 112.</span>
        </div>

        {/* Top Emergency Flash Header */}
        <div className="bg-rose-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>Emergency Services Boisar</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Emergency Hub 🚨 24x7 Direct Helpline
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
              Tap any emergency button below to dial directly. Official contacts verified under Palghar District Administration.
            </p>
          </div>
        </div>

        {/* 1-Tap Mega Direct Call Buttons (Section 15 Priority Speed requirement) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {directDials.map(dial => {
            const Icon = dial.icon;
            return (
              <a
                key={dial.name}
                href={`tel:${dial.number}`}
                className={`${dial.color} text-white p-4 sm:p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center gap-2 transform active:scale-95 transition-all`}
              >
                <Icon className="w-8 h-8 text-white" />
                <span className="font-black text-sm sm:text-base leading-tight">
                  {dial.name}
                </span>
                <span className="bg-black/20 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
                  DIAL {dial.number}
                </span>
              </a>
            );
          })}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {(['All', 'Hospitals', 'Ambulance', 'Police', 'Fire Brigade', 'Blood Requirements'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Emergency Contacts List with Giant Dial CTAs */}
        <div className="space-y-3">
          {filtered.map(contact => (
            <div
              key={contact.id}
              className="bg-white rounded-2xl border-2 border-rose-100 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-rose-100 text-rose-700 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                    {contact.category}
                  </span>
                  {contact.available24x7 && (
                    <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded">
                      24 Hours Open
                    </span>
                  )}
                </div>
                <h3 className="font-black text-base sm:text-lg text-slate-900">
                  {contact.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {contact.address}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 sm:flex-none px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  <span>Call {contact.phone}</span>
                </a>
                {contact.secondaryPhone && (
                  <a
                    href={`tel:${contact.secondaryPhone}`}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                  >
                    Alt: {contact.secondaryPhone}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Blood Donor Notice Box */}
        <div className="bg-white border border-rose-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                Register as Blood Donor in Boisar
              </h4>
              <p className="text-xs text-slate-500">
                Save lives during emergencies in Boisar Rural Hospital & Apex Trauma Care.
              </p>
            </div>
          </div>
          <button
            onClick={() => alert('Thank you! AaplaBoisar Blood Donor registration form opened.')}
            className="w-full md:w-auto px-5 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold transition-colors shrink-0"
          >
            Become a Donor
          </button>
        </div>
      </div>
    </div>
  );
};
