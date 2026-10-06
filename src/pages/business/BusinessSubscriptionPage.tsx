import React, { useState } from 'react';
import { Check, Award, ShieldCheck, Zap, CreditCard, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BusinessSubscriptionPage: React.FC = () => {
  const { showToast } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium' | 'gold'>('gold');

  const plans = [
    {
      id: 'free',
      name: 'FREE',
      price: '₹0',
      period: '/month',
      badge: 'Starter',
      popular: false,
      features: [
        'Business listing on AaplaBoisar',
        'Basic profile & contact info',
        'Phone & WhatsApp click buttons',
        'Address & Google map directions',
        'Opening hours display',
        'Up to 5 business photos',
        'Customer reviews collection',
        'Standard search visibility'
      ]
    },
    {
      id: 'premium',
      name: 'PREMIUM',
      price: '₹199',
      period: '/month',
      badge: 'Most Popular',
      popular: true,
      features: [
        'Everything in FREE plan',
        '🔵 Verified Business Badge',
        'Up to 25 HD photos & videos',
        'Product & Service catalogue with prices',
        'Priority category search placement',
        'Direct customer enquiry form',
        'Instant WhatsApp lead notifications',
        'Publish 3 promotional offers',
        'Social media profile links',
        'Basic analytics & profile views'
      ]
    },
    {
      id: 'gold',
      name: 'GOLD PARTNER',
      price: '₹399',
      period: '/month',
      badge: 'Best Value',
      popular: false,
      features: [
        'Everything in PREMIUM plan',
        '🟡 Trusted Gold Partner Badge',
        'Top #1 search placement guarantee',
        'Homepage featured exposure',
        'Trending in Boisar 🔥 eligibility',
        'Unlimited photos & products',
        'AI Marketing & Ad copies suite',
        'Advanced lead management dashboard',
        'Dedicated account manager in Boisar',
        'Special Gold business landing page'
      ]
    }
  ];

  const handleCheckout = (planName: string, price: string) => {
    showToast(`Razorpay Checkout initiated for ${planName} (${price})!`, 'info');
    setTimeout(() => {
      showToast(`Payment successful! Your business is now activated on ${planName} plan! 🎉`, 'success');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-2 py-4">
          <span className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>AaplaBoisar Growth Plans</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Transparent Pricing for Boisar Businesses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Join 120+ local shops, clinics, restaurants and service providers scaling their customer base in Boisar.
          </p>
        </div>

        {/* 3 Pricing Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div
              key={p.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                p.popular
                  ? 'bg-slate-900 text-white shadow-2xl scale-102 border-2 border-red-500 ring-4 ring-red-500/20'
                  : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-lg'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 inset-x-0 mx-auto w-fit bg-red-600 text-white text-[11px] font-black px-3.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                  RECOMMENDED
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-lg">{p.name}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      p.popular ? 'bg-red-500/30 text-red-300' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black">{p.price}</span>
                  <span className={`text-xs ${p.popular ? 'text-slate-400' : 'text-slate-500'}`}>{p.period}</span>
                </div>

                <ul className="space-y-2.5 text-xs">
                  {p.features.map(feat => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.popular ? 'text-red-400' : 'text-emerald-600'}`} />
                      <span className={p.popular ? 'text-slate-200 font-medium' : 'text-slate-700'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleCheckout(p.name, p.price)}
                  className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 ${
                    p.popular
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
                      : p.id === 'gold'
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{p.price === '₹0' ? 'Get Started Free' : `Choose ${p.name}`}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BusinessAdsPage: React.FC = () => {
  const { showToast } = useApp();
  const [selectedBannerPkg, setSelectedBannerPkg] = useState('15 Days — ₹899');
  const [selectedReelPkg, setSelectedReelPkg] = useState('3 Reels — ₹999');

  const bannerPackages = [
    { days: '7 Days', price: '₹399', desc: 'Homepage & Category Top Banner' },
    { days: '15 Days', price: '₹899', desc: 'Hero Carousel + Category + Search Results' },
    { days: '30 Days', price: '₹1,799', desc: 'Full Platform Visibility + Push Notification' }
  ];

  const reelPackages = [
    { count: '1 Reel Promo', price: '₹499', views: 'Est. 5,000+ views in Boisar' },
    { count: '3 Reels Promo', price: '₹999', views: 'Est. 18,000+ views in Boisar' },
    { count: '5 Reels Promo', price: '₹1,499', views: 'Est. 35,000+ views in Boisar' },
    { count: '10 Reels Promo', price: '₹2,499', views: 'Est. 80,000+ views in Boisar' }
  ];

  const handleBook = (title: string, price: string) => {
    showToast(`Campaign booked: ${title} (${price})! Redirecting to Razorpay checkout...`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            AaplaBoisar Ads & Reels Promotion Marketplace 📢
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Directly target local residents and customers in Boisar, Tarapur MIDC, and Palghar district.
          </p>
        </div>

        {/* 1. Banner Promotions */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">1. Banner Advertisements</h2>
              <p className="text-xs text-slate-500">Placement: Homepage hero banner, categories & search results.</p>
            </div>
            <span className="text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
              High CTR Placement
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bannerPackages.map(pkg => (
              <div key={pkg.days} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-sm font-extrabold text-slate-900">{pkg.days}</div>
                  <div className="text-2xl font-black text-red-600 my-1">{pkg.price}</div>
                  <p className="text-xs text-slate-500">{pkg.desc}</p>
                </div>
                <button
                  onClick={() => handleBook(`Banner ${pkg.days}`, pkg.price)}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Book Banner Ad
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Reel Promotions */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">2. Local Reel Promotion Product 🎬</h2>
              <p className="text-xs text-slate-500">Short video reels showcased to 50,000+ local Boisar viewers.</p>
            </div>
            <span className="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200">
              Viral Local Reach
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reelPackages.map(reel => (
              <div key={reel.count} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-sm font-extrabold text-slate-900">{reel.count}</div>
                  <div className="text-2xl font-black text-rose-600 my-1">{reel.price}</div>
                  <p className="text-xs text-slate-500">{reel.views}</p>
                </div>
                <button
                  onClick={() => handleBook(reel.count, reel.price)}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Upload & Launch Reel
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
