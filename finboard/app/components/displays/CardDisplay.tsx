'use client';

import React from 'react';
import { formatValue } from '@/app/utils/formatters';

interface CardDisplayProps {
  data: Record<string, any>;
  theme: 'light' | 'dark';
}

export default function CardDisplay({ data, theme }: CardDisplayProps) {
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return (
      <div className={`text-center text-sm py-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
        <div className="text-3xl mb-2">📭</div>
        <p className="font-semibold">No data to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {entries.map(([key, value], idx) => (
        <div
          key={key}
          className={`p-5 rounded-2xl border-2 transition transform hover:scale-110 hover:shadow-xl duration-300 animate-fade-in ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-cyan-500/50 hover:border-cyan-400/80 hover:shadow-cyan-400/30'
              : 'bg-gradient-to-br from-slate-50 to-white border-cyan-400/40 hover:border-cyan-500/80'
          }`}
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <p className={`text-xs font-black uppercase tracking-widest letter-spacing-1 break-words ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {key.replace(/([A-Z])/g, ' $1').replace(/\./g, ' ').trim()}
          </p>
          <p className="text-2xl font-black mt-3 break-words word-wrap bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent animate-neon-text">
            {formatValue(value, key)}
          </p>
        </div>
      ))}
    </div>
  );
}
