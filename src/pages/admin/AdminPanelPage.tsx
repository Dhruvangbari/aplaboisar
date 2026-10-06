import React, { useState } from 'react';
import {
  Compass,
  Building2,
  Users,
  CreditCard,
  Megaphone,
  Star,
  Calendar,
  BarChart3,
  Settings,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  Clock,
  MapPin,
  TrendingUp,
  AlertTriangle,
  LogOut,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { IconicPlace, BusinessItem } from '../../types';

export const AdminPanelPage: React.FC = () => {
  const {
    iconicPlaces,
    updateIconicPlace,
    addIconicPlace,
    deleteIconicPlace,
    businesses,
    updateBusinessBadge,
    showToast
  } = useApp();

  const [activeMenu, setActiveMenu] = useState<'iconic' | 'businesses' | 'dashboard' | 'ads'>('iconic');

  // Form state for Add/Edit Iconic Place (matching user's screenshot!)
  const [editingPlace, setEditingPlace] = useState<IconicPlace>(iconicPlaces[0]);
  const [formTitle, setFormTitle] = useState(iconicPlaces[0]?.title || 'Chinchani Beach');
  const [formLocation, setFormLocation] = useState(iconicPlaces[0]?.location || 'Chinchani, Boisar');
  const [formDescription, setFormDescription] = useState(
    iconicPlaces[0]?.description ||
      'Beautiful beach in Chinchani, perfect for family outing. Known for clean shore, scenic sunset views and peaceful environment.'
  );
  const [formCoverImage, setFormCoverImage] = useState(iconicPlaces[0]?.coverImage || '');
  const [formDistance, setFormDistance] = useState(iconicPlaces[0]?.distance || '15 mins');
  const [formCoordinates, setFormCoordinates] = useState(iconicPlaces[0]?.coordinates || '19.7935, 72.7612');
  const [formOrder, setFormOrder] = useState(iconicPlaces[0]?.order || 1);
  const [formStatus, setFormStatus] = useState<'Published' | 'Draft'>('Published');
  const [formTags, setFormTags] = useState<string[]>(['Beach', 'Travel', 'Family', 'Nature']);

  const handleSelectPlaceForEdit = (place: IconicPlace) => {
    setEditingPlace(place);
    setFormTitle(place.title);
    setFormLocation(place.location);
    setFormDescription(place.description);
    setFormCoverImage(place.coverImage);
    setFormDistance(place.distance);
    setFormCoordinates(place.coordinates);
    setFormOrder(place.order);
    setFormStatus(place.status);
    setFormTags(place.tags);
  };

  const handleUpdatePlace = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: IconicPlace = {
      ...editingPlace,
      title: formTitle,
      location: formLocation,
      description: formDescription,
      coverImage: formCoverImage || editingPlace.coverImage,
      distance: formDistance,
      coordinates: formCoordinates,
      order: formOrder,
      status: formStatus,
      tags: formTags
    };
    updateIconicPlace(updated);
  };

  const handleAddNewPlace = () => {
    addIconicPlace({
      title: 'New Scenic Spot',
      location: 'Boisar Coast',
      distance: '20 mins',
      description: 'Scenic viewpoint in Boisar with lush greenery.',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'],
      tags: ['Travel', 'Nature'],
      status: 'Published',
      order: iconicPlaces.length + 1,
      coordinates: '19.8000, 72.7500'
    });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'businesses', label: 'Businesses', icon: Building2 },
    { id: 'categories', label: 'Categories', icon: Compass },
    { id: 'iconic', label: 'Iconic Places', icon: MapPin, highlight: true },
    { id: 'jobs', label: 'Jobs', icon: Users },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'offers', label: 'Offers', icon: Megaphone },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'ads', label: 'Advertisements', icon: Megaphone },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Website Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* 1. Left Sidebar (matching the screenshot!) */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Logo in Admin */}
          <div className="flex items-center gap-2.5 pb-6 border-b border-slate-800 px-2">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-extrabold shadow-md">
              AB
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-black text-red-500 text-base">आपलं</span>
                <span className="font-black text-white text-base ml-1">Boisar</span>
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block -mt-1">
                Admin Panel (Secure)
              </span>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <nav className="space-y-1 mt-4">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom user / logout */}
        <div className="pt-4 border-t border-slate-800 px-2">
          <div className="text-xs font-bold text-white">Super Admin</div>
          <div className="text-[11px] text-slate-500 font-mono">admin@aplaboisar.in</div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-h-screen">
        {/* If Iconic Places Menu Selected (matches the exact screenshot!) */}
        {activeMenu === 'iconic' && (
          <div className="space-y-6">
            {/* Header with Title and Red Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Manage Iconic Places
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Curate tourist spots, sea forts & beaches displayed on Boisar homepage.
                </p>
              </div>

              <button
                onClick={handleAddNewPlace}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Place</span>
              </button>
            </div>

            {/* Table of Iconic Places (matching the screenshot!) */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3.5 pl-4">#</th>
                      <th className="p-3.5">Image</th>
                      <th className="p-3.5">Title</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Order</th>
                      <th className="p-3.5 text-right pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {iconicPlaces.map((place, idx) => (
                      <tr
                        key={place.id}
                        className={`hover:bg-slate-900/60 transition-colors ${
                          editingPlace.id === place.id ? 'bg-red-950/20' : ''
                        }`}
                      >
                        <td className="p-3.5 pl-4 font-mono text-slate-500">{idx + 1}</td>
                        <td className="p-3.5">
                          <img
                            src={place.coverImage}
                            alt=""
                            className="w-14 h-9 rounded-lg object-cover border border-slate-700"
                          />
                        </td>
                        <td className="p-3.5 font-bold text-white">{place.title}</td>
                        <td className="p-3.5 text-slate-400">{place.location}</td>
                        <td className="p-3.5">
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {place.status}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono">{place.order}</td>
                        <td className="p-3.5 text-right pr-4">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleSelectPlaceForEdit(place)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                              title="Edit Place"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteIconicPlace(place.id)}
                              className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 text-rose-400 hover:text-rose-200"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add / Edit Iconic Place Form Card (matching screenshot!) */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-5">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Add / Edit Iconic Place</span>
                <span className="text-xs text-red-400 font-mono">({editingPlace.title})</span>
              </h2>

              <form onSubmit={handleUpdatePlace} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left inputs */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-400">Title *</label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={e => setFormTitle(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white mt-1 focus:border-red-500 outline-hidden font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400">Location *</label>
                      <input
                        type="text"
                        required
                        value={formLocation}
                        onChange={e => setFormLocation(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white mt-1 focus:border-red-500 outline-hidden font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400">Description *</label>
                      <textarea
                        rows={3}
                        value={formDescription}
                        onChange={e => setFormDescription(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white mt-1 focus:border-red-500 outline-hidden font-medium"
                      />
                    </div>
                  </div>

                  {/* Right Cover Image preview & Change Image */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400">Cover Image</label>
                    <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                      <img
                        src={formCoverImage || editingPlace.coverImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt('Enter new Image URL:', formCoverImage);
                          if (url) setFormCoverImage(url);
                        }}
                        className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-lg"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Change Image</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-bold text-slate-400">Distance from Boisar</label>
                        <input
                          type="text"
                          value={formDistance}
                          onChange={e => setFormDistance(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400">Coordinates</label>
                        <input
                          type="text"
                          value={formCoordinates}
                          onChange={e => setFormCoordinates(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white mt-1 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags row */}
                <div>
                  <label className="text-xs font-bold text-slate-400">Tags</label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {formTags.map(tag => (
                      <span
                        key={tag}
                        className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1"
                      >
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status, Display Order & Submit */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-400 mr-2">Status:</span>
                      <select
                        value={formStatus}
                        onChange={e => setFormStatus(e.target.value as any)}
                        className="bg-slate-900 border border-slate-800 rounded-lg text-xs p-1.5 text-white"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-400 mr-2">Order:</span>
                      <input
                        type="number"
                        value={formOrder}
                        onChange={e => setFormOrder(Number(e.target.value))}
                        className="w-16 bg-slate-900 border border-slate-800 rounded-lg text-xs p-1.5 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectPlaceForEdit(iconicPlaces[0])}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black shadow-md shadow-red-600/30"
                    >
                      Update Place
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* If Businesses Menu Selected */}
        {activeMenu === 'businesses' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-white">
              Business Moderation & Verification 🛡️
            </h1>
            <p className="text-xs text-slate-400">
              Manage Trust Badges (🟢 Listed, 🔵 Verified, 🟡 Trusted) & approvals.
            </p>

            <div className="space-y-3">
              {businesses.map(b => (
                <div
                  key={b.id}
                  className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img src={b.logo} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-white text-sm">{b.name}</div>
                      <div className="text-xs text-slate-400">{b.category} • {b.area}</div>
                      <div className="text-[11px] text-amber-400 font-mono mt-0.5">Tier: {b.subscriptionTier.toUpperCase()}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => updateBusinessBadge(b.id, 'listed')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        b.trustBadge === 'listed'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Listed 🟢
                    </button>
                    <button
                      onClick={() => updateBusinessBadge(b.id, 'verified')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        b.trustBadge === 'verified'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Verified 🔵
                    </button>
                    <button
                      onClick={() => updateBusinessBadge(b.id, 'trusted')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        b.trustBadge === 'trusted'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Trusted 🟡
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If Dashboard Selected */}
        {activeMenu === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-white">System Admin KPIs</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 font-bold">TOTAL BUSINESSES</div>
                <div className="text-3xl font-black text-white mt-1">{businesses.length}</div>
                <div className="text-xs text-emerald-400 mt-1">+12 this week</div>
              </div>
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 font-bold">ACTIVE USERS</div>
                <div className="text-3xl font-black text-white mt-1">4,820</div>
                <div className="text-xs text-emerald-400 mt-1">Boisar locals</div>
              </div>
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 font-bold">ACTIVE ADS & REELS</div>
                <div className="text-3xl font-black text-amber-400 mt-1">18</div>
                <div className="text-xs text-slate-400 mt-1">Running live</div>
              </div>
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 font-bold">MONTHLY REVENUE</div>
                <div className="text-3xl font-black text-emerald-400 mt-1">₹48,920</div>
                <div className="text-xs text-slate-400 mt-1">Subscriptions + Ads</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
