import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  User,
  Heart,
  MessageSquare,
  Calendar,
  Star,
  Briefcase,
  Home,
  Store,
  CreditCard,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  Building2,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileDrawer: React.FC = () => {
  const { isProfileDrawerOpen, setIsProfileDrawerOpen, currentUser, savedItemIds, showToast } = useApp();
  const navigate = useNavigate();

  if (!isProfileDrawerOpen) return null;

  const handleClose = () => setIsProfileDrawerOpen(false);

  const menuItems = [
    { label: 'My Profile', icon: User, path: '/profile' },
    { label: 'Saved Items', icon: Heart, path: '/favourites', badge: savedItemIds.length ? `${savedItemIds.length}` : undefined },
    { label: 'My Enquiries', icon: MessageSquare, path: '/business/leads' },
    { label: 'My Bookings', icon: Calendar, path: '/services' },
    { label: 'My Reviews', icon: Star, path: '/business/reviews' },
    { label: 'My Jobs', icon: Briefcase, path: '/jobs' },
    { label: 'My Properties', icon: Home, path: '/properties' },
    { label: 'My Listings', icon: Store, path: '/business/dashboard', newBadge: true },
    { label: 'My Payments', icon: CreditCard, path: '/business/subscription' },
    { label: 'Notifications', icon: Bell, path: '/boisar-today', notificationCount: 3 },
    { label: 'Help & Support', icon: HelpCircle, path: '/emergency' },
    { label: 'Admin Panel', icon: ShieldAlert, path: '/admin', adminHighlight: true },
    { label: 'Settings', icon: Settings, path: '/profile' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm h-full bg-slate-950 text-slate-100 flex flex-col justify-between shadow-2xl overflow-y-auto border-l border-slate-800">
        <div>
          {/* Top User Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-lg font-extrabold shadow-lg">
                AN
              </div>
              <div>
                <h3 className="font-bold text-base text-white tracking-tight">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {currentUser.phone}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                    <span>{currentUser.points} Pts</span>
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                    Boisar Local
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <div className="p-3 space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={handleClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    item.adminHighlight
                      ? 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${item.adminHighlight ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.newBadge && (
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                    {item.badge && (
                      <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.notificationCount && (
                      <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center">
                        {item.notificationCount}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}

            {/* Logout button */}
            <button
              onClick={() => {
                showToast('Logged out of AaplaBoisar demo account', 'info');
                handleClose();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Bottom Banner matching the screenshot */}
        <div className="p-4 m-3 bg-linear-to-b from-slate-900 to-black rounded-2xl border border-red-900/40 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-red-500" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Grow Your Business
            </h4>
          </div>
          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            List your business on AaplaBoisar & reach 50,000+ local customers in Boisar & Tarapur!
          </p>

          <button
            onClick={() => {
              handleClose();
              navigate('/business/register');
            }}
            className="w-full py-2.5 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all shadow-md shadow-red-600/30 active:scale-98"
          >
            List Your Business Now
          </button>
        </div>
      </div>
    </div>
  );
};
