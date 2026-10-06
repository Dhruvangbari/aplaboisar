import React, { useState } from 'react';
import { FileQuestion, Plus, MapPin, Calendar, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { LostFoundItem } from '../types';

export const LostFoundPage: React.FC = () => {
  const { lostFoundList, addLostFound, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'lost' | 'found'>('All');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'lost' | 'found'>('lost');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Mobile' | 'Wallet' | 'Documents' | 'Keys' | 'Pets' | 'Bags' | 'Other'>('Wallet');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const filtered = activeTab === 'All'
    ? lostFoundList
    : lostFoundList.filter(i => i.type === activeTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !contactPhone.trim()) {
      showToast('Please provide title and contact details', 'error');
      return;
    }
    addLostFound({
      type: modalType,
      title,
      itemCategory: category,
      location,
      date: date || 'Today',
      description: desc,
      contactName: contactName || 'Local Resident',
      contactPhone
    });
    setShowModal(false);
    setTitle('');
    setLocation('');
    setDesc('');
    setContactPhone('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
              Community Helpdesk
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Lost & Found Boisar 🔍
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl font-medium">
              Lost an item at Boisar Railway station or found someone’s keys? Report here so our community can reunite them safely.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                setModalType('lost');
                setShowModal(true);
              }}
              className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Report Lost Item</span>
            </button>
            <button
              onClick={() => {
                setModalType('found');
                setShowModal(true);
              }}
              className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Report Found Item</span>
            </button>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2">
          {(['All', 'lost', 'found'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab === 'All' ? 'All Items' : tab === 'lost' ? '🔴 Lost Items' : '🟢 Found Items'}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      item.type === 'lost'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {item.type.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.itemCategory}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                  {item.title}
                </h3>

                {item.image && (
                  <div className="h-40 rounded-xl overflow-hidden mb-3 bg-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="space-y-1 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {item.contactName}
                </span>
                <a
                  href={`tel:${item.contactPhone}`}
                  className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Reporter</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="font-black text-lg text-slate-900">
              Report {modalType === 'lost' ? 'Lost Item' : 'Found Item'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Item Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Black Fastrack Watch near Bus Stand"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-semibold"
                  >
                    {['Mobile', 'Wallet', 'Documents', 'Keys', 'Pets', 'Bags', 'Other'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Date & Time</label>
                  <input
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    placeholder="e.g. Today 2 PM"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Specific Location in Boisar *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. Boisar Platform 1 Ticket Window"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Description</label>
                <textarea
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  placeholder="Key identifying details..."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700">Your Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="e.g. Nilesh"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Publish Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
