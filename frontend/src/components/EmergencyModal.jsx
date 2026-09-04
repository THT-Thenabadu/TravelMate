import React, { useState } from 'react';

export default function EmergencyModal({ isOpen, onClose, phrases, numbers }) {
  const [copiedText, setCopiedText] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 text-red-600 rounded-2xl">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Emergency Quick-Card</h3>
              <p className="text-xs text-slate-500">Offline pocket guide for urgent situations</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Priority Emergency Contacts */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Priority Helplines
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {numbers.slice(0, 4).map((item) => (
              <div key={item.id} className="p-3 bg-red-50/70 rounded-2xl border border-red-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-red-900">{item.name}</div>
                  <div className="text-lg font-black text-red-600">{item.number}</div>
                </div>
                <a
                  href={`tel:${item.tel}`}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
                >
                  Dial
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Essential Local Emergency Phrases */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Essential Sinhala & Tamil Emergency Phrases
          </h4>
          <div className="space-y-3">
            {phrases.map((phrase, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {phrase.english}
                  </span>
                  <button
                    onClick={() => handleCopy(`${phrase.english}: ${phrase.sinhala}`)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1"
                  >
                    {copiedText === `${phrase.english}: ${phrase.sinhala}` ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Sinhala:</span>
                    <p className="text-sm font-bold text-slate-800">{phrase.sinhala}</p>
                    <p className="text-[11px] text-slate-500 italic">Pronunciation: {phrase.pronunciation}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Tamil:</span>
                    <p className="text-sm font-bold text-slate-800">{phrase.tamil}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-colors shadow"
          >
            Close Emergency Card
          </button>
        </div>
      </div>
    </div>
  );
}
