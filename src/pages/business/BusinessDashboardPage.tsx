import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Eye,
  Phone,
  MessageCircle,
  Navigation,
  MessageSquare,
  Sparkles,
  Award,
  ArrowUpRight,
  Tag,
  Video,
  ShieldCheck,
  CheckCircle,
  BarChart3,
  Calendar,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BusinessDashboardPage: React.FC = () => {
  const { businesses, leads } = useApp();
  const myBusiness = businesses[0]; // Hotel Sai Palace default

  const stats = [
    { label: 'Profile Views', value: '1,450', change: '+24% this week', icon: Eye, color: 'text-blue-600 bg-blue-50' },
    { label: 'Phone Calls', value: '320', change: '+18% this week', icon: Phone, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'WhatsApp Chats', value: '185', change: '+32% this week', icon: MessageCircle, color: 'text-green-600 bg-green-50' },
    { label: 'Directions Requested', value: '412', change: '+15% this week', icon: Navigation, color: 'text-amber-600 bg-amber-50' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Business Status Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={myBusiness.logo}
              alt={myBusiness.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {myBusiness.name}
                </h1>
                <span className="bg-amber-500 text-slate-900 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  GOLD MEMBER
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {myBusiness.category} • {myBusiness.area} • ID: #APLA-{myBusiness.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <Link
              to="/business/ai-tools"
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Growth Tools</span>
            </Link>
            <Link
              to="/business/subscription"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
            >
              Manage Plan
            </Link>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(st => {
            const Icon = st.icon;
            return (
              <div key={st.label} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-2xl ${st.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {st.change}
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">{st.value}</div>
                  <div className="text-xs font-semibold text-slate-500">{st.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grid of Leads & Quick AI Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Leads with AI Priority (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-red-600" />
                  <span>Customer Leads & Enquiries</span>
                </h2>
                <p className="text-xs text-slate-500">
                  AI-classified intent for fast conversions
                </p>
              </div>
              <Link to="/business/leads" className="text-xs font-bold text-red-600 hover:underline">
                View All Leads
              </Link>
            </div>

            <div className="space-y-3">
              {leads.map(lead => (
                <div
                  key={lead.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{lead.customerName}</span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                          lead.priority === 'High'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {lead.priority === 'High' ? '🔴 High Priority' : '🟡 Medium Priority'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">{lead.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">"{lead.message}"</p>

                  <div className="bg-white p-2 rounded-xl text-[11px] text-slate-600 flex items-center gap-1.5 border border-slate-100">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span><strong className="text-slate-800">AI Analysis:</strong> {lead.aiReason}</span>
                  </div>

                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href={`tel:${lead.phone}`}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call {lead.phone}</span>
                    </a>
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp Customer</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Quick Links (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                Business Management
              </h3>

              <div className="space-y-2">
                <Link
                  to="/business/ai-tools"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 transition-colors text-xs font-bold text-slate-700"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>AI Content & Ads Generator</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  to="/business/ads"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 transition-colors text-xs font-bold text-slate-700"
                >
                  <div className="flex items-center gap-2.5">
                    <Tag className="w-4 h-4 text-red-500" />
                    <span>Run Banner & Reel Promotion</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  to="/business/reviews"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 transition-colors text-xs font-bold text-slate-700"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span>Customer Reviews & AI Reply</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  to="/business/subscription"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 transition-colors text-xs font-bold text-slate-700"
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Upgrade Subscription (Gold/Premium)</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Performance Snapshot */}
            <div className="bg-linear-to-tr from-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl space-y-3">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Boisar Hyperlocal Score
              </span>
              <div className="text-3xl font-black">98 / 100 🔥</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your business ranks #1 in "Family Restaurants" in Boisar West this month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
