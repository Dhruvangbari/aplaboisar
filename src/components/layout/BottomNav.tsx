import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Tag, Briefcase, Grid } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { setIsProfileDrawerOpen } = useApp();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'Offers', path: '/offers', icon: Tag },
    { label: 'Jobs', path: '/jobs', icon: Briefcase }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 z-40 px-3 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 transition-colors ${
                isActive ? 'text-red-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-red-50 text-red-600 scale-105' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-semibold ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* More / Profile trigger */}
        <button
          onClick={() => setIsProfileDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <div className="p-1 rounded-xl">
            <Grid className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold">More</span>
        </button>
      </div>
    </div>
  );
};
