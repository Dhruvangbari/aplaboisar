import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#12080a] text-slate-300 border-t border-red-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-10 border-b border-white/10">
          {/* Col 1 & 2: Brand & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                <span className="font-extrabold text-xl">AB</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="text-2xl font-black text-red-500">आपलं</span>
                  <span className="text-2xl font-black text-white ml-1">Boisar</span>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  आपली माणसं, आपली ओळख
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Boisar’s most trusted local directory and digital ecosystem for businesses, services, jobs, properties, offers, transport, and community updates.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600/20 text-slate-400 hover:text-red-400 border border-white/10 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600/20 text-slate-400 hover:text-red-400 border border-white/10 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600/20 text-slate-400 hover:text-red-400 border border-white/10 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="YouTube"
              >
                YT
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600/20 text-slate-400 hover:text-red-400 border border-white/10 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="X"
              >
                X
              </a>
              <a
                href="https://wa.me/919823045671"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-emerald-600/20 text-slate-400 hover:text-emerald-400 border border-white/10 flex items-center justify-center transition-colors"
                aria-label="WhatsApp Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-red-400 transition-colors">Home</Link></li>
              <li><Link to="/businesses" className="hover:text-red-400 transition-colors">Directory</Link></li>
              <li><Link to="/services" className="hover:text-red-400 transition-colors">Services</Link></li>
              <li><Link to="/jobs" className="hover:text-red-400 transition-colors">Jobs</Link></li>
              <li><Link to="/properties" className="hover:text-red-400 transition-colors">Properties</Link></li>
              <li><Link to="/offers" className="hover:text-red-400 transition-colors">Offers</Link></li>
              <li><Link to="/events" className="hover:text-red-400 transition-colors">Events</Link></li>
              <li><Link to="/#iconic-places" className="hover:text-red-400 transition-colors">Iconic Places</Link></li>
            </ul>
          </div>

          {/* Col 4: For Users */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              For Users
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/search" className="hover:text-red-400 transition-colors">Search Boisar</Link></li>
              <li><Link to="/favourites" className="hover:text-red-400 transition-colors">Saved Items</Link></li>
              <li><Link to="/rewards" className="hover:text-red-400 transition-colors">AaplaBoisar Rewards</Link></li>
              <li><Link to="/emergency" className="hover:text-rose-400 transition-colors">Emergency Hub</Link></li>
              <li><Link to="/transport" className="hover:text-red-400 transition-colors">Transport & Auto</Link></li>
              <li><Link to="/lost-found" className="hover:text-red-400 transition-colors">Lost & Found</Link></li>
              <li><Link to="/students" className="hover:text-red-400 transition-colors">Student Zone</Link></li>
            </ul>
          </div>

          {/* Col 5: For Businesses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              For Businesses
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/business/register" className="text-red-400 font-semibold hover:underline">List Your Business</Link></li>
              <li><Link to="/business/dashboard" className="hover:text-red-400 transition-colors">Business Dashboard</Link></li>
              <li><Link to="/business/ads" className="hover:text-red-400 transition-colors">Advertising & Reels</Link></li>
              <li><Link to="/business/subscription" className="hover:text-red-400 transition-colors">Pricing & Plans</Link></li>
              <li><Link to="/business/ai-tools" className="hover:text-amber-400 transition-colors">AI Marketing Tools</Link></li>
              <li><Link to="/admin" className="hover:text-amber-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Col 6: App Download & QR Code */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Download App
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => alert('AaplaBoisar Android APK / PWA download started!')}
                className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left"
              >
                <div className="text-red-500 font-black text-lg">▶</div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400">Get it on</div>
                  <div className="text-xs font-bold text-white">Google Play</div>
                </div>
              </button>

              <button
                onClick={() => alert('AaplaBoisar iOS App Store preview!')}
                className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left"
              >
                <div className="text-white font-black text-lg"></div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400">Download on the</div>
                  <div className="text-xs font-bold text-white">App Store</div>
                </div>
              </button>
            </div>

            {/* Simulated QR Code */}
            <div className="p-2.5 bg-white rounded-xl flex items-center justify-center gap-3">
              <div className="w-16 h-16 bg-slate-900 rounded p-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-4 h-4 bg-white" />
                  <div className="w-4 h-4 bg-white" />
                </div>
                <div className="w-full h-1 bg-white my-auto" />
                <div className="flex justify-between">
                  <div className="w-4 h-4 bg-white" />
                  <div className="w-4 h-4 bg-red-500" />
                </div>
              </div>
              <div className="text-[11px] text-slate-800 font-bold leading-tight">
                Scan for <br />
                <span className="text-red-600">AaplaBoisar</span> <br />
                PWA Web App
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/#privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/#terms" className="hover:text-slate-300">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/#disclaimer" className="hover:text-slate-300">Disclaimer</Link>
            <span>•</span>
            <Link to="/#sitemap" className="hover:text-slate-300">Sitemap</Link>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Boisar, Maharashtra</span>
          </div>

          <div className="flex items-center gap-4">
            <span>© 2026 Aapla Boisar. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
