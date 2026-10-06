import React, { useState } from 'react';
import { Wrench, Phone, MessageCircle, Star, ShieldCheck, Plus, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServicesPage: React.FC = () => {
  const { services, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestSkill, setRequestSkill] = useState('Electrician');
  const [requestAddress, setRequestAddress] = useState('');
  const [requestPhone, setRequestPhone] = useState('');
  const [requestDesc, setRequestDesc] = useState('');

  const categories = ['All', 'Electrician', 'Plumber', 'AC Repair', 'RO Service', 'Appliance Repair', 'Pest Control'];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestPhone.trim()) {
      showToast('Please provide your phone number', 'error');
      return;
    }
    showToast(`Service request broadcasted! 3 nearby ${requestSkill}s notified in Boisar.`, 'success');
    setShowRequestModal(false);
    setRequestAddress('');
    setRequestPhone('');
    setRequestDesc('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
              Need ↔ Available Marketplace
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Home Services & Skilled Technicians 🔧
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 max-w-xl font-medium">
              Verified electricians, plumbers, AC technicians, and repair experts in Boisar available at your doorstep in 30 minutes.
            </p>
          </div>

          <button
            onClick={() => setShowRequestModal(true)}
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Post a Service Need</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-sm text-slate-900">{service.providerName}</span>
                        {service.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] text-red-600 bg-red-50 px-2 py-0.5 rounded font-semibold">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg text-xs font-bold">
                    <Star className="w-3 h-3 fill-emerald-600" />
                    <span>{service.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2">
                  {service.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-400">Visiting / Starting:</span>
                    <span className="text-emerald-700 font-bold">{service.startingPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Availability:</span>
                    <span className="text-slate-800 font-medium">{service.availability}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Distance:</span>
                    <span className="text-slate-800">{service.distance} from Station</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => window.open(`tel:${service.phone}`, '_self')}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Call Now</span>
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`Hi ${service.providerName}, I found your service "${service.title}" on AaplaBoisar. I need help today.`);
                    window.open(`https://wa.me/${service.whatsapp}?text=${text}`, '_blank');
                  }}
                  className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Need Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="font-black text-lg text-slate-900">
              Post Your Service Requirement
            </h3>
            <p className="text-xs text-slate-500">
              Nearby verified service providers in Boisar will call or WhatsApp you directly.
            </p>

            <form onSubmit={handleSubmitRequest} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">What service do you need?</label>
                <select
                  value={requestSkill}
                  onChange={e => setRequestSkill(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-semibold"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Your Location / Address in Boisar *</label>
                <input
                  type="text"
                  required
                  value={requestAddress}
                  onChange={e => setRequestAddress(e.target.value)}
                  placeholder="e.g. B-Wing, Ostwal Empire"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={requestPhone}
                  onChange={e => setRequestPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Issue Details</label>
                <textarea
                  value={requestDesc}
                  onChange={e => setRequestDesc(e.target.value)}
                  placeholder="Briefly describe the repair or issue..."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Broadcast Need
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
