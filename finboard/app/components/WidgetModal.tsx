'use client';

import React from 'react';
import { Widget } from '@/app/store/dashboardSlice';
import WidgetDisplay from './WidgetDisplay';

interface WidgetModalProps {
  widget: Widget;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export default function WidgetModal({ widget, onClose, theme }: WidgetModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          theme === 'dark'
            ? 'bg-black/60 backdrop-blur-sm'
            : 'bg-white/40 backdrop-blur-sm'
        }`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto">
        <div
          className={`rounded-3xl shadow-2xl transition-all animate-scale-up border-2 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-cyan-500/30 hover:border-cyan-400/50'
              : 'bg-gradient-to-br from-white via-slate-50 to-white border-cyan-300'
          }`}
        >
          {/* Header */}
          <div
            className={`sticky top-0 z-20 flex items-center justify-between p-6 border-b-2 ${
              theme === 'dark'
                ? 'border-slate-700/50 bg-slate-900/95'
                : 'border-slate-200 bg-white/95'
            } backdrop-blur-sm`}
          >
            <h3
              className={`text-2xl font-bold flex items-center gap-3 ${
                theme === 'dark'
                  ? 'text-cyan-400'
                  : 'text-cyan-600'
              }`}
            >
              <span className="text-3xl">📊</span>
              {widget.name}
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark'
                  ? 'bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-white'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }`}
              title="Close (Back to Dashboard)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <WidgetDisplay widget={widget} theme={theme} />
          </div>

          {/* Footer with Back Button */}
          <div
            className={`sticky bottom-0 flex gap-4 p-6 border-t-2 ${
              theme === 'dark'
                ? 'border-slate-700/50 bg-slate-900/95'
                : 'border-slate-200 bg-white/95'
            } backdrop-blur-sm`}
          >
            <button
              onClick={onClose}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/50'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg hover:shadow-cyan-400/50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
