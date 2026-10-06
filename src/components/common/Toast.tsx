import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  const bgStyles = {
    success: 'border-emerald-200 bg-emerald-50/95 text-emerald-900',
    error: 'border-rose-200 bg-rose-50/95 text-rose-900',
    info: 'border-blue-200 bg-blue-50/95 text-blue-900'
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 left-4 md:left-auto md:w-96 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md ${bgStyles[toast.type]}`}
      >
        {icons[toast.type]}
        <div className="text-sm font-medium flex-1">{toast.message}</div>
        <button
          onClick={hideToast}
          className="p-1 rounded-lg hover:bg-black/5 text-slate-500 transition-colors"
          aria-label="Close toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
