import React from 'react';
import { Gift, Coins, Sparkles, Check, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const RewardsPage: React.FC = () => {
  const { currentUser, rewardsList, redeemReward } = useApp();

  const handleRedeem = (rewardId: string) => {
    const success = redeemReward(rewardId);
    if (success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner with Points Wallet */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
              AaplaBoisar Loyalty Program
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              AaplaBoisar Coins & Rewards 🎁
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl font-medium">
              Earn coins by writing verified reviews, visiting local businesses, and sharing community updates. Redeem for real discounts across Boisar!
            </p>
          </div>

          {/* Points Balance Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl text-center shrink-0 min-w-[220px]">
            <div className="text-xs text-purple-200 font-bold uppercase tracking-wider mb-1">
              Your Available Balance
            </div>
            <div className="flex items-center justify-center gap-2 text-3xl font-black text-amber-300">
              <Coins className="w-8 h-8 text-amber-400" />
              <span>{currentUser.points}</span>
            </div>
            <div className="text-[11px] text-purple-200 mt-1">
              Lifetime Earned: {currentUser.points + 650} Coins
            </div>
          </div>
        </div>

        {/* Ways to Earn Coins */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
              +25
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Claim Local Offer</div>
              <div className="text-[11px] text-slate-500">Instant reward coins on each offer</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
              +50
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Write Verified Review</div>
              <div className="text-[11px] text-slate-500">Help fellow Boisar residents with feedback</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
              +100
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Refer a Local Shop</div>
              <div className="text-[11px] text-slate-500">When your favorite business joins</div>
            </div>
          </div>
        </div>

        {/* Available Rewards Catalogue */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-600" />
            <span>Redeem Rewards at Boisar Stores</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewardsList.map(reward => {
              const canAfford = currentUser.points >= reward.pointsCost;
              return (
                <div
                  key={reward.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        {reward.businessName}
                      </span>
                      <div className="flex items-center gap-1 font-black text-amber-600 text-xs bg-amber-50 px-2 py-0.5 rounded">
                        <Coins className="w-3.5 h-3.5 text-amber-500" />
                        <span>{reward.pointsCost} Pts</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2">
                      {reward.title}
                    </h3>

                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-xs text-slate-600 mb-3">
                      <div className="font-semibold text-slate-800">{reward.discountValue}</div>
                      <div className="text-[11px] text-slate-400">Valid for {reward.validDays} days from redemption</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRedeem(reward.id)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                      canAfford
                        ? 'bg-purple-600 hover:bg-purple-700 text-white active:scale-95'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>{canAfford ? 'Redeem Voucher' : 'Need More Coins'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
