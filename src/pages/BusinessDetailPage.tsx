import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Globe,
  Share2,
  Heart,
  Navigation,
  CheckCircle,
  Tag,
  Send,
  MessageSquare,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TrustBadgeComponent } from '../components/common/Badge';

export const BusinessDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { businesses, offers, savedItemIds, toggleFavourite, showToast } = useApp();

  const business = businesses.find(b => b.slug === slug) || businesses[0];
  const isSaved = savedItemIds.includes(business.id);

  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'photos' | 'reviews'>('about');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      name: 'Sunil Patil',
      rating: 5,
      date: '2 days ago',
      comment: 'Excellent service and genuine quality. One of the most reliable places in Boisar!',
      verified: true,
      ownerReply: 'Thank you Sunil ji for your valuable review! Always happy to serve.'
    },
    {
      id: 'rev-2',
      name: 'Pooja Raut',
      rating: 4.5,
      date: '1 week ago',
      comment: 'Clean premises, polite staff, and reasonable charges compared to other places.',
      verified: true
    }
  ]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: `Check out ${business.name} on AaplaBoisar!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'success');
    }
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryPhone.trim()) {
      showToast('Please enter your mobile number', 'error');
      return;
    }
    showToast(`Enquiry sent to ${business.name}! They will contact you shortly.`, 'success');
    setInquiryName('');
    setInquiryPhone('');
    setInquiryMessage('');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    const newRev = {
      id: `rev-${Date.now()}`,
      name: 'You (Verified Resident)',
      rating: reviewRating,
      date: 'Just now',
      comment: reviewComment,
      verified: true
    };
    setReviewsList([newRev, ...reviewsList]);
    setReviewComment('');
    showToast('Your review has been submitted & verified!', 'success');
  };

  const relatedOffers = offers.filter(o => o.businessId === business.id);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Banner / Cover */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-900">
        <img
          src={business.coverImage}
          alt={business.name}
          className="w-full h-full object-cover brightness-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Back navigation */}
        <Link
          to="/businesses"
          className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Link>

        {/* Action icons on top right */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => toggleFavourite(business.id)}
            className="p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md transition-colors"
            aria-label="Save"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'text-red-500 fill-red-500' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Profile Info in Hero */}
        <div className="absolute bottom-4 inset-x-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
          <div className="flex items-center gap-4">
            <img
              src={business.logo}
              alt={business.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <TrustBadgeComponent type={business.trustBadge} />
                <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-md">
                  {business.category}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${business.isOpen ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                  {business.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black mt-1">
                {business.name}
              </h1>
              {business.marathiName && (
                <div className="text-xs sm:text-sm text-slate-300 font-medium">
                  {business.marathiName}
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {business.rating} ({business.reviewCount} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  {business.area} ({business.distance})
                </span>
              </div>
            </div>
          </div>

          {/* Quick CTA buttons on hero */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => window.open(`tel:${business.phone}`, '_self')}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Business</span>
            </button>
            <button
              onClick={() => {
                const text = encodeURIComponent(`Hi ${business.name}, I found your listing on AaplaBoisar.`);
                window.open(`https://wa.me/${business.whatsapp}?text=${text}`, '_blank');
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + ' ' + business.address)}`, '_blank')}
              className="px-3 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 backdrop-blur-md"
              title="Get Directions"
            >
              <Navigation className="w-4 h-4" />
              <span className="hidden sm:inline">Directions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Tabs & Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto no-scrollbar">
            {(['about', 'services', 'photos', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab === 'about' ? 'About & Info' : tab === 'services' ? 'Products / Services' : tab === 'photos' ? 'Photo Gallery' : 'Customer Reviews'}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {activeTab === 'about' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
              <div>
                <h3 className="font-bold text-base text-slate-900 mb-2">About {business.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{business.about}</p>
                {business.tagline && (
                  <p className="text-xs text-red-600 font-semibold mt-2 italic bg-red-50 p-2.5 rounded-xl border border-red-100">
                    "{business.tagline}"
                  </p>
                )}
              </div>

              {/* Active Offers Highlight */}
              {relatedOffers.length > 0 && (
                <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider">
                    <Tag className="w-4 h-4 text-red-600" />
                    <span>Exclusive AaplaBoisar Offers</span>
                  </div>
                  {relatedOffers.map(off => (
                    <div key={off.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-red-100">
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{off.title}</div>
                        <div className="text-[11px] text-slate-500 font-mono">Code: {off.code} • {off.validUntil}</div>
                      </div>
                      <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                        {off.discountText}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Address</div>
                    <div>{business.address}</div>
                    {business.landmark && <div className="text-slate-400">Landmark: {business.landmark}</div>}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Opening Hours</div>
                    <div>{business.openingHours}</div>
                    <div className="text-emerald-600 font-semibold">Open Monday to Sunday</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Phone Contact</div>
                    <div className="font-mono">{business.phone}</div>
                  </div>
                </div>

                {business.website && (
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Website</div>
                      <a href={business.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        {business.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-bold text-base text-slate-900">Available Products & Services</h3>
              <div className="space-y-3">
                {business.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900">{srv.name}</div>
                      {srv.desc && <div className="text-xs text-slate-500 mt-0.5">{srv.desc}</div>}
                    </div>
                    {srv.price && (
                      <div className="text-sm font-extrabold text-emerald-700 bg-white px-3 py-1 rounded-xl border border-slate-200">
                        {srv.price}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-bold text-base text-slate-900">Store & Work Photos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {business.gallery.map((img, idx) => (
                  <div key={idx} className="h-44 rounded-2xl overflow-hidden bg-slate-100">
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">
                  Customer Reviews ({reviewsList.length})
                </h3>
                <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl">
                  <Star className="w-4 h-4 fill-emerald-600" />
                  <span>{business.rating} out of 5</span>
                </div>
              </div>

              {/* Add review form */}
              <form onSubmit={handleAddReview} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Write a Verified Review
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Your Rating:</span>
                  {[1, 2, 3, 4, 5].map(st => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setReviewRating(st)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${st <= reviewRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="Share your experience with this business in Boisar..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white outline-hidden focus:border-red-500 font-medium"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  Post Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.map(rev => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{rev.name}</span>
                        {rev.verified && (
                          <span className="flex items-center gap-0.5 text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                            <CheckCircle className="w-3 h-3" />
                            Verified Customer
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: Math.floor(rev.rating) }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>

                    {rev.ownerReply && (
                      <div className="bg-slate-50 border-l-2 border-red-500 p-2.5 rounded-r-xl mt-2 text-xs text-slate-600">
                        <span className="font-bold text-red-700 block mb-0.5">Response from Owner:</span>
                        {rev.ownerReply}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Direct Lead Enquiry Box & Map */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Enquiry Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Send Direct Enquiry</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Inquire about services, rates, availability or banquet booking.
              </p>
            </div>

            <form onSubmit={handleSendInquiry} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Your Name</label>
                <input
                  type="text"
                  value={inquiryName}
                  onChange={e => setInquiryName(e.target.value)}
                  placeholder="e.g. Ramesh Vartak"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-hidden focus:border-red-500 mt-1 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Phone Number *</label>
                <input
                  type="tel"
                  value={inquiryPhone}
                  onChange={e => setInquiryPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  required
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-hidden focus:border-red-500 mt-1 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Message / Requirement</label>
                <textarea
                  value={inquiryMessage}
                  onChange={e => setInquiryMessage(e.target.value)}
                  placeholder="What service or quotation are you looking for?"
                  rows={3}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-hidden focus:border-red-500 mt-1 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Enquiry</span>
              </button>
            </form>
          </div>

          {/* Location Map Preview Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Location in Boisar</span>
            </h4>
            <div className="h-44 rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
                alt="Map Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white/95 px-3 py-1.5 rounded-full shadow-lg text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>{business.area}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {business.address}
            </p>
            <button
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + ' ' + business.address)}`, '_blank')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>Open in Google Maps</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
