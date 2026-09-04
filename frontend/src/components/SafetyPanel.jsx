import React, { useState, useEffect, useMemo } from 'react';
import fallbackData from '../data/safetyTips.json';
import { fetchSafetyPanelData } from '../services/api';
import EmergencyNumbers from './EmergencyNumbers';
import SafetyTipCard from './SafetyTipCard';
import EmergencyModal from './EmergencyModal';

export default function SafetyPanel({ customData }) {
  const [panelData, setPanelData] = useState(customData || fallbackData);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeRisk, setActiveRisk] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch live data from Express Backend on component mount
  useEffect(() => {
    if (customData) {
      setPanelData(customData);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    fetchSafetyPanelData().then(({ data, isLiveApi: liveStatus }) => {
      if (isMounted) {
        setPanelData(data);
        setIsLiveApi(liveStatus);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [customData]);

  // Filtered safety tips calculation
  const filteredTips = useMemo(() => {
    if (!panelData || !panelData.safetyTips) return [];
    return panelData.safetyTips.filter((tip) => {
      // Category Filter
      const matchesCategory =
        activeCategory === 'All' || tip.category === activeCategory;

      // Risk Level Filter
      const matchesRisk =
        activeRisk === 'All' || tip.riskLevel === activeRisk;

      // Search Query Filter (Title, Summary, Details, Tags)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tip.title.toLowerCase().includes(q) ||
        tip.summary.toLowerCase().includes(q) ||
        tip.details.toLowerCase().includes(q) ||
        tip.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesRisk && matchesSearch;
    });
  }, [panelData, searchQuery, activeCategory, activeRisk]);

  const categories = panelData?.categories || fallbackData.categories;
  const emergencyNumbers = panelData?.emergencyNumbers || fallbackData.emergencyNumbers;
  const emergencyPhrases = panelData?.emergencyPhrases || fallbackData.emergencyPhrases;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                Sri Lanka Solo-Traveler Safety Guide
              </div>

              {/* Live API / Fallback Indicator Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isLiveApi
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
                title={isLiveApi ? 'Connected to Express Backend API' : 'Using Local Static Data Fallback'}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isLiveApi ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                {isLiveApi ? 'Backend API Live' : 'Static Dataset'}
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2">
              Stay Safe, Smart & Connected in Sri Lanka
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Essential emergency hotlines, scam alerts, solo female traveler guidelines, and local safety tips verified for solo adventurers.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2.5 px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-2xl transition-all shadow-lg hover:shadow-red-500/30 active:scale-95 shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Quick Emergency Card
          </button>
        </div>
      </div>

      {/* Emergency Hotlines Grid */}
      <EmergencyNumbers numbers={emergencyNumbers} />

      {/* Interactive Safety Advisory Section */}
      <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              Curated Solo Safety Tips & Scam Advisory
            </h3>
            <p className="text-sm text-slate-500">Filter safety advice by category or search key topics</p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tips (e.g., tuk-tuk, female, train)..."
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-300 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Risk Level Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Risk Level:
            </span>
            {['All', 'Critical', 'Important', 'General'].map((risk) => (
              <button
                key={risk}
                onClick={() => setActiveRisk(risk)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeRisk === risk
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200'
                }`}
              >
                {risk}
              </button>
            ))}

            <div className="ml-auto text-xs font-medium text-slate-500 shrink-0">
              Showing <span className="font-bold text-slate-900">{filteredTips.length}</span> of{' '}
              {panelData?.safetyTips?.length || 0} tips
            </div>
          </div>
        </div>

        {/* Tips Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs font-medium text-slate-500">Loading safety advisories...</p>
          </div>
        ) : filteredTips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTips.map((tip) => (
              <SafetyTipCard key={tip.id} tip={tip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 p-6">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-slate-800 mb-1">No safety tips found</h4>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your search query "{searchQuery}" or resetting category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setActiveRisk('All');
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Emergency Quick-Card Modal */}
      <EmergencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        phrases={emergencyPhrases}
        numbers={emergencyNumbers}
      />
    </section>
  );
}
