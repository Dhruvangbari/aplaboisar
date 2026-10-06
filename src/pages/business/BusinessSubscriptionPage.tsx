import React, { useState } from 'react';
import { Check, Award, ShieldCheck, Zap, CreditCard, Sparkles, FileText, Download, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { paymentService } from '../../services/paymentService';
import { InvoiceModal } from '../../components/payment/InvoiceModal';
import { PaymentOrder } from '../../types';

export const BusinessSubscriptionPage: React.FC = () => {
  const { showToast, currentUser, updateBusinessBadge } = useAppContext();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium' | 'gold'>('gold');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<PaymentOrder | null>(null);

  const plans = [
    {
      id: 'free',
      tier: 'free' as const,
      name: 'FREE',
      priceNum: 0,
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
      tier: 'premium' as const,
      name: 'PREMIUM',
      priceNum: 199,
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
      tier: 'gold' as const,
      name: 'GOLD PARTNER',
      priceNum: 399,
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

  const handleCheckout = async (plan: typeof plans[0]) => {
    if (plan.priceNum === 0) {
      showToast('Activated on FREE Starter tier!', 'success');
      return;
    }

    setIsProcessing(true);
    showToast(`Initializing Razorpay Checkout for ${plan.name}...`, 'info');

    // 1. Create order on server / service layer
    const order = paymentService.createOrder({
      productType: 'SUBSCRIPTION',
      productName: `AaplaBoisar ${plan.name} Plan (${plan.price}/mo)`,
      amount: plan.priceNum,
      planId: plan.id,
      userId: currentUser?.id || 'usr-guest',
      customerDetails: {
        name: currentUser?.name || 'Boisar Business Owner',
        email: currentUser?.email || 'owner@aplaboisar.in',
        phone: currentUser?.phone || '+91 98230 40150',
        businessName: 'Boisar Partner Establishment',
        address: 'Boisar West, Palghar, Maharashtra - 401501'
      }
    });

    // 2. Load script and attempt checkout
    const scriptLoaded = await paymentService.loadRazorpayScript();

    if (scriptLoaded && window.Razorpay && paymentService.isLiveMode()) {
      const rzp = new window.Razorpay({
        key: paymentService.getRazorpayKeyId(),
        amount: plan.priceNum * 100,
        currency: 'INR',
        name: 'AaplaBoisar',
        description: `${plan.name} Business Subscription`,
        order_id: order.orderId,
        prefill: {
          name: currentUser?.name,
          email: currentUser?.email,
          contact: currentUser?.phone
        },
        theme: { color: '#dc2626' },
        handler: async (response: any) => {
          const verifyResult = await paymentService.verifyPaymentSignature({
            orderId: order.orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature
          });

          setIsProcessing(false);
          if (verifyResult.verified && verifyResult.order) {
            setActiveInvoiceOrder(verifyResult.order);
            showToast(`Payment verified! ${plan.name} plan activated! 🎉`, 'success');
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            showToast('Payment window dismissed.', 'info');
          }
        }
      });
      rzp.open();
    } else {
      // Test Mode Execution Simulation (Strictly tagged with TEST PAYMENT watermark)
      setTimeout(async () => {
        const simulatedPaymentId = `pay_test_${Date.now().toString().slice(-8)}`;
        const simulatedSignature = `sig_test_${Math.random().toString(36).substring(2, 12)}`;

        const verifyResult = await paymentService.verifyPaymentSignature({
          orderId: order.orderId,
          paymentId: simulatedPaymentId,
          signature: simulatedSignature
        });

        setIsProcessing(false);
        if (verifyResult.verified && verifyResult.order) {
          setActiveInvoiceOrder(verifyResult.order);
          showToast(`TEST PAYMENT verified! ${plan.name} plan activated!`, 'success');
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Test Mode Notification Indicator */}
        <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong className="font-bold">PAYMENT GATEWAY STATUS:</strong> Razorpay Test Simulation Active. All transactions generate genuine GST invoices &amp; order IDs in test mode.
            </span>
          </div>
          <span className="font-mono text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
            TEST MODE
          </span>
        </div>

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
            Join 120+ local shops, clinics, restaurants and service providers scaling their customer base in Boisar (PIN 401501).
          </p>
        </div>

        {/* 3 Pricing Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div
              key={p.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                p.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-xl ring-2 ring-red-500 scale-102 z-10'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-2xs hover:shadow-md'
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs ${
                      p.popular
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-800 text-amber-300'
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-extrabold text-base tracking-wide uppercase">
                    {p.name}
                  </h3>
                  {p.tier === 'gold' && <Sparkles className="w-5 h-5 text-amber-400" />}
                  {p.tier === 'premium' && <ShieldCheck className="w-5 h-5 text-blue-400" />}
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black tracking-tight">{p.price}</span>
                  <span className={`text-xs ${p.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                    {p.period}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${p.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                    Included Benefits:
                  </p>
                  <ul className="space-y-2.5 text-xs">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.popular ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <span className={p.popular ? 'text-slate-200' : 'text-slate-600'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleCheckout(p)}
                  className={`w-full py-3 rounded-2xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                    p.popular
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-red-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{p.priceNum === 0 ? 'Activate Free Listing' : `Pay ${p.price} via Razorpay`}</span>
                </button>
                <div className="text-center mt-2">
                  <span className="text-[10px] text-slate-400">
                    Supports UPI, GPay, PhonePe, Cards &amp; NetBanking
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GST & Payment Safety Guarantee */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">
                100% Secure Razorpay Indian Payment Gateway
              </div>
              <div className="text-xs text-slate-500">
                Encrypted with 256-bit SSL. Generates automated GST Invoice (HSN/SAC 998314). Cancel anytime.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              PIN 401501
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              Verified Merchant
            </span>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {activeInvoiceOrder && (
        <InvoiceModal
          order={activeInvoiceOrder}
          isOpen={Boolean(activeInvoiceOrder)}
          onClose={() => setActiveInvoiceOrder(null)}
        />
      )}
    </div>
  );
};

export const BusinessAdsPage: React.FC = () => {
  const { showToast, currentUser } = useAppContext();
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<PaymentOrder | null>(null);

  const bannerPackages = [
    { days: '7 Days', priceNum: 399, price: '₹399', desc: 'Ideal for weekend sales & festive discounts' },
    { days: '15 Days', priceNum: 899, price: '₹899', desc: 'Boost footfall across Boisar East & West' },
    { days: '30 Days', priceNum: 1799, price: '₹1,799', desc: 'Maximum visibility & continuous brand recall' }
  ];

  const reelPackages = [
    { count: '1 Reel', priceNum: 499, price: '₹499', views: 'Est. 5,000+ views' },
    { count: '3 Reels', priceNum: 999, price: '₹999', views: 'Est. 18,000+ views' },
    { count: '5 Reels', priceNum: 1499, price: '₹1,499', views: 'Est. 35,000+ views' },
    { count: '10 Reels', priceNum: 2499, price: '₹2,499', views: 'Est. 80,000+ views' }
  ];

  const handleBook = (title: string, priceNum: number, productType: PaymentOrder['productType']) => {
    const order = paymentService.createOrder({
      productType,
      productName: title,
      amount: priceNum,
      userId: currentUser?.id || 'usr-guest',
      customerDetails: {
        name: currentUser?.name || 'Boisar Business Owner',
        email: currentUser?.email || 'owner@aplaboisar.in',
        phone: currentUser?.phone || '+91 98230 40150',
        businessName: 'Boisar Promotional Campaign'
      }
    });

    // Test transaction verification
    setTimeout(async () => {
      const simulatedPaymentId = `pay_ad_${Date.now().toString().slice(-8)}`;
      const simulatedSignature = `sig_ad_${Math.random().toString(36).substring(2, 12)}`;

      const verifyResult = await paymentService.verifyPaymentSignature({
        orderId: order.orderId,
        paymentId: simulatedPaymentId,
        signature: simulatedSignature
      });

      if (verifyResult.verified && verifyResult.order) {
        setActiveInvoiceOrder(verifyResult.order);
        showToast(`Campaign booked: ${title}! Invoice generated.`, 'success');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            AaplaBoisar Ads &amp; Reels Promotion Marketplace 📢
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
              <p className="text-xs text-slate-500">Placement: Homepage hero banner, categories &amp; search results.</p>
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
                  type="button"
                  onClick={() => handleBook(`Banner ${pkg.days}`, pkg.priceNum, 'ADVERTISEMENT')}
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
                  type="button"
                  onClick={() => handleBook(`Reel Promotion (${reel.count})`, reel.priceNum, 'REEL_PROMOTION')}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Upload &amp; Launch Reel
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeInvoiceOrder && (
        <InvoiceModal
          order={activeInvoiceOrder}
          isOpen={Boolean(activeInvoiceOrder)}
          onClose={() => setActiveInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
