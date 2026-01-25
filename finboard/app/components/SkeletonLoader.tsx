'use client';

import React from 'react';

interface SkeletonLoaderProps {
  theme: 'light' | 'dark';
  count?: number;
}

export default function SkeletonLoader({ theme, count = 3 }: SkeletonLoaderProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`rounded-2xl p-6 overflow-hidden ${
            theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
          }`}
        >
          <div className="space-y-4">
            <div className={`h-4 rounded-lg w-1/3 animate-shimmer ${
              theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
            }`}></div>
            <div className={`h-10 rounded-lg w-2/3 animate-shimmer ${
              theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
            }`}></div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className={`h-8 rounded-lg animate-shimmer ${
                theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
              }`}></div>
              <div className={`h-8 rounded-lg animate-shimmer ${
                theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
              }`}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
