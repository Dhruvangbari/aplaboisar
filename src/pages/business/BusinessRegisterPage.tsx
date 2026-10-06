import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, Sparkles, Building2, MapPin, Phone, Clock, Image as ImageIcon, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusinessItem } from '../../types';

export const BusinessRegisterPage: React.FC = () => {
  const { setBusinesses, showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const totalSteps = 13;

  // Form states
  const [name, setName] = useState('');
  const [marathiName, setMarathiName] = useState('');
  const [category, setCategory] = useState('Restaurants & Food');
  const [phone, setPhone] = useState('+91 ');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('Boisar West');
  const [coordinates, setCoordinates] = useState('19.8028, 72.7554');
  const [description, setDescription] = useState('');
  const [openingHours, setOpeningHours] = useState('10:00 AM – 9:00 PM');
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [paymentMethods, setPaymentMethods] = useState('UPI, Cash, Cards');

  const stepTitles = [
    'Business Name',
    'Category Selection',
    'Contact Numbers',
    'Address Details',
    'Map Location Coordinates',
    'Photos & Logo',
    'Business Description & Bio',
    'Opening Hours',
    'Products & Services',
    'Pricing Range',
    'Payment Methods Accepted',
    'Review Profile',
    'Submit & Publish'
  ];

  const handleAiBio = () => {
    if (!name.trim()) {
      showToast('Please enter your business name first in Step 1', 'error');
      return;
    }
    setDescription(`${name} is a premier ${category} establishment in ${area}, Boisar. We are dedicated to providing high quality service, authentic customer care, and trustworthy solutions for all residents in Boisar & Tarapur MIDC.`);
    showToast('AI Description generated!', 'success');
  };

  const handleFinalPublish = () => {
    const newBiz: BusinessItem = {
      id: `biz-${Date.now()}`,
      slug: (name || 'new-business').toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: name || 'New Boisar Enterprise',
      marathiName: marathiName || undefined,
      tagline: 'Trusted Local Services in Boisar',
      category: category || 'General Business',
      subcategory: 'Local Provider',
      rating: 5.0,
      reviewCount: 0,
      reviewsAvailable: false,
      distance: '0.5 km',
      address: address || 'Station Road, Boisar',
      area: area || 'Boisar West',
      pinCode: '401501',
      coordinates: { lat: 19.8028, lng: 72.7554 },
      phone: phone || '+91 98765 43210',
      whatsapp: whatsapp || '919876543210',
      openingHours: openingHours || '10:00 AM – 9:00 PM',
      isOpen: true,
      trustBadge: 'listed',
      subscriptionTier: 'free',
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
      gallery: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'],
      about: description || 'New business in Boisar',
      services: [{ name: serviceName || 'General Consultation', price: servicePrice || '₹199' }],
      priceRange: '₹₹',
      isFeatured: false,
      isTrending: false,
      trendingScore: 50,
      offersCount: 0,
      source: 'Owner Submitted Self-Registration',
      verifiedAt: new Date().toISOString(),
      verificationStatus: 'listed',
      verifiedBy: 'Pending Admin Verification Review',
      isClaimed: true
    };

    setBusinesses(prev => [newBiz, ...prev]);
    showToast(`Congratulations! "${name || 'Your Business'}" is now registered and LIVE on AaplaBoisar! 🎉`, 'success');
    navigate('/business/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        {/* Progress Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Step {step} of {totalSteps}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {Math.round((step / totalSteps) * 100)}% Completed
            </span>
          </div>

          <h1 className="text-xl font-black text-slate-900">
            {stepTitles[step - 1]}
          </h1>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-red-600 to-rose-500 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Body */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          {step === 1 && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Business Name in English *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Hotel Sai Palace"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">नाव मराठीत (Marathi Name)</label>
                <input
                  type="text"
                  value={marathiName}
                  onChange={e => setMarathiName(e.target.value)}
                  placeholder="उदा. हॉटेल साई पॅलेस"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-semibold"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">Choose Primary Category *</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
              >
                {['Restaurants & Food', 'Doctors & Hospitals', 'Gyms & Fitness', 'Salon & Beauty', 'Automobile', 'Shopping', 'Education', 'Home Services', 'Real Estate', 'Finance'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Official Mobile Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">WhatsApp Number for Customer Enquiries *</label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  placeholder="9198XXXXXXXX"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-semibold"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Full Physical Address in Boisar *</label>
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Shop No, Building Name, Street, Landmark"
                  rows={2}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Area / Locality in Boisar</label>
                <select
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-semibold"
                >
                  {['Boisar West', 'Boisar East', 'Tarapur MIDC', 'Ostwal Empire', 'Mahavir Nagar', 'Betegaon', 'Chinchani Road'].map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">Map GPS Coordinates</label>
              <input
                type="text"
                value={coordinates}
                onChange={e => setCoordinates(e.target.value)}
                placeholder="19.8028, 72.7554"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-mono font-semibold"
              />
              <p className="text-[11px] text-slate-400">
                Default centered to Boisar Station. You can drag and pin later in the dashboard.
              </p>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">Upload Store Cover Image & Logo</label>
              <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-2 bg-slate-50">
                <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-xs font-bold text-slate-700">Drag photos or click to browse</div>
                <div className="text-[11px] text-slate-400">JPG, PNG up to 5MB</div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">About Business & Services</label>
                <button
                  type="button"
                  onClick={handleAiBio}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Generate with AI</span>
                </button>
              </div>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe your specialties, experience, and facilities..."
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
              />
            </div>
          )}

          {step === 8 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">Opening & Closing Hours</label>
              <input
                type="text"
                value={openingHours}
                onChange={e => setOpeningHours(e.target.value)}
                placeholder="e.g. 10:00 AM – 9:00 PM"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
              />
            </div>
          )}

          {step === 9 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">Featured Service / Product</label>
              <input
                type="text"
                value={serviceName}
                onChange={e => setServiceName(e.target.value)}
                placeholder="e.g. Special Fish Thali / AC Repair Service"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
              />
            </div>
          )}

          {step === 10 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">Starting Price</label>
              <input
                type="text"
                value={servicePrice}
                onChange={e => setServicePrice(e.target.value)}
                placeholder="e.g. ₹299 onwards"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
              />
            </div>
          )}

          {step === 11 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">Accepted Payment Methods</label>
              <input
                type="text"
                value={paymentMethods}
                onChange={e => setPaymentMethods(e.target.value)}
                placeholder="Google Pay, PhonePe, Cash, Cards"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
              />
            </div>
          )}

          {step === 12 && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <h4 className="font-bold text-sm text-slate-900">Review Summary</h4>
              <p><strong>Name:</strong> {name || 'Not specified'}</p>
              <p><strong>Category:</strong> {category}</p>
              <p><strong>Phone:</strong> {phone}</p>
              <p><strong>Area:</strong> {area}</p>
              <p><strong>Hours:</strong> {openingHours}</p>
            </div>
          )}

          {step === 13 && (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-black text-xl text-slate-900">All Steps Completed!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click publish to make your business immediately visible to all Boisar residents.
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-md"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalPublish}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-lg"
              >
                Publish Business Live
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
