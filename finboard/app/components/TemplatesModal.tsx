'use client';

import React from 'react';
import { DEMO_TEMPLATES } from '@/app/utils/demoData';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
  theme: 'light' | 'dark';
}

export default function TemplatesModal({ isOpen, onClose, onSelectTemplate, theme }: TemplatesModalProps) {
  if (!isOpen) return null;

  const handleTemplateClick = (templateId: string) => {
    onSelectTemplate(templateId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-cyan-500/30 hover:border-cyan-400/50' 
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
              📋 Template Gallery
            </h2>
            <p className={`text-sm font-semibold mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Choose a template to get started quickly
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
        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            {DEMO_TEMPLATES.map((template, index) => (
              <div
                key={template.id}
                onClick={() => handleTemplateClick(template.id)}
                className={`group rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 animate-slide-in-up ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-700/40 to-slate-800/60 border-slate-600/50 hover:border-cyan-500/60 hover:shadow-cyan-500/20'
                    : 'bg-gradient-to-br from-slate-50/70 to-white/70 border-slate-200/70 hover:border-cyan-500/60 hover:shadow-cyan-500/30'
                } shadow-lg hover:shadow-2xl`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col h-full justify-between">
                  {/* Icon */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {template.icon}
                  </div>

                  {/* Name */}
                  <h3 className={`text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {template.name}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-4 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {template.description}
                  </p>

                  {/* Button */}
                  <button className={`py-2 px-4 rounded-lg font-bold text-sm transition-all ${
                    theme === 'dark'
                      ? 'bg-cyan-600/30 hover:bg-cyan-500/50 text-cyan-400 group-hover:text-cyan-300'
                      : 'bg-cyan-100/60 hover:bg-cyan-200/80 text-cyan-700 group-hover:text-cyan-600'
                  }`}>
                    Use Template →
                  </button>
                </div>
              </div>
            ))}
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
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
          >
            Close
          </button>
          <button
            onClick={onClose}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/50'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg hover:shadow-cyan-400/50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Create Custom Widget
          </button>
        </div>
      </div>
    </div>
  );
}
