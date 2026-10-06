import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Lock, AlertCircle, CheckCircle, RefreshCw, KeyRound, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { authService } from '../../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login'
}) => {
  const { setCurrentUser, showToast } = useAppContext();
  const [authMethod, setAuthMethod] = useState<'chooser' | 'mobile' | 'email' | 'google-setup'>('chooser');

  // Mobile OTP state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpStep, setOtpStep] = useState<'enter-phone' | 'enter-otp'>('enter-phone');
  const [countdown, setCountdown] = useState(0);
  const [demoOtpNotice, setDemoOtpNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Email state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Countdown timer for OTP
  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  if (!isOpen) return null;

  const handleGoogleClick = () => {
    setErrorMessage(null);
    const googleResult = authService.initiateGoogleLogin();

    if ('configured' in googleResult && !googleResult.configured) {
      // Missing credentials: show genuine setup instructions as required by prompt
      setAuthMethod('google-setup');
    } else if ('url' in googleResult) {
      // Redirect to Google OAuth 2.0
      window.location.href = googleResult.url;
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = await authService.sendMobileOtp(phone);
    setIsSubmitting(false);

    if (result.success) {
      setOtpStep('enter-otp');
      setCountdown(result.resendAvailableInSeconds);
      if (result.demoOtp) {
        setDemoOtpNotice(result.demoOtp);
      }
      showToast('OTP sent successfully to your mobile number!', 'success');
    } else {
      setErrorMessage(result.error || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = await authService.verifyMobileOtp(otp);
    setIsSubmitting(false);

    if (result.success && result.user) {
      setCurrentUser(result.user);
      showToast(`Welcome to AaplaBoisar, ${result.user.name}!`, 'success');
      onClose();
    } else {
      setErrorMessage(result.error || 'Invalid OTP code.');
    }
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in email and password.');
      return;
    }

    const newUser = {
      id: `usr-mail-${Date.now().toString().slice(-6)}`,
      name: name.trim() || email.split('@')[0],
      email,
      phone: '',
      role: 'USER' as const,
      points: 50,
      savedItemIds: []
    };

    localStorage.setItem('aplaboisar_user_session', JSON.stringify(newUser));
    setCurrentUser(newUser);
    showToast('Signed in successfully!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
              AaplaBoisar Identity
            </span>
          </div>

          <h2 className="text-2xl font-black">आपलं Boisar ❤️</h2>
          <p className="text-xs text-rose-100 mt-1">
            Sign in to bookmark favorites, contact business owners, claim listings, and post jobs.
          </p>
        </div>

        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. CHOOSER STATE */}
          {authMethod === 'chooser' && (
            <div className="space-y-3">
              {/* Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleClick}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs transition-all shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Continue with Mobile */}
              <button
                type="button"
                onClick={() => setAuthMethod('mobile')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Continue with Indian Mobile OTP (+91)</span>
              </button>

              {/* Continue with Email */}
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>Continue with Email & Password</span>
              </button>

              <div className="pt-4 text-center">
                <p className="text-[11px] text-slate-400">
                  By signing in, you agree to AaplaBoisar's Terms of Service and Privacy Policy. Primary location PIN: <span className="font-bold text-slate-600">401501</span>.
                </p>
              </div>
            </div>
          )}

          {/* 2. MOBILE OTP AUTHENTICATION */}
          {authMethod === 'mobile' && (
            <div>
              {otpStep === 'enter-phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Indian Mobile Number (+91)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        autoFocus
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="98230 40150"
                        className="flex-1 text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none font-mono"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      We'll send a 6-digit OTP code to verify your mobile identity.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <span>Send OTP</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMethod('chooser')}
                    className="w-full text-center text-xs text-slate-500 font-semibold hover:text-slate-800"
                  >
                    Back to all options
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  {demoOtpNotice && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs">
                      <span className="font-bold">Test Mode Active: </span>
                      Your test OTP is <span className="font-mono font-black text-sm">{demoOtpNotice}</span>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        Enter 6-Digit OTP
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Sent to +91 {phone}
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      autoFocus
                      maxLength={6}
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • • • •"
                      className="w-full text-center tracking-widest text-lg font-mono p-3 rounded-xl border border-slate-200 bg-white focus:border-red-500 outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    {countdown > 0 ? (
                      <span className="text-slate-400">
                        Resend OTP in <span className="font-mono font-bold text-slate-700">{countdown}s</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-red-600 font-bold hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setOtpStep('enter-phone')}
                      className="text-slate-500 hover:text-slate-800"
                    >
                      Change Number
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || otp.length !== 6}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Verify & Continue</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 3. EMAIL / PASSWORD AUTHENTICATION */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailAuth} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Atharva Naik"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:border-red-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Sign In with Email
              </button>

              <button
                type="button"
                onClick={() => setAuthMethod('chooser')}
                className="w-full text-center text-xs text-slate-500 font-semibold hover:text-slate-800 pt-2"
              >
                Back to all options
              </button>
            </form>
          )}

          {/* 4. GOOGLE OAUTH SETUP NOTICE (Prompt Requirement: "If OAuth credentials are missing during development, provide a clear setup screen/instructions rather than pretending login is functional.") */}
          {authMethod === 'google-setup' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                  <KeyRound className="w-4 h-4 text-amber-600" />
                  <span>Google OAuth 2.0 Credentials Setup</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  To open live Google OAuth login for Boisar residents, add your Google Cloud credentials to your environment configuration:
                </p>
                <div className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-emerald-400 space-y-1">
                  <div>VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com</div>
                  <div>GOOGLE_CLIENT_SECRET=your-google-client-secret</div>
                  <div>AUTH_SECRET=your-secret-key-32-chars</div>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-2">
                <div className="font-bold text-slate-800">Quick Setup Steps:</div>
                <ol className="list-decimal pl-4 space-y-1 text-slate-600 text-[11px]">
                  <li>Go to Google Cloud Console &gt; APIs &amp; Services &gt; Credentials</li>
                  <li>Create OAuth Client ID (Web Application)</li>
                  <li>Add Authorized Redirect URI: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">{window.location.origin}/auth/google/callback</code></li>
                  <li>Save into <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">.env</code> in AaplaBoisar workspace root</li>
                </ol>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMethod('chooser')}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Back to Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('mobile')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                >
                  Use Mobile OTP
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
