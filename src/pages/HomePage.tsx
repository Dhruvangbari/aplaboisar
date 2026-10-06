import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Mic,
  Utensils,
  Stethoscope,
  Scissors,
  Car,
  Home,
  Landmark,
  ShoppingBag,
  GraduationCap,
  Wrench,
  Briefcase,
  Grid,
  ChevronRight,
  TrendingUp,
  Tag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Percent,
  Clock,
  Coins
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { BusinessCard } from '../components/common/BusinessCard';
import { OfferCard } from '../components/common/OfferCard';
import { IconicPlaceCard } from '../components/common/IconicPlaceCard';
import { JobCard } from '../components/common/JobCard';

export const HomePage: React.FC = () => {
  const { language, businesses, iconicPlaces, offers, jobs, setIsAskAiOpen, showToast } = useApp();
  const t = getTranslation(language);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/businesses');
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Salon near me');
      showToast('Voice detected: "Salon near me"', 'info');
      navigate('/search?q=Salon');
    }, 1200);
  };

  const popularTags = [
    { label: 'Restaurant', query: 'Restaurant' },
    { label: 'Salon', query: 'Salon' },
    { label: 'Gym', query: 'Gym' },
    { label: 'Doctor', query: 'Hospital' },
    { label: 'Mobile Shop', query: 'Mobile' },
    { label: 'Real Estate', query: 'Flat' },
    { label: 'Home Loan', query: 'Loan' },
    { label: 'CA', query: 'CA' }
  ];

  const quickCategories = [
    { id: 'food', name: 'Restaurants & Food', icon: Utensils, color: 'bg-orange-50 text-orange-600', path: '/businesses?category=Restaurants' },
    { id: 'health', name: 'Doctors & Hospitals', icon: Stethoscope, color: 'bg-blue-50 text-blue-600', path: '/businesses?category=Doctors' },
    { id: 'salon', name: 'Salon & Beauty', icon: Scissors, color: 'bg-rose-50 text-rose-600', path: '/businesses?category=Salon' },
    { id: 'auto', name: 'Automobile', icon: Car, color: 'bg-emerald-50 text-emerald-600', path: '/businesses?category=Automobile' },
    { id: 'property', name: 'Real Estate', icon: Home, color: 'bg-indigo-50 text-indigo-600', path: '/properties' },
    { id: 'finance', name: 'Finance & Loans', icon: Landmark, color: 'bg-amber-50 text-amber-600', path: '/businesses?category=Finance' },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'bg-purple-50 text-purple-600', path: '/businesses?category=Shopping' },
    { id: 'edu', name: 'Education', icon: GraduationCap, color: 'bg-teal-50 text-teal-600', path: '/businesses?category=Education' },
    { id: 'services', name: 'Home Services', icon: Wrench, color: 'bg-cyan-50 text-cyan-600', path: '/services' },
    { id: 'jobs', name: 'Jobs', icon: Briefcase, color: 'bg-sky-50 text-sky-600', path: '/jobs' },
    { id: 'more', name: 'More', icon: Grid, color: 'bg-slate-100 text-slate-700', path: '/categories' }
  ];

  const popularCarouselCategories = [
    { title: 'Gyms & Fitness', count: '14+ Centers', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80', query: 'Gym' },
    { title: 'Pathology & Diagnostic', count: '22+ Labs', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80', query: 'Pathology' },
    { title: 'Salon & Parlour', count: '38+ Salons', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80', query: 'Salon' },
    { title: 'Clothing & Fashion', count: '45+ Stores', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80', query: 'Shopping' },
    { title: 'Dance & Music', count: '12+ Academies', image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=400&q=80', query: 'Education' },
    { title: 'Travel & Tours', count: '18+ Agencies', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80', query: 'Transport' }
  ];

  const loansList = [
    { title: 'Home Loan', desc: 'From 8.4% ROI • Zero Processing Fee', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80', tag: 'Lowest Rate' },
    { title: 'Personal Loan', desc: 'In 24h • Instant Bank Transfer', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80', tag: 'Fast Approval' },
    { title: 'Business Loan', desc: '₹50L Limit for Tarapur MIDC', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80', tag: 'SME / MSME' },
    { title: 'Gold Loan', desc: 'Instant Cash in 15 mins at Station', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80', tag: 'Instant Cash' }
  ];

  const trendingBusinesses = businesses.filter(b => b.isTrending || b.rating >= 4.7).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 lg:pb-12">
      {/* 1. HERO SECTION WITH BOISAR STATION VISUAL (MATCHING SCREENSHOT) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-700 via-rose-700 to-red-900 text-white">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Headline & Search Area */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>Boisar’s Official Hyperlocal Portal</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight md:leading-tight text-white">
                {t.heroHeadline}
              </h1>

              <p className="text-sm sm:text-base text-rose-100 font-medium max-w-xl leading-relaxed">
                {t.heroSubheadline}
              </p>

              {/* Large Smart Search Bar */}
              <div className="bg-white rounded-2xl p-2 shadow-2xl border border-white/20 flex flex-col gap-2">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <div className="pl-3 text-slate-400">
                    <Search className="w-5 h-5 text-red-500" />
                  </div>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="flex-1 text-slate-800 placeholder-slate-400 text-sm md:text-base outline-hidden bg-transparent py-2.5 font-medium"
                  />

                  {/* Voice Search Button */}
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className={`p-2.5 rounded-xl transition-all ${
                      isListening ? 'bg-red-600 text-white animate-pulse' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    title="Voice Search"
                  >
                    <Mic className="w-5 h-5" />
                  </button>

                  {/* Red Search CTA Button */}
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 sm:px-8 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-red-600/30 active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{t.searchBtn}</span>
                  </button>
                </form>

                {/* Popular Search Tags */}
                <div className="flex items-center gap-1.5 px-3 pt-1 pb-1 flex-wrap text-xs">
                  <span className="text-slate-400 font-semibold">{t.popularTags}</span>
                  {popularTags.map(tag => (
                    <button
                      key={tag.label}
                      onClick={() => navigate(`/search?q=${tag.query}`)}
                      className="text-slate-600 hover:text-red-600 hover:bg-red-50 bg-slate-100 px-2.5 py-0.5 rounded-full transition-colors font-medium text-[11px]"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Hero Visual Banner (Boisar Railway Station board & train from screenshot) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=800&q=80"
                  alt="Boisar Station & Local Landscape"
                  className="w-full h-72 sm:h-80 object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Simulated Yellow Railway Signboard: "बोईसर BOISAR" */}
                <div className="absolute top-4 left-4 bg-amber-400 text-black px-4 py-2 rounded-xl shadow-lg border-2 border-black font-black flex items-center gap-3">
                  <div className="flex flex-col leading-tight">
                    <span className="text-base tracking-wide">बोईसर</span>
                    <span className="text-lg tracking-wider">BOISAR</span>
                  </div>
                  <div className="h-7 w-0.5 bg-black/40" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
                    Western <br />Railway
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 inset-x-4 text-white">
                  <div className="flex items-center justify-between text-xs font-semibold bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                    <div>
                      <div className="text-amber-400 font-bold">120+ Active Businesses</div>
                      <div className="text-slate-300 text-[11px]">Tarapur MIDC & Boisar Hub</div>
                    </div>
                    <Link
                      to="/businesses"
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-xl text-white text-xs font-bold transition-colors"
                    >
                      Explore All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mt-8">
        {/* 2. QUICK CATEGORY ICONS (ROUNDED SOFT PASTEL SQUARES) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Categories in Boisar
            </h2>
            <Link to="/categories" className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2.5 sm:gap-3">
            {quickCategories.map(cat => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to={cat.path}
                  className="group flex flex-col items-center text-center p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-red-300 shadow-2xs hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 group-hover:text-red-600 mt-2 line-clamp-2 leading-tight">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. POPULAR CATEGORIES CAROUSEL WITH PHOTOS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-5 bg-red-600 rounded-full" />
                <span>Popular Categories</span>
              </h2>
            </div>
            <Link to="/categories" className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            {popularCarouselCategories.map(item => (
              <div
                key={item.title}
                onClick={() => navigate(`/search?q=${item.query}`)}
                className="group flex-none w-44 sm:w-52 bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer shadow-2xs hover:shadow-lg transition-all"
              >
                <div className="h-28 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-red-600 truncate">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {item.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. ICONIC PLACES IN BOISAR (MATCHING EXACT SCREENSHOT: Chinchani Beach, Kelve Beach, Shirgaon Fort, Tarapur Fort, Dahanu) */}
        <section id="iconic-places" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-5 bg-red-600 rounded-full" />
                <span>{t.iconicTitle}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {t.iconicSubtitle}
              </p>
            </div>
            <Link to="/map" className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
            {iconicPlaces.map(place => (
              <IconicPlaceCard
                key={place.id}
                place={place}
                onClick={() => navigate('/map')}
              />
            ))}
          </div>
        </section>

        {/* 5. LOANS IN BOISAR (FROM SCREENSHOT) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-5 bg-red-600 rounded-full" />
                <span>Loans in Boisar</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Lowest Interest Rates • Instant Disbursal • Local Bank Partners
              </p>
            </div>
            <Link to="/businesses?category=Finance" className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5">
              <span>Explore</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {loansList.map(loan => (
              <div
                key={loan.title}
                onClick={() => navigate('/businesses?category=Finance')}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-2xs hover:shadow-xl transition-all duration-300 bg-slate-900 h-44"
              >
                <img
                  src={loan.image}
                  alt={loan.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute top-3 left-3 bg-red-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {loan.tag}
                </div>

                <div className="absolute bottom-3 inset-x-3 text-white">
                  <h3 className="font-bold text-base group-hover:text-amber-300 transition-colors">
                    {loan.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                    {loan.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. GROW YOUR BUSINESS IN BOISAR BANNER (FROM SCREENSHOT) */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-900 via-rose-800 to-amber-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <span className="bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                Partner with AaplaBoisar
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Grow Your Business in Boisar
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 max-w-lg">
                Reach thousands of local customers in Boisar, Tarapur MIDC, Palghar & Dahanu directly via banners, search priority & reels.
              </p>

              <div className="pt-2">
                <Link
                  to="/business/ads"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md active:scale-95"
                >
                  <span>Advertise Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Pricing Packages Cards matching screenshot */}
            <div className="md:col-span-5 bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2.5 text-xs">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Popular Ad Packages
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="font-semibold text-slate-200">7 Days Promotion</span>
                <span className="font-mono font-bold text-amber-300 text-sm">₹299</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="font-semibold text-slate-200">15 Days Promotion</span>
                <span className="font-mono font-bold text-amber-300 text-sm">₹599</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-semibold text-slate-200">30 Days Promotion</span>
                <span className="font-mono font-bold text-amber-300 text-sm">₹999</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. TRENDING IN BOISAR 🔥 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-5 bg-red-600 rounded-full" />
                <span>{t.trendingTitle}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {t.trendingSubtitle}
              </p>
            </div>
            <Link to="/businesses" className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingBusinesses.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </section>

        {/* 8. SMART LOCAL OFFERS 🏷️ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-5 bg-red-600 rounded-full" />
                <span>{t.offersTitle}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {t.offersSubtitle}
              </p>
            </div>
            <Link to="/offers" className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.slice(0, 3).map(offer => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>

        {/* 9. BOISAR–TARAPUR ACTIVE JOBS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-5 bg-red-600 rounded-full" />
                <span>Boisar–Tarapur Jobs</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Chemical plants, ITI, Steel mills, Accounts and Fresher openings in MIDC
              </p>
            </div>
            <Link to="/jobs" className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5">
              <span>View All Jobs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.slice(0, 3).map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>

        {/* 10. ASK AI INTERACTIVE TEASER */}
        <section className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask AaplaBoisar AI</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              बोईसरबद्दल काहीही विचारा — मराठी, हिंदी किंवा इंग्लिशमध्ये!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              “₹500 च्या आत restaurant”, “AC repair करणारा जवळ”, “ITI job in Boisar” — AI will instantly search and show curated options!
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={() => setIsAskAiOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Start AI Chat Now</span>
              </button>
              <Link
                to="/emergency"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 font-bold text-xs sm:text-sm transition-all"
              >
                Emergency 1-Tap Call 🚑
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
