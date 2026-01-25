'use client';

import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export default function SettingsModal({ isOpen, onClose, theme }: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-cyan-500/30' 
          : 'bg-gradient-to-br from-white via-slate-50 to-white border-slate-300'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-8 border-b backdrop-blur-sm ${
          theme === 'dark' 
            ? 'border-slate-700/50 bg-slate-900/95' 
            : 'border-slate-200 bg-white/95'
        }`}>
          <div>
            <h2 className={`text-3xl font-black flex items-center gap-3 ${
              theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
            }`}>
              ⚡ Real-time Updates
            </h2>
            <p className={`text-sm font-semibold mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              How auto-refresh works
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-3 hover:opacity-75 transition rounded-lg transform hover:scale-110 ${
              theme === 'dark' ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-200 text-slate-700'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className={`p-6 rounded-2xl border-2 ${
            theme === 'dark'
              ? 'bg-slate-700/30 border-cyan-500/30'
              : 'bg-cyan-50/50 border-cyan-300/50'
          }`}>
            <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
              theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
            }`}>
              🔄 Auto-Refresh Feature
            </h3>
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Each widget automatically fetches fresh data from your API at your chosen interval. Set intervals from 1 second to 1 hour when creating a widget.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border-2 ${
            theme === 'dark'
              ? 'bg-slate-700/30 border-blue-500/30'
              : 'bg-blue-50/50 border-blue-300/50'
          }`}>
            <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              ⏱️ Refresh Intervals
            </h3>
            <ul className={`text-sm space-y-2 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <li className="flex justify-between"><span>Lightning Fast:</span><span className="font-bold">1-5 seconds</span></li>
              <li className="flex justify-between"><span>Standard:</span><span className="font-bold">30-60 seconds</span></li>
              <li className="flex justify-between"><span>Moderate:</span><span className="font-bold">2-5 minutes</span></li>
              <li className="flex justify-between"><span>Background:</span><span className="font-bold">10+ minutes</span></li>
            </ul>
          </div>

          <div className={`p-6 rounded-2xl border-2 ${
            theme === 'dark'
              ? 'bg-slate-700/30 border-emerald-500/30'
              : 'bg-emerald-50/50 border-emerald-300/50'
          }`}>
            <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              💡 Pro Tips
            </h3>
            <ul className={`text-sm space-y-2 list-disc list-inside ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <li>Faster refreshes use more bandwidth</li>
              <li>Adjust based on API rate limits</li>
              <li>Real-time data shows live market changes</li>
              <li>No manual refresh needed once configured</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 flex gap-4 p-6 border-t-2 backdrop-blur-sm ${
          theme === 'dark'
            ? 'border-slate-700/50 bg-slate-900/95'
            : 'border-slate-200 bg-white/95'
        }`}>
          <button
            onClick={onClose}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/50'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg hover:shadow-cyan-400/50'
            }`}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
