import React, { useState } from 'react';

const renderIcon = (iconName) => {
  switch (iconName) {
    case 'car':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 4h8m-9 8h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      );
    case 'shield':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'alert':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    case 'train':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'droplet':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 00-1.8 1.1A6 6 0 004 19c0 1.657 1.343 3 3 3s3-1.343 3-3c0-.337-.056-.66-.16-0.963" />
        </svg>
      );
    case 'landmark':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4" />
        </svg>
      );
    case 'waves':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m0 0l-2-1m2 1v2.5M14 4l-2 1m0 0l-2-1m2 1v2.5" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

export default function SafetyTipCard({ tip }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskStyle = (level) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Important':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
            {renderIcon(tip.icon)}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base leading-snug">{tip.title}</h4>
            <span className="text-xs text-slate-500 font-medium">{tip.category}</span>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getRiskStyle(
            tip.riskLevel
          )}`}
        >
          {tip.riskLevel}
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-4">{tip.summary}</p>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl mb-3">
          <p className="font-medium text-slate-800 mb-1">Detailed Advice:</p>
          <p>{tip.details}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-wrap gap-1.5">
          {tip.tags.map((tag) => (
            <span key={tag} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono">
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors ml-2 shrink-0"
        >
          {isExpanded ? 'Show Less ▲' : 'Read Detail ▼'}
        </button>
      </div>
    </div>
  );
}
