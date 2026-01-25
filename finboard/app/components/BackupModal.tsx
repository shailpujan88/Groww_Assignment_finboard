'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { loadFromLocalStorage } from '@/app/utils/storage';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export default function BackupModal({ isOpen, onClose, theme }: BackupModalProps) {
  const [copied, setCopied] = useState(false);
  const widgets = useSelector((state: RootState) => state.dashboard.widgets);

  if (!isOpen) return null;

  const handleExport = () => {
    const data = loadFromLocalStorage();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `finboard-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    const data = loadFromLocalStorage();
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          try {
            const data = JSON.parse(event.target.result);
            localStorage.setItem('finboard_data', JSON.stringify(data));
            alert('✅ Backup imported successfully! Refresh the page to see changes.');
            window.location.reload();
          } catch (error) {
            alert('❌ Invalid backup file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

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
              💾 Auto-saved Data
            </h2>
            <p className={`text-sm font-semibold mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Backup and restore your dashboard
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
            <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${
              theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
            }`}>
              📊 Current Status
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              You have <span className="font-bold text-lg text-cyan-400">{widgets.length}</span> widget{widgets.length !== 1 ? 's' : ''} saved locally
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleExport}
              className={`w-full py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 border-2 ${
                theme === 'dark'
                  ? 'bg-emerald-600/30 border-emerald-500/50 hover:bg-emerald-500/40 text-emerald-300'
                  : 'bg-emerald-100/60 border-emerald-400/60 hover:bg-emerald-200/60 text-emerald-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              📥 Download Backup
            </button>

            <button
              onClick={handleCopyJson}
              className={`w-full py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 border-2 ${
                theme === 'dark'
                  ? 'bg-blue-600/30 border-blue-500/50 hover:bg-blue-500/40 text-blue-300'
                  : 'bg-blue-100/60 border-blue-400/60 hover:bg-blue-200/60 text-blue-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? '✅ Copied to Clipboard!' : '📋 Copy as JSON'}
            </button>

            <button
              onClick={handleImport}
              className={`w-full py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 border-2 ${
                theme === 'dark'
                  ? 'bg-purple-600/30 border-purple-500/50 hover:bg-purple-500/40 text-purple-300'
                  : 'bg-purple-100/60 border-purple-400/60 hover:bg-purple-200/60 text-purple-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              📤 Import from File
            </button>
          </div>

          <div className={`p-6 rounded-2xl border-2 ${
            theme === 'dark'
              ? 'bg-slate-700/30 border-slate-500/30'
              : 'bg-slate-50/50 border-slate-300/50'
          }`}>
            <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              💡 How It Works
            </h3>
            <ul className={`text-sm space-y-2 list-disc list-inside ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <li>All data is automatically saved to your browser's storage</li>
              <li>No cloud storage - your data stays on your device</li>
              <li>Export anytime to backup or share your configuration</li>
              <li>Import backups to restore your dashboard</li>
              <li>Works across different devices when you import</li>
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
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
