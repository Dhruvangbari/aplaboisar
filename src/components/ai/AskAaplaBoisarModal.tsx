import React, { useState } from 'react';
import { X, Sparkles, Send, Mic, Bot, User, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusinessCard } from '../common/BusinessCard';
import { JobCard } from '../common/JobCard';
import { PropertyCard } from '../common/PropertyCard';
import { BusinessItem, JobItem, PropertyItem, ServiceItem } from '../../types';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  matchedBusinesses?: BusinessItem[];
  matchedJobs?: JobItem[];
  matchedProperties?: PropertyItem[];
  matchedServices?: ServiceItem[];
  quickReplies?: string[];
}

export const AskAaplaBoisarModal: React.FC = () => {
  const { isAskAiOpen, setIsAskAiOpen, businesses, jobs, properties, services, language } = useApp();
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const initialGreeting: Message = {
    id: 'msg-init',
    sender: 'ai',
    text:
      language === 'mr'
        ? 'नमस्कार! मी AaplaBoisar AI सहाय्यक आहे. बोईसरमधील हॉटेल्स, नोकऱ्या, फ्लॅट्स, एसी रिपेअर किंवा डॉक्टरबद्दल काहीही विचारा!'
        : language === 'hi'
        ? 'नमस्ते! मैं AaplaBoisar AI सहायक हूँ। बोईसर के रेस्टोरेंट्स, जॉब्स, प्रॉपर्टी या किसी भी सर्विस के बारे में पूछें!'
        : 'Hello! I am your AaplaBoisar AI Concierge. Ask me about restaurants, jobs, flats for rent, AC repair or doctors in Boisar!',
    timestamp: 'Just now',
    quickReplies: [
      '₹500 च्या आत restaurant 🍛',
      'ITI jobs in Boisar 💼',
      '₹10,000 budget मध्ये 1 BHK 🏠',
      'AC repair जवळ ❄️',
      'Emergency Hospital 🚑'
    ]
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);

  if (!isAskAiOpen) return null;

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulating voice speech-to-text recognition
    setTimeout(() => {
      setIsListening(false);
      setQuery('मला बोईसरमध्ये ₹500 च्या आत चांगलं restaurant पाहिजे');
    }, 1200);
  };

  const processQuery = (userText: string) => {
    const textLower = userText.toLowerCase();

    let matchedB: BusinessItem[] = [];
    let matchedJ: JobItem[] = [];
    let matchedP: PropertyItem[] = [];
    let matchedS: ServiceItem[] = [];
    let replyText = '';

    if (textLower.includes('restaurant') || textLower.includes('जेवण') || textLower.includes('हॉटेल') || textLower.includes('food') || textLower.includes('500') || textLower.includes('thali')) {
      matchedB = businesses.filter(b =>
        b.category.toLowerCase().includes('food') ||
        b.category.toLowerCase().includes('dining') ||
        b.category.toLowerCase().includes('restaurant')
      );
      replyText =
        language === 'mr'
          ? 'मी तुमच्यासाठी बोईसरमधील पडताळणी केलेली आणि योग्य हॉटेल्स शोधली आहेत:'
          : language === 'hi'
          ? 'मैंने आपके लिए बोईसर में वेरिफाइड रेस्टोरेंट्स खोजे हैं:'
          : 'Here are verified restaurants in Boisar matching your request:';
    } else if (textLower.includes('job') || textLower.includes('iti') || textLower.includes('काम') || textLower.includes('नोकरी') || textLower.includes('salary') || textLower.includes('fresher') || textLower.includes('factory')) {
      matchedJ = jobs.filter(j =>
        textLower.includes('iti') ? j.jobType.includes('ITI') || j.qualification.includes('ITI') : true
      );
      replyText =
        language === 'mr'
          ? 'तारापूर एमआयडीसी आणि बोईसरमधील सध्या उपलब्ध असलेल्या verified नोकऱ्यांची यादी:'
          : language === 'hi'
          ? 'तारापुर MIDC और बोईसर में सक्रिय वेरिफाइड जॉब्स:'
          : 'Active verified job openings in Boisar & Tarapur MIDC:';
    } else if (textLower.includes('bhk') || textLower.includes('flat') || textLower.includes('घर') || textLower.includes('भाड्याने') || textLower.includes('rent') || textLower.includes('10000') || textLower.includes('plot')) {
      matchedP = properties.filter(p =>
        textLower.includes('1 bhk') ? p.bedrooms.includes('1 BHK') : true
      );
      replyText =
        language === 'mr'
          ? 'बोईसरमधील ओस्तवाल एम्पायर व इतर परिसरातील verified फ्लॅट्स आणि प्रॉपर्टीज:'
          : 'Verified properties and flats in Boisar:';
    } else if (textLower.includes('ac') || textLower.includes('repair') || textLower.includes('electrician') || textLower.includes('सर्व्हिस') || textLower.includes('दुरुस्त') || textLower.includes('plumber')) {
      matchedS = services.filter(s =>
        textLower.includes('ac') ? s.category.toLowerCase().includes('ac') : true
      );
      replyText =
        language === 'mr'
          ? 'बोईसरमध्ये उपलब्ध असलेले स्थानिक तंत्रज्ञ व कारागीर:'
          : 'Verified local technicians and home service providers in Boisar:';
    } else if (textLower.includes('hospital') || textLower.includes('emergency') || textLower.includes('डॉक्टर') || textLower.includes('दवाखाना') || textLower.includes('icu') || textLower.includes('ambulance')) {
      matchedB = businesses.filter(b =>
        b.category.toLowerCase().includes('hospital') ||
        b.category.toLowerCase().includes('medical')
      );
      replyText =
        language === 'mr'
          ? 'बोईसर व बेटेगाव परिसरातील २४ तास आपत्कालीन व मल्टिस्पेशालिटी हॉस्पिटल्स:'
          : '24x7 Emergency hospitals & healthcare facilities in Boisar:';
    } else {
      // Freeform search in business names or categories
      const directMatches = businesses.filter(b =>
        b.name.toLowerCase().includes(textLower) ||
        b.tagline.toLowerCase().includes(textLower) ||
        b.category.toLowerCase().includes(textLower) ||
        b.area.toLowerCase().includes(textLower)
      );

      if (directMatches.length > 0) {
        matchedB = directMatches;
        replyText =
          language === 'mr'
            ? `तुमच्या शोधाशी संबंधित बोईसरमधील verified माहिती सापडली:`
            : `Verified results for "${userText}" in Boisar:`;
      } else {
        // Strict grounding fallback rule (Requirement 35)
        replyText =
          language === 'mr'
            ? 'मला सध्या योग्य verified listing सापडली नाही.'
            : language === 'hi'
            ? 'मुझे वर्तमान में कोई उपयुक्त verified listing नहीं मिली।'
            : 'No matching verified listing found in Boisar at this moment.';
      }
    }

    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: replyText,
      timestamp: 'Just now',
      matchedBusinesses: matchedB.length ? matchedB : undefined,
      matchedJobs: matchedJ.length ? matchedJ : undefined,
      matchedProperties: matchedP.length ? matchedP : undefined,
      matchedServices: matchedS.length ? matchedS : undefined
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      processQuery(text);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl h-[88vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-red-600 via-rose-500 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white tracking-tight">
                  Ask AaplaBoisar AI
                </h3>
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Natural Language • मराठी • हिंदी • English
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAskAiOpen(false)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-start gap-2.5 max-w-[92%]">
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div>
                  <div
                    className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-red-600 text-white rounded-tr-xs'
                        : 'bg-slate-800 border border-slate-700/80 text-slate-100 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Quick reply suggestions */}
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.quickReplies.map(reply => (
                        <button
                          key={reply}
                          onClick={() => handleSend(reply)}
                          className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-full transition-all flex items-center gap-1 active:scale-95"
                        >
                          <span>{reply}</span>
                          <ArrowRight className="w-3 h-3 text-red-400" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Render Structured Interactive Cards */}
                  {msg.matchedBusinesses && msg.matchedBusinesses.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                      {msg.matchedBusinesses.map(b => (
                        <BusinessCard key={b.id} business={b} />
                      ))}
                    </div>
                  )}

                  {msg.matchedJobs && msg.matchedJobs.length > 0 && (
                    <div className="mt-3 space-y-2.5 w-full max-w-xl">
                      {msg.matchedJobs.map(j => (
                        <JobCard key={j.id} job={j} />
                      ))}
                    </div>
                  )}

                  {msg.matchedProperties && msg.matchedProperties.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                      {msg.matchedProperties.map(p => (
                        <PropertyCard key={p.id} property={p} />
                      ))}
                    </div>
                  )}

                  {msg.matchedServices && msg.matchedServices.length > 0 && (
                    <div className="mt-3 space-y-2 w-full max-w-xl">
                      {msg.matchedServices.map(s => (
                        <div
                          key={s.id}
                          className="bg-slate-800 border border-slate-700 p-3 rounded-xl flex items-center justify-between"
                        >
                          <div>
                            <div className="font-bold text-white text-sm">{s.title}</div>
                            <div className="text-xs text-slate-400">
                              By {s.providerName} • {s.availability}
                            </div>
                            <div className="text-xs text-emerald-400 font-bold mt-1">
                              Starting {s.startingPrice}
                            </div>
                          </div>
                          <button
                            onClick={() => window.open(`tel:${s.phone}`, '_self')}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold"
                          >
                            Call
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-800/60 p-3 rounded-2xl w-fit">
              <Bot className="w-4 h-4 text-red-500 animate-spin" />
              <span>AaplaBoisar AI is searching local records...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 md:p-4 bg-slate-950/80 border-t border-slate-800">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-2xl px-3 py-1.5 focus-within:border-red-500 transition-colors"
          >
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2 rounded-xl transition-colors ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
              title="Voice Search"
            >
              <Mic className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="उदा. ₹500 च्या आत restaurant किंवा ITI job..."
              className="flex-1 bg-transparent border-none outline-hidden text-sm text-white placeholder-slate-400 py-2"
            />

            <button
              type="submit"
              disabled={!query.trim()}
              className="p-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-red-600 text-white transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
