import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, GraduationCap, Phone, MessageCircle, Send } from 'lucide-react';
import { JobItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface JobCardProps {
  job: JobItem;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { showToast } = useApp();
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setApplied(true);
    showToast(`Application submitted for "${job.title}" at ${job.company}!`, 'success');
  };

  const handleWhatsapp = () => {
    const text = encodeURIComponent(`Hello, I am interested in applying for the position of "${job.title}" at ${job.company} posted on AaplaBoisar.`);
    window.open(`https://wa.me/${job.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 shadow-xs hover:shadow-lg transition-all duration-300 p-4 md:p-5 flex flex-col justify-between">
      <div>
        {/* Top Row: Company & Urgent Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-11 h-11 rounded-xl object-cover border border-slate-100 shadow-xs"
            />
            <div>
              <h4 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">
                {job.company}
              </h4>
              <h3 className="font-bold text-slate-900 text-base leading-snug">
                {job.title}
              </h3>
            </div>
          </div>
          {job.urgent && (
            <span className="shrink-0 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
              URGENT HIRING
            </span>
          )}
        </div>

        {/* Salary Highlight */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 mb-3 flex items-center justify-between">
          <div className="text-sm font-extrabold text-emerald-700">
            {job.salary}
          </div>
          <span className="text-xs bg-white px-2 py-0.5 rounded border border-slate-200 font-medium text-slate-600">
            {job.jobType}
          </span>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{job.shift}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{job.experience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{job.qualification}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-400 font-medium">
          Posted {job.postedDate}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleWhatsapp}
            className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors border border-emerald-200"
            title="Chat with Recruiter"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.open(`tel:${job.phone}`, '_self')}
            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors border border-blue-200"
            title="Call HR"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={handleApply}
            disabled={applied}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
              applied
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{applied ? 'Applied' : 'Quick Apply'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
