import React, { useState } from 'react';
import SafetyPanel from './components/SafetyPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState('safety');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* App Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
              TM
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-lg tracking-tight leading-none">
                TravelMate <span className="text-blue-600">Sri Lanka</span>
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">Solo Traveler Intelligent Companion</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'itinerary'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Itinerary Planner
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'safety'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              Safety & Emergency
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'safety' ? (
          <SafetyPanel />
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Itinerary Planner Module</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                This tab is assigned to team members for preference inputs, route calculations, and cost estimations.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4">
          <p className="font-medium">TravelMate Sri Lanka — Built for Mini Hackathon 2026</p>
          <p className="mt-1 text-slate-400">Powered by React, Tailwind CSS & Curated Sri Lankan Datasets</p>
        </div>
      </footer>
    </div>
  );
}
