import React, { useState } from 'react';
import { GraduationCap, BookOpen, Award, Briefcase, FileText, Download, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudentZonePage: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Notes' | 'Used Books' | 'Internships' | 'Tuition'>('All');

  const studentItems = [
    {
      id: 'st-1',
      type: 'Notes',
      title: 'Vartak College 12th HSC Physics & Chemistry Question Bank (Solved)',
      author: 'Sameer Vartak (Rank 1)',
      price: 'Free PDF',
      downloads: 480,
      icon: FileText
    },
    {
      id: 'st-2',
      type: 'Used Books',
      title: 'Diploma Mechanical Engineering 2nd & 3rd Year Techmax Books (Set of 6)',
      author: 'Pravin Raut (Boisar)',
      price: '₹450 for all',
      downloads: 12,
      contact: '919860045123',
      icon: BookOpen
    },
    {
      id: 'st-3',
      type: 'Internships',
      title: 'Summer Industrial Chemist Intern at Aarti Industries (Tarapur MIDC)',
      author: 'Aarti Industries HR',
      price: 'Stipend ₹8,000/mo',
      downloads: 65,
      icon: Briefcase
    },
    {
      id: 'st-4',
      type: 'Tuition',
      title: 'NEET & JEE Physics Coaching Group Batches (Ostwal Empire)',
      author: 'Prof. K. N. Joshi',
      price: '₹1,500/mo',
      downloads: 30,
      contact: '919822399110',
      icon: GraduationCap
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
              Vartak College & Boisar Youth
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Student Zone 🎓
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl font-medium">
              Free college notes, second-hand engineering books, local tuitions, hackathons, and industrial internships in Tarapur MIDC.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {(['All', 'Notes', 'Used Books', 'Internships', 'Tuition'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {studentItems.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                      {item.type}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {item.price}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium">
                    Posted by: <span className="text-slate-800 font-bold">{item.author}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                  <span className="text-xs text-slate-400">
                    {item.downloads} interested
                  </span>
                  {item.contact ? (
                    <a
                      href={`https://wa.me/${item.contact}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Contact Student</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => showToast('Notes download link sent to your device!', 'success')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
