import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Globe,
  Heart,
  Menu,
  X,
  PlusCircle,
  Building2,
  ShieldCheck,
  Flame,
  Radio,
  FileQuestion,
  Gift,
  AlertTriangle,
  Bus,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    selectedLocation,
    setSelectedLocation,
    currentUser,
    savedItemIds,
    setIsProfileDrawerOpen,
    setIsAskAiOpen
  } = useApp();

  const location = useLocation();
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const locationsList = [
    'Boisar',
    'Boisar West',
    'Boisar East',
    'Tarapur MIDC',
    'Ostwal Empire',
    'Mahavir Nagar',
    'Betegaon',
    'Chinchani Beach',
    'Kelve',
    'Dahanu Road'
  ];

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      {/* Top Banner / Announcement Ribbon */}
      <div className="bg-slate-900 text-slate-300 px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
            Boisar Live
          </span>
          <span className="text-slate-300 text-[11px] truncate">
            {language === 'mr'
              ? 'आपलं Boisar मध्ये आपले स्वागत आहे! नवीन ऑफर्स आणि स्थानिक अपडेट्स पहा.'
              : 'Welcome to AaplaBoisar — Boisar’s premier local discovery & services portal!'}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-md px-1.5 py-0.5 text-[11px] text-slate-300">
            <Globe className="w-3 h-3 text-slate-400" />
            <button
              onClick={() => handleLangChange('mr')}
              className={`px-1 rounded font-medium transition-colors ${
                language === 'mr' ? 'text-white font-bold bg-red-600' : 'hover:text-white'
              }`}
            >
              मराठी
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleLangChange('en')}
              className={`px-1 rounded font-medium transition-colors ${
                language === 'en' ? 'text-white font-bold bg-red-600' : 'hover:text-white'
              }`}
            >
              EN
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleLangChange('hi')}
              className={`px-1 rounded font-medium transition-colors ${
                language === 'hi' ? 'text-white font-bold bg-red-600' : 'hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>

          <Link
            to="/admin"
            className="hidden md:flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin</span>
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-xl tracking-tighter">AB</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-xl font-black text-red-600 tracking-tight">आपलं</span>
              <span className="text-xl font-black text-slate-900 tracking-tight ml-1">Boisar</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 -mt-1 tracking-tight">
              आपली माणसं, आपली ओळख
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/' ? 'text-red-600 bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Home
          </Link>
          <Link
            to="/businesses"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/businesses' ? 'text-red-600 bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Businesses
          </Link>
          <Link
            to="/services"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/services' ? 'text-red-600 bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Services
          </Link>
          <Link
            to="/jobs"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/jobs' ? 'text-red-600 bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Jobs
          </Link>
          <Link
            to="/properties"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/properties' ? 'text-red-600 bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Properties
          </Link>
          <Link
            to="/offers"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/offers' ? 'text-red-600 bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Offers
          </Link>
          <Link
            to="/events"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/events' ? 'text-red-600 bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Events
          </Link>

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-red-600 hover:bg-slate-50 transition-colors"
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isMoreMenuOpen && (
              <div
                className="absolute top-full mt-2 left-0 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in duration-150"
                onClick={() => setIsMoreMenuOpen(false)}
              >
                <Link
                  to="/boisar-today"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  <Radio className="w-4 h-4 text-red-500" />
                  <span>Boisar Today (Feed)</span>
                </Link>
                <Link
                  to="/emergency"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-rose-50 text-rose-700 text-xs font-semibold"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Emergency Hub 🚑</span>
                </Link>
                <Link
                  to="/transport"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  <Bus className="w-4 h-4 text-blue-500" />
                  <span>Transport & Cabs</span>
                </Link>
                <Link
                  to="/students"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-500" />
                  <span>Student Zone</span>
                </Link>
                <Link
                  to="/lost-found"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  <FileQuestion className="w-4 h-4 text-amber-500" />
                  <span>Lost & Found</span>
                </Link>
                <Link
                  to="/rewards"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  <Gift className="w-4 h-4 text-purple-500" />
                  <span>AaplaBoisar Rewards</span>
                </Link>
                <Link
                  to="/map"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  <MapPin className="w-4 h-4 text-teal-500" />
                  <span>Smart Boisar Map</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2.5">
          {/* Location Picker */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-800 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>{selectedLocation}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {isLocationDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50">
                <div className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase">
                  Select Boisar Area
                </div>
                {locationsList.map(loc => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setIsLocationDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedLocation === loc
                        ? 'bg-red-50 text-red-600 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ask AI button */}
          <button
            onClick={() => setIsAskAiOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r from-red-600 to-rose-600 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Saved Items */}
          <Link
            to="/favourites"
            className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            title="Saved Items"
          >
            <Heart className="w-5 h-5" />
            {savedItemIds.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                {savedItemIds.length}
              </span>
            )}
          </Link>

          {/* Business Owner Portal CTA */}
          <Link
            to="/business/dashboard"
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-red-300 text-xs font-semibold text-slate-800 hover:text-red-600 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-red-500" />
            <span>Business Hub</span>
          </Link>

          {/* User Profile Avatar / Trigger */}
          <button
            onClick={() => setIsProfileDrawerOpen(true)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200/80"
          >
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
              AN
            </div>
            <span className="text-xs font-bold hidden md:inline truncate max-w-[90px]">
              {currentUser.name}
            </span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-red-600"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 animate-in fade-in">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <Link
              to="/businesses"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-red-50 hover:text-red-600"
            >
              🏢 Businesses
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-red-50 hover:text-red-600"
            >
              🔧 Services
            </Link>
            <Link
              to="/jobs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-red-50 hover:text-red-600"
            >
              💼 Jobs
            </Link>
            <Link
              to="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-red-50 hover:text-red-600"
            >
              🏠 Properties
            </Link>
            <Link
              to="/offers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-red-50 hover:text-red-600"
            >
              🏷️ Offers
            </Link>
            <Link
              to="/events"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-red-50 hover:text-red-600"
            >
              🎉 Events
            </Link>
            <Link
              to="/emergency"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-rose-50 text-rose-700"
            >
              🚑 Emergency
            </Link>
            <Link
              to="/transport"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-blue-50 text-blue-700"
            >
              🚖 Transport Hub
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/business/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-bold text-red-600 flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Business (Free)</span>
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900"
            >
              Admin Panel ⚙️
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
