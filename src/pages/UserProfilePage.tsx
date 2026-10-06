import React, { useState } from 'react';
import { User, Phone, Mail, Award, Coins, Heart, LogOut, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const UserProfilePage: React.FC = () => {
  const { currentUser, setCurrentUser, showToast } = useApp();
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name,
      phone,
      email
    }));
    showToast('Profile information updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg">
              AN
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentUser.name}
              </h1>
              <p className="text-xs text-slate-500 font-mono">{currentUser.phone}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span>{currentUser.points} AaplaBoisar Coins</span>
                </span>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full">
                  Role: {currentUser.role}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-hidden focus:border-red-500 font-medium mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Mobile Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-hidden focus:border-red-500 font-medium mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-hidden focus:border-red-500 font-medium mt-1"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const FavouritesPage: React.FC = () => {
  const { businesses, jobs, properties, savedItemIds } = useApp();

  const savedBusinesses = businesses.filter(b => savedItemIds.includes(b.id));

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            <span>Saved & Favourites ({savedItemIds.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Your bookmarked businesses, jobs and properties in Boisar.
          </p>
        </div>

        {savedBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {savedBusinesses.map(b => (
              <div key={b.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <h3 className="font-bold text-sm text-slate-900">{b.name}</h3>
                <p className="text-xs text-slate-500">{b.category} • {b.area}</p>
                <div className="text-xs text-emerald-600 font-bold">⭐ {b.rating}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-2">
            <Heart className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-900">No saved items yet</h3>
            <p className="text-xs text-slate-500">Tap the heart icon on any business, job or flat to save it here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
