import React, { useState } from 'react';
import { Sparkles, Copy, Check, MessageSquare, Send, Tag, Megaphone, FileText, Bot } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BusinessAiToolsPage: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'ad' | 'offer' | 'bio' | 'reply'>('ad');

  // Ad Creator State
  const [adGoal, setAdGoal] = useState('Attract family crowds on weekends');
  const [adDiscount, setAdDiscount] = useState('20% Flat Discount');
  const [generatedAd, setGeneratedAd] = useState<{
    headline: string;
    body: string;
    whatsappMsg: string;
    caption: string;
  } | null>({
    headline: 'बोईसरकरांसाठी खास! वीकेंडला ताज्या सीफूडवर मिळवा 20% भरघोस सूट!',
    body: 'हॉटेल साई पॅलेसमध्ये स्वादिष्ट सुरमई थाळी, पापलेट फ्राय आणि स्पेशल नॉर्थ इंडियन जेवणाचा आनंद घ्या सवलतीच्या दरात. आजच टेबल बुक करा!',
    whatsappMsg: 'नमस्कार! आपलं Boisar वरील विशेष ऑफर: या वीकेंडला हॉटेल साई पॅलेसमध्ये जेवणावर 20% सूट मिळवा. टेबल बुक करण्यासाठी येथे रिप्लाय द्या.',
    caption: 'Craving authentic coastal cuisine in Boisar? 🐟🦀 Enjoy a flat 20% OFF this weekend at Hotel Sai Palace! Reserve your table now. #AaplaBoisar #BoisarFood'
  });

  // Offer Generator State
  const [offerObjective, setOfferObjective] = useState('More customers on weekdays');
  const [suggestedOffers, setSuggestedOffers] = useState([
    { title: 'Weekday Lunch Thali Combo', discount: 'Flat ₹99 OFF', code: 'MIDWEEK99', reason: 'Drives office workers & MIDC staff during 1 PM - 3 PM lull.' },
    { title: 'Buy 2 Starters Get 1 Free', discount: 'Free Item', code: 'FREEBITE', reason: 'Increases average table order value by 35% on Tuesday-Thursday.' }
  ]);

  // Review Reply State
  const [sampleReview, setSampleReview] = useState('Loved the seafood thali, very fresh and quick service!');
  const [replyTone, setReplyTone] = useState<'Warm & Grateful' | 'Professional' | 'Friendly'>('Warm & Grateful');
  const [generatedReply, setGeneratedReply] = useState('धन्यवाद! आपल्या कौतुकाबद्दल मनापासून आभार. हॉटेल साई पॅलेसमध्ये नेहमीच ताजे व चविष्ट जेवण देणे हाच आमचा प्रयत्न असतो. पुन्हा नक्की भेट द्या!');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateAd = () => {
    showToast('AI is crafting localized ad copies...', 'info');
    setTimeout(() => {
      setGeneratedAd({
        headline: `धमाका ऑफर! ${adDiscount} सह आपल्या आवडत्या पदार्थांचा आस्वाद घ्या!`,
        body: `बोईसरच्या लाडक्या हॉटेल साई पॅलेसमध्ये आता ${adDiscount}! ${adGoal}. संपूर्ण कुटुंबासह नक्की भेट द्या.`,
        whatsappMsg: `नमस्कार! आपलं Boisar विशेष: ${adDiscount}. टेबल बुकिंग व अधिक माहितीसाठी संपर्क करा.`,
        caption: `Don't miss out on Boisar's favorite deals! 🔥 Get ${adDiscount} today. Tag your food buddies! #AaplaBoisar #Boisar`
      });
      showToast('Generated fresh campaign copies with AI!', 'success');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AaplaBoisar AI Business Suite</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              AI Growth & Marketing Tools 🤖
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 max-w-xl font-medium">
              Create localized social ads, generate strategic weekday offers, and compose polite review replies in Marathi, Hindi & English.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('ad')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ad' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>AI Advertisement Creator</span>
          </button>

          <button
            onClick={() => setActiveTab('offer')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'offer' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>AI Local Offer Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('reply')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'reply' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>AI Review Reply Assistant</span>
          </button>
        </div>

        {/* 1. AI AD CREATOR */}
        {activeTab === 'ad' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-bold text-base text-slate-900">Campaign Inputs</h3>
              
              <div>
                <label className="text-xs font-bold text-slate-700">Campaign Goal / Objective</label>
                <input
                  type="text"
                  value={adGoal}
                  onChange={e => setAdGoal(e.target.value)}
                  placeholder="e.g. Attract family crowds on weekends"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Special Offer / Promotion</label>
                <input
                  type="text"
                  value={adDiscount}
                  onChange={e => setAdDiscount(e.target.value)}
                  placeholder="e.g. 20% Off on billing"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Target Audience in Boisar</label>
                <select className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 mt-1 font-semibold">
                  <option>Family Residents in Ostwal & Mahavir Nagar</option>
                  <option>Tarapur MIDC Engineers & Plant Staff</option>
                  <option>College Youth & Students in Boisar</option>
                </select>
              </div>

              <button
                onClick={handleGenerateAd}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Ad Creatives with AI</span>
              </button>
            </div>

            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-bold text-base text-slate-900">AI Generated Ad Content</h3>

              {generatedAd && (
                <div className="space-y-4">
                  {/* Headline */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-red-600">
                      <span>Ad Headline (मराठी)</span>
                      <button
                        onClick={() => handleCopy(generatedAd.headline, 'h')}
                        className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
                      >
                        {copiedKey === 'h' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="text-sm font-bold text-slate-900">{generatedAd.headline}</div>
                  </div>

                  {/* Body Text */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-red-600">
                      <span>Promotional Body Copy</span>
                      <button
                        onClick={() => handleCopy(generatedAd.body, 'b')}
                        className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
                      >
                        {copiedKey === 'b' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="text-xs text-slate-800 leading-relaxed">{generatedAd.body}</div>
                  </div>

                  {/* WhatsApp Broadcast */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                      <span>WhatsApp Broadcast Template</span>
                      <button
                        onClick={() => handleCopy(generatedAd.whatsappMsg, 'w')}
                        className="text-emerald-700 hover:text-emerald-950 flex items-center gap-1 font-semibold"
                      >
                        {copiedKey === 'w' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="text-xs text-emerald-950 leading-relaxed font-mono">{generatedAd.whatsappMsg}</div>
                  </div>

                  {/* Social Caption */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Instagram / Facebook Caption</span>
                      <button
                        onClick={() => handleCopy(generatedAd.caption, 'c')}
                        className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
                      >
                        {copiedKey === 'c' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed">{generatedAd.caption}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. AI OFFER GENERATOR */}
        {activeTab === 'offer' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Generate Promotional Offers</h3>
                <p className="text-xs text-slate-500">
                  AI analyzes Boisar shopping patterns to propose offers that maximize your profit margins.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={offerObjective}
                  onChange={e => setOfferObjective(e.target.value)}
                  className="text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                />
                <button
                  onClick={() => showToast('AI generated 2 smart offers!', 'success')}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
                >
                  Regenerate
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedOffers.map(off => (
                <div key={off.code} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{off.title}</span>
                    <span className="bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-lg">
                      {off.discount}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Why this works:</strong> {off.reason}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="font-mono text-xs font-bold text-slate-800">Coupon: {off.code}</span>
                    <button
                      onClick={() => showToast(`Offer "${off.title}" published live to AaplaBoisar Offers page!`, 'success')}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                    >
                      Publish Offer Live
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. AI REVIEW REPLY */}
        {activeTab === 'reply' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-bold text-base text-slate-900">Customer Review</h3>
              <textarea
                value={sampleReview}
                onChange={e => setSampleReview(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
              />

              <div>
                <label className="text-xs font-bold text-slate-700">Choose Reply Tone</label>
                <div className="flex items-center gap-2 mt-1">
                  {(['Warm & Grateful', 'Professional', 'Friendly'] as const).map(tone => (
                    <button
                      key={tone}
                      onClick={() => setReplyTone(tone)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                        replyTone === tone
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setGeneratedReply(`प्रिय ग्राहक, आपल्या प्रेमळ शब्दांबद्दल मनापासून धन्यवाद! आम्ही पुढील वेळीही आपल्या सेवेसाठी तत्पर असू.`);
                  showToast('Generated reply in Marathi!', 'success');
                }}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
              >
                Generate Reply
              </button>
            </div>

            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">Suggested AI Reply</h3>
                <button
                  onClick={() => handleCopy(generatedReply, 'rep')}
                  className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Reply</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                {generatedReply}
              </div>

              <button
                onClick={() => showToast('Reply published to Google & AaplaBoisar listing!', 'success')}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                Post Reply to Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
