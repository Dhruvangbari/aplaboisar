import React, { useState } from 'react';
import { Briefcase, Search, Filter, PlusCircle, Building2, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobCard } from '../components/common/JobCard';

export const JobsPage: React.FC = () => {
  const { jobs } = useApp();
  const [selectedType, setSelectedType] = useState('All');
  const [searchWord, setSearchWord] = useState('');
  const [onlyUrgent, setOnlyUrgent] = useState(false);

  const jobTypes = ['All', 'ITI Jobs', 'Full Time', 'Fresher Jobs', 'Urgent Hiring', 'Part-Time'];

  const filteredJobs = jobs.filter(job => {
    if (selectedType !== 'All' && job.jobType !== selectedType) return false;
    if (onlyUrgent && !job.urgent) return false;
    if (searchWord.trim()) {
      const q = searchWord.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchComp = job.company.toLowerCase().includes(q);
      const matchDesc = job.description.toLowerCase().includes(q);
      if (!matchTitle && !matchComp && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              MIDC Recruitment Board
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Boisar–Tarapur Jobs & Careers 💼
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
              Explore verified chemical plant, pharmaceutical, steel factory, ITI, accounts and management jobs in Tarapur MIDC and Boisar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => alert('Post Job dialog opened for MIDC Employer!')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Job Opening</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchWord}
              onChange={e => setSearchWord(e.target.value)}
              placeholder="Search job title, company, skills..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 outline-hidden focus:border-red-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {jobTypes.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedType === t
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}

            <button
              onClick={() => setOnlyUrgent(!onlyUrgent)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-colors ${
                onlyUrgent
                  ? 'bg-rose-50 text-rose-700 border-rose-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              🔥 Urgent Only
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};
