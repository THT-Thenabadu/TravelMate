import React, { useState } from 'react';

export default function EmergencyNumbers({ numbers }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="inline-block p-2 bg-red-100 text-red-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            Emergency Hotlines & Tourist Police
          </h3>
          <p className="text-sm text-slate-500">Instant dial or copy emergency numbers in Sri Lanka</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {numbers.map((item) => {
          const isFeatured = item.id === 'tourist-police';
          return (
            <div
              key={item.id}
              className={`relative p-5 rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md ${
                isFeatured
                  ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200 ring-2 ring-red-400/30'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    isFeatured
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">{item.category}</span>
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-1">{item.name}</h4>
              <p className="text-xs text-slate-600 mb-4 line-clamp-2">{item.description}</p>

              <div className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">
                {item.displayNumber}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${item.tel}`}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    isFeatured
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>

                <button
                  onClick={() => handleCopy(item.id, item.number)}
                  className="flex items-center justify-center p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                  title="Copy number"
                >
                  {copiedId === item.id ? (
                    <span className="flex items-center text-emerald-600 font-bold text-xs gap-1 px-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied
                    </span>
                  ) : (
                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
